/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/paypal-marketplace/assets/src/js/paypal-checkout.js":
/*!*********************************************************************!*\
  !*** ./modules/paypal-marketplace/assets/src/js/paypal-checkout.js ***!
  \*********************************************************************/
/***/ (() => {

eval(";\n\n(function ($, window, document) {\n  'use strict';\n\n  if ('undefined' === typeof dokan_paypal || !dokan_paypal.is_checkout_page) {\n    return;\n  }\n\n  if ('smart' !== dokan_paypal.payment_button_type) {\n    return;\n  } //paypal smart checkout button\n\n\n  var payment_method = {\n    selected_payment_method: '',\n    loaded: false,\n    toggle_buttons: function toggle_buttons(payment_method) {\n      var isPayPal = payment_method === 'dokan_paypal_marketplace';\n      var togglePaypal = isPayPal ? 'show' : 'hide';\n      var toggleSubmit = isPayPal ? 'hide' : 'show';\n      $('#paypal-button-container').animate({\n        opacity: togglePaypal,\n        height: togglePaypal,\n        padding: togglePaypal\n      }, 230);\n      $('#place_order').animate({\n        opacity: toggleSubmit,\n        height: toggleSubmit,\n        padding: toggleSubmit\n      }, 230);\n    },\n    on_change: function on_change() {\n      $('form.checkout, form#order_review').on('click', 'input[name=\"payment_method\"]', function (e) {\n        if ('smart' !== dokan_paypal.payment_button_type) {\n          return;\n        }\n\n        if (payment_method.selected_payment_method === e.target.value) {\n          return;\n        }\n\n        payment_method.selected_payment_method = e.target.value;\n        payment_method.toggle_buttons(e.target.value);\n      });\n    },\n    init: function init() {\n      if (window.paypal && !payment_method.loaded) {\n        // set loaded to true\n        payment_method.loaded = true;\n        var checked_payment_method = $('.woocommerce-checkout').find('input[name=\"payment_method\"]:checked').val();\n        payment_method.toggle_buttons(checked_payment_method);\n        payment_method.on_change();\n      } else {\n        // show a fallback experience\n        if (!payment_method.loaded) {\n          setTimeout(function () {\n            payment_method.init();\n          }, 2000);\n        }\n      }\n    }\n  }; // paypal checkout process\n\n  var dokan_paypal_marketplace = {\n    checkout_form: $('form.checkout, form#order_review'),\n    order_success_redirect_url: '',\n    order_cancel_redirect_url: '',\n    order_id: '',\n    loaded: false,\n    reset_order_data: function reset_order_data() {\n      this.order_success_redirect_url = '';\n      this.order_cancel_redirect_url = '';\n      this.order_id = '';\n    },\n    is_paypal_selected: function is_paypal_selected() {\n      return $('.woocommerce-checkout').find('input[name=\"payment_method\"]:checked').val() === 'dokan_paypal_marketplace';\n    },\n    set_loading_on: function set_loading_on() {\n      dokan_paypal_marketplace.checkout_form.addClass('processing').block({\n        message: null,\n        overlayCSS: {\n          background: '#fff',\n          opacity: 0.6\n        }\n      });\n    },\n    set_loading_done: function set_loading_done() {\n      dokan_paypal_marketplace.checkout_form.removeClass('processing').unblock();\n    },\n    submit_error: function submit_error(errorMessage) {\n      dokan_paypal_marketplace.set_loading_done();\n      dokan_paypal_marketplace.reset_order_data();\n      $('.woocommerce-NoticeGroup-checkout, .woocommerce-error, .woocommerce-message').remove();\n      dokan_paypal_marketplace.checkout_form.prepend('<div class=\"woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout\">' + errorMessage + '</div>');\n      dokan_paypal_marketplace.checkout_form.find('.input-text, select, input:checkbox').trigger('validate').trigger('blur');\n      dokan_paypal_marketplace.scroll_to_notice();\n      $(document.body).trigger('checkout_error', [errorMessage]);\n    },\n    scroll_to_notice: function scroll_to_notice() {\n      $('html, body').animate({\n        scrollTop: $('form.checkout, form#order_review').offset().top - 100\n      }, 1000);\n    },\n    set_order: function set_order() {\n      return $.ajax({\n        type: 'POST',\n        url: wc_checkout_params.checkout_url,\n        data: dokan_paypal_marketplace.checkout_form.serialize(),\n        dataType: 'json'\n      }).fail(function (jqXHR, textStatus, errorThrown) {\n        dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + errorThrown + '</div>');\n      });\n    },\n    create_order: function create_order() {\n      dokan_paypal_marketplace.set_loading_on();\n      var create_order_data = {\n        order_id: dokan_paypal.order_id,\n        action: \"dokan_paypal_create_order\",\n        nonce: dokan_paypal.nonce\n      };\n      return $.ajax({\n        type: 'POST',\n        url: dokan_paypal.ajaxurl,\n        data: create_order_data,\n        dataType: 'json'\n      }).fail(function (jqXHR, textStatus, errorThrown) {\n        dokan_paypal_marketplace.set_loading_done();\n        dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + errorThrown + '</div>');\n      });\n    },\n    do_submit: function do_submit() {\n      dokan_paypal_marketplace.set_loading_on();\n\n      if (dokan_paypal.is_checkout_pay_page) {\n        return dokan_paypal_marketplace.create_order();\n      } else {\n        return dokan_paypal_marketplace.set_order();\n      }\n    },\n    capture_payment: function capture_payment(order_id, order_redirect_url) {\n      var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n      dokan_paypal_marketplace.set_loading_on();\n      var capture_data = {\n        order_id: order_id,\n        action: \"dokan_paypal_capture_payment\",\n        nonce: dokan_paypal.nonce\n      };\n      $.ajax({\n        type: 'POST',\n        url: dokan_paypal.ajaxurl,\n        data: capture_data,\n        dataType: 'json'\n      }).done(function (result) {\n        dokan_paypal_marketplace.set_loading_done();\n\n        try {\n          if (result.success) {\n            window.location.href = order_redirect_url;\n          } else {\n            if (result.data.data) {\n              var error_data = JSON.parse(result.data.data[0]);\n\n              if ('INSTRUMENT_DECLINED' === error_data.details[0].issue) {\n                return actions.restart();\n              }\n            }\n\n            throw new Error(result.data.message);\n          }\n        } catch (err) {\n          // Reload page\n          if (result.reload === true) {\n            window.location.reload();\n            return;\n          } // Add new errors\n\n\n          if (result.data.message) {\n            dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + result.data.message + '</div>');\n          }\n        }\n      }).fail(function (jqXHR, textStatus, errorThrown) {\n        dokan_paypal_marketplace.set_loading_done();\n        dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + errorThrown + '</div>');\n      });\n    },\n    render_ajax_response: function render_ajax_response(res) {\n      try {\n        if (dokan_paypal.is_checkout_pay_page) {\n          res = res.data.data;\n        }\n\n        dokan_paypal_marketplace.set_loading_done();\n\n        if (res.result === 'success') {\n          dokan_paypal_marketplace.order_success_redirect_url = res.success_redirect;\n          dokan_paypal_marketplace.order_cancel_redirect_url = res.cancel_redirect;\n          dokan_paypal_marketplace.order_id = res.id;\n          return res.paypal_order_id;\n        } else if (res.result === 'failure') {\n          throw new Error('Result failure');\n        } else {\n          throw new Error('Invalid response');\n        }\n      } catch (err) {\n        // Reload page\n        if (res.reload === true) {\n          window.location.reload();\n        } // Trigger update in case we need a fresh nonce\n\n\n        if (res.refresh === true) {\n          jQuery(document.body).trigger('update_checkout');\n        } // Add new errors\n\n\n        if (res.messages) {\n          dokan_paypal_marketplace.submit_error(res.messages);\n        } else {\n          dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + wc_checkout_params.i18n_checkout_error + '</div>');\n        }\n\n        return false;\n      }\n    },\n    init_hosted_fields: function init_hosted_fields() {\n      if (dokan_paypal.is_ucc_enabled && window.paypal.HostedFields.isEligible()) {\n        window.paypal.HostedFields.render({\n          createOrder: function createOrder() {\n            if (dokan_paypal_marketplace.is_paypal_selected()) {\n              return dokan_paypal_marketplace.do_submit().then(function (res) {\n                return dokan_paypal_marketplace.render_ajax_response(res);\n              });\n            }\n\n            return false;\n          },\n          styles: {\n            'input': {\n              'font-size': '17px',\n              'font-family': 'helvetica, tahoma, calibri, sans-serif',\n              'color': '#3a3a3a'\n            },\n            ':focus': {\n              'color': 'black'\n            }\n          },\n          fields: {\n            number: {\n              selector: '#dpm_card_number',\n              placeholder: dokan_paypal.ucc_fields_placeholder.card_number\n            },\n            cvv: {\n              selector: '#dpm_cvv',\n              placeholder: dokan_paypal.ucc_fields_placeholder.cvv_number\n            },\n            expirationDate: {\n              selector: '#dpm_card_expiry',\n              placeholder: dokan_paypal.ucc_fields_placeholder.expiry_date\n            }\n          }\n        }).then(function (hf) {\n          var formValid;\n          hf.on('validityChange', function (event) {\n            var field = event.fields[event.emittedBy];\n            var state = hf.getState();\n            formValid = Object.keys(state.fields).every(function (key) {\n              //console.log( 'checking validity for: ',  state.fields[key], state.fields[key].isValid );\n              if (!state.fields[key].isValid) {\n                state.fields[key].container.style.boxShadow = 'inset 2px 0 0 #cc0000';\n              } else {\n                state.fields[key].container.style.boxShadow = 'inset 2px 0 0 #0f834d';\n              }\n\n              return state.fields[key].isValid;\n            });\n\n            if (formValid) {\n              $(\"#pay_unbranded_order\").attr('disabled', false);\n            } else {\n              $(\"#pay_unbranded_order\").attr('disabled', true);\n            }\n          });\n          $('#pay_unbranded_order').on('click', function (e) {\n            e.preventDefault();\n            $('.woocommerce-NoticeGroup-checkout, .woocommerce-error, .woocommerce-message').remove();\n\n            if (!formValid) {\n              dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + dokan_paypal.card_info_error_message + '</div>');\n              return false;\n            }\n\n            var billing_address = {};\n\n            if (dokan_paypal.billing_address) {\n              billing_address = dokan_paypal.billing_address;\n            } else {\n              billing_address = {\n                streetAddress: document.getElementById('billing_address_1').value,\n                extendedAddress: document.getElementById('billing_address_2').value,\n                region: document.getElementById('billing_state').value,\n                locality: document.getElementById('billing_city').value,\n                postalCode: document.getElementById('billing_postcode').value,\n                countryCodeAlpha2: document.getElementById('billing_country').value\n              };\n            }\n\n            var args = {\n              contingencies: ['3D_SECURE'],\n              cardholderName: document.getElementById('dpm_name_on_card').value,\n              billingAddress: billing_address\n            };\n            hf.submit(args).then(function (res) {\n              dokan_paypal_marketplace.capture_payment(dokan_paypal_marketplace.order_id, dokan_paypal_marketplace.order_success_redirect_url);\n            }).catch(function (err) {\n              dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + err.message + '</div>');\n            });\n          });\n        }).catch(function (err) {\n          dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + err.message + '</div>');\n        });\n      }\n    },\n    init_paypal: function init_paypal() {\n      if (window.paypal && window.paypal.Buttons && !dokan_paypal_marketplace.loaded) {\n        // set loaded to true to prevent double calling of paypal api\n        dokan_paypal_marketplace.loaded = true; // render the buttons\n\n        window.paypal.Buttons({\n          createOrder: function createOrder(data, actions) {\n            if (dokan_paypal_marketplace.is_paypal_selected()) {\n              return dokan_paypal_marketplace.do_submit().then(function (res) {\n                return dokan_paypal_marketplace.render_ajax_response(res);\n              });\n            }\n\n            return false;\n          },\n          onApprove: function onApprove(data, actions) {\n            dokan_paypal_marketplace.capture_payment(dokan_paypal_marketplace.order_id, dokan_paypal_marketplace.order_success_redirect_url, actions);\n          },\n          onCancel: function onCancel(data) {\n            dokan_paypal_marketplace.set_loading_done();\n            dokan_paypal_marketplace.reset_order_data(); //window.location.href = dokan_paypal_marketplace.order_cancel_redirect_url;\n          },\n          onError: function onError(err) {\n            dokan_paypal_marketplace.set_loading_done();\n            var error_div = dokan_paypal_marketplace.checkout_form.find('.woocommerce-NoticeGroup > ul.woocommerce-error, .woocommerce-NoticeGroup-checkout > ul.woocommerce-error');\n\n            if (error_div.length === 0) {\n              dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + err + '</div>');\n            } //window.location.href = order_redirect_url;\n\n          }\n        }).render('#paypal-button-container').catch(function (err) {\n          dokan_paypal_marketplace.submit_error('<div class=\"woocommerce-error\">' + JSON.stringify(err) + '</div>');\n        });\n        dokan_paypal_marketplace.init_hosted_fields();\n        $('.paypal-loader').hide();\n      } else {\n        // show a fallback experience\n        if (!dokan_paypal_marketplace.loaded) {\n          setTimeout(function () {\n            dokan_paypal_marketplace.init_paypal();\n          }, 2000);\n        }\n      }\n    }\n  };\n  $(document).ready(function () {\n    setTimeout(function () {\n      payment_method.init();\n      dokan_paypal_marketplace.init_paypal();\n    }, 3000);\n  });\n})(jQuery, window, document);\n\n//# sourceURL=webpack://dokan-pro/./modules/paypal-marketplace/assets/src/js/paypal-checkout.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./modules/paypal-marketplace/assets/src/js/paypal-checkout.js"]();
/******/ 	
/******/ })()
;