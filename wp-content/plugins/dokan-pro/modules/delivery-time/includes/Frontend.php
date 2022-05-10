<?php

namespace WeDevs\DokanPro\Modules\DeliveryTime;

/**
 * Class Frontend
 *
 * @since 3.3.0
 *
 * @package WeDevs\DokanPro\Modules\DeliveryTime
 */
class Frontend {

    /**
     * Delivery time Frontend constructor
     *
     * @since 3.3.0
     */
    public function __construct() {
        // Hooks
        add_action( 'woocommerce_review_order_before_payment', [ $this, 'render_delivery_time_template' ], 10 );
        add_action( 'wp_enqueue_scripts', [ $this, 'load_scripts' ], 20 );
        add_action( 'dokan_create_parent_order', [ $this, 'save_delivery_time_args' ], 20, 2 );
        add_action( 'dokan_checkout_update_order_meta', [ $this, 'save_delivery_time_args' ], 20, 2 );
        add_action( 'woocommerce_order_details_before_order_table_items', [ $this, 'render_delivery_time_wc_order_details' ], 20, 1 );
        add_action( 'wp_ajax_nopriv_dokan_get_delivery_time_slot', [ $this, 'get_vendor_delivery_time_slot' ] );
        add_action( 'wp_ajax_dokan_get_delivery_time_slot', [ $this, 'get_vendor_delivery_time_slot' ] );
        add_action( 'woocommerce_after_checkout_validation', [ $this, 'validate_delivery_time_slot_args' ], 20, 2 );

        add_filter( 'dokan_localized_args', [ $this, 'add_i18n_date_format_localized_variable' ] );
    }

    /**
     * Renders Delivery time box to checkout page
     *
     * @since 3.3.0
     *
     * @return void
     */
    public function render_delivery_time_template() {
        $vendor_infos = $this->get_vendor_delivery_time_info();

        if ( empty( $vendor_infos ) ) {
            return;
        }

        dokan_get_template_part(
            'delivery-time-box', '', [
                'is_delivery_time' => true,
                'vendor_infos'     => $vendor_infos,
            ]
        );
    }

    /**
     * Loads scripts
     *
     * @since 3.3.0
     *
     * @return void
     */
    public function load_scripts() {
        if ( is_checkout() ) {
            wp_enqueue_script( 'dokan-delivery-time-flatpickr-script' );
            wp_enqueue_script( 'dokan-delivery-time-main-script' );

            wp_enqueue_style( 'dokan-delivery-time-flatpickr-style' );
            wp_enqueue_style( 'dokan-delivery-time-vendor-style' );
        }

        if ( is_order_received_page() || is_view_order_page() ) {
            wp_enqueue_style( 'dokan-delivery-time-vendor-style' );
        }
    }

