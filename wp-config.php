<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'j-fashion' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '040301' );

/** Database hostname */
define( 'DB_HOST', 'localhost:3307' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'w*O~`I+t67U!IF{.(vp:5@dto!~?]F=FJPi35q)<L&+7CVh1ISx)BNkEjtq0ZYc#' );
define( 'SECURE_AUTH_KEY',  '<E#y7ei5%S!$r/J(Ri,P;H4`^ xq]x`noU$RiQNNM_fZAvF|37D28;yJ$_{!%|vC' );
define( 'LOGGED_IN_KEY',    '=9H^_a|;ja&eA_l+D ~q|qc3DYj){j2d6#/dv%l4:PCdsKWqL06Axms0NGocSiBG' );
define( 'NONCE_KEY',        'Nieu278b}jg@D%ty+=V6qq^:I$t5jEP]h:smc4j|Nq^G&^<.awC!Y19`^gIxUXbW' );
define( 'AUTH_SALT',        '>HPai8N4CQ{0Mr`F_Nd@:6k%xc{Fw:XYCK),A!QOacHD-cy,f.$nM2!b3FB=@=NV' );
define( 'SECURE_AUTH_SALT', 'Z+zc<Or7>t,480Flhxp6{2DN9kPe@v;Ah,Y0@ oS?<avo3%=k `t/ScX<4(N]{(n' );
define( 'LOGGED_IN_SALT',   'tFE*ip?d?Ph(*1gA{$>g_H&Qh8fANSwh8?oZkyEXz*kiMjGj6?KGR,F.>,SffeB ' );
define( 'NONCE_SALT',       'HI/QO1@]2_fi(+UV%0U,_OB-((5QU|_)Vy{n)IXV3wzv8u)W K2C^R>Ha.CM?BcU' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