    /**
     * Gets vendor delivery time infos for customers
     *
     * @since 3.3.0
     *
     * @return array
     */
    public function get_vendor_delivery_time_info() {
        global $woocommerce;
        $items = $woocommerce->cart->get_cart();

        $vendor_infos = [];

        foreach ( $items as $item => $values ) {
            $vendor   = [];
            $_product = wc_get_product( $values['data']->get_id() );

            // Continue if the product is downloadable or virtual
            if ( $_product->is_downloadable() || $_product->is_virtual() ) {
                continue;
            }

            $_vendor  = dokan_get_vendor_by_product( $_product );

            $_vendor_id = (int) $_vendor->get_id();

            if ( isset( $vendor_infos[ $_vendor_id ] ) ) {
                continue;
            }

            $vendor_delivery_options = Helper::get_delivery_time_settings( $_vendor_id );

            $delivery_date_label = dokan_get_option( 'delivery_date_label', 'dokan_delivery_time', 'off' );
            $delivery_box_info   = dokan_get_option( 'delivery_box_info', 'dokan_delivery_time', 'off' );

            if ( ! isset( $vendor_delivery_options['allow_vendor_delivery_time_option'] ) || 'on' !== $vendor_delivery_options['allow_vendor_delivery_time_option'] ) {
                continue;
            }

            $preorder_date = $vendor_delivery_options['preorder_date'];

            $delivery_box_info_message = str_replace( '%DAY%', $preorder_date, $delivery_box_info );

            $vendor_delivery_options['delivery_date_label']       = $delivery_date_label;
            $vendor_delivery_options['delivery_box_info_message'] = $delivery_box_info_message;

            $store_info = dokan_get_store_info( $_vendor_id );

            $current_date = dokan_current_datetime();
            $date         = strtolower( $current_date->format( 'Y-m-d' ) );
            $day          = strtolower( $current_date->format( 'l' ) );

            $vendor_order_per_slot              = (int) isset( $vendor_delivery_options['order_per_slot'][ $day ] ) ? $vendor_delivery_options['order_per_slot'][ $day ] : -1;
            $vendor_preorder_blocked_date_count = (int) ( isset( $vendor_delivery_options['preorder_date'] ) && $vendor_delivery_options['preorder_date'] > 0 ) ? $vendor_delivery_options['preorder_date'] : 0;
            $vendor_delivery_slots              = Helper::get_available_delivery_slots_by_date( $_vendor_id, $vendor_order_per_slot, $date );

            $vendor['store_name']              = $store_info['store_name'];
            $vendor['delivery_time_slots']     = $vendor_delivery_slots;
            $vendor['vendor_delivery_options'] = $vendor_delivery_options;
            $vendor['vendor_vacation_days']    = ( dokan_pro()->module->is_active( 'seller_vacation' ) && isset( $store_info['seller_vacation_schedules'] ) ) ? $store_info['seller_vacation_schedules'] : [];

            $current_date                  = $current_date->modify( '+' . $vendor_preorder_blocked_date_count . ' day' );
            $vendor_preorder_block_date_to = strtolower( $current_date->format( 'Y-m-d' ) );

            $vendor['vendor_preorder_blocked_dates'] = [];

            if ( $vendor_preorder_blocked_date_count > 0 ) {
                $vendor['vendor_preorder_blocked_dates'] = [
                    [
                        'from' => $date,
                        'to'   => $vendor_preorder_block_date_to,
                    ],
                ];
            }

            $vendor_infos[ $_vendor_id ] = $vendor;
        }

        return $vendor_infos;
    }

    /**
     * Saves delivery time args for single and sub orders
     *
     * @since 3.3.0
     *
     * @param \WC_Order $order
     * @param int $vendor_id
     *
     * @return void
     */
    public function save_delivery_time_args( $order, $vendor_id ) {
        if ( ! isset( $_POST['woocommerce-process-checkout-nonce'] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['woocommerce-process-checkout-nonce'] ) ), 'woocommerce-process_checkout' ) ) {
            return;
        }

        $order = $order instanceof \WC_Order ? $order : wc_get_order( $order );

        $data = isset( $_POST['vendor_delivery_time'] ) ? wc_clean( wp_unslash( $_POST['vendor_delivery_time'] ) ) : []; //phpcs:ignore

        $delivery_date      = isset( $data[ $vendor_id ]['delivery_date'] ) ? sanitize_text_field( $data[ $vendor_id ]['delivery_date'] ) : '';
        $delivery_time_slot = isset( $data[ $vendor_id ]['delivery_time_slot'] ) ? sanitize_text_field( $data[ $vendor_id ]['delivery_time_slot'] ) : '';

        $data = [
            'order'              => $order,
            'vendor_id'          => $vendor_id,
            'delivery_date'      => $delivery_date,
            'delivery_time_slot' => $delivery_time_slot
        ];

        Helper::save_delivery_time_date_slot( $data );
    }

    /**
     * Renders delivery time details on wc order details page
     *
     * @since 3.3.0
     *
     * @param \WC_Order $order
     *
     * @return void
     */
    public function render_delivery_time_wc_order_details( $order ) {
        $order_id = (int) $order->get_id();

        // Getting delivery date meta
        $vendor_delivery_date = get_post_meta( $order_id, 'dokan_delivery_time_date', true );

        if ( ! $vendor_delivery_date ) {
            return;
        }

        $current_date       = dokan_current_datetime();
        $current_date       = $current_date->modify( $vendor_delivery_date );
        $delivery_time_date = $current_date->format( 'F j, Y' );

        $delivery_time_slot = get_post_meta( $order_id, 'dokan_delivery_time_slot', true ) ? get_post_meta( $order_id, 'dokan_delivery_time_slot', true ) : null;

        dokan_get_template_part(
            'delivery-time-order-details', '', [
                'is_delivery_time'        => true,
                'delivery_time_date_slot' => [
                    'date' => $delivery_time_date,
                    'slot' => $delivery_time_slot,
                ],
            ]
        );
    }

    /**
     * Gets vendor delivery time slot from ajax request
     *
     * @since 3.3.0
     */
    public function get_vendor_delivery_time_slot() {
        $post_data = wp_unslash( $_POST );

        if ( ! isset( $post_data['action'] ) || $post_data['action'] !== 'dokan_get_delivery_time_slot' ) {
            wp_send_json_error( __( 'Something went wrong', 'dokan' ), '403' );
        }

        if ( ! wp_verify_nonce( sanitize_key( wp_unslash( $post_data['nonce'] ) ), 'dokan_delivery_time' ) ) {
            wp_send_json_error( __( 'Invalid nonce', 'dokan' ) );
        }

        $vendor_id = (int) $post_data['vendor_id'];
        $date      = $post_data['date'];

        if ( empty( $vendor_id ) || empty( $date ) || ! strtotime( $date ) ) {
            wp_send_json_error( [ 'message' => __( 'No date or vendor id found.', 'dokan' ) ], 400 );
        }

        $vendor_delivery_options = Helper::get_delivery_time_settings( $vendor_id );

        $current_date = dokan_current_datetime();
        $current_date = $current_date->modify( $date );
        $day          = strtolower( trim( $current_date->format( 'l' ) ) );

        $vendor_order_per_slot = (int) isset( $vendor_delivery_options['order_per_slot'][ $day ] ) ? $vendor_delivery_options['order_per_slot'][ $day ] : -1;
        $vendor_delivery_slots = Helper::get_available_delivery_slots_by_date( $vendor_id, $vendor_order_per_slot, $date );

        wp_send_json_success( [ 'vendor_delivery_slots' => $vendor_delivery_slots ], 201 );
    }

    /**
     * Validates delivery time slot args from wc checkout
     *
     * @since 3.3.0
     *
     * @param array $wc_data
     * @param object $errors
     *
     * @return void
     */
    public function validate_delivery_time_slot_args( $wc_data, $errors ) {
        $posted_data = isset( $_POST['vendor_delivery_time'] ) ? wp_unslash( wc_clean( $_POST['vendor_delivery_time'] ) ) : []; //phpcs:ignore

        foreach ( $posted_data as $data ) {
            if ( ( ! empty( $data['vendor_id'] ) && ! empty( $data['delivery_date'] ) ) && empty( $data['delivery_time_slot'] ) ) {
                $errors->add( 'dokan_delivery_time_slot_error', sprintf( __( 'Please make sure you have selected the delivery time slot for %1$s.', 'dokan' ), $data['store_name'] ) );
            }
        }
    }

    /**
     * Add i18n variable to frontend
     *
     * @since 3.3.0
     *
     * @param array $args
     *
     * @return array
     */
    public function add_i18n_date_format_localized_variable( $args ) {
        $args['i18n_date_format'] = wc_date_format();
        return $args;
    }
}
