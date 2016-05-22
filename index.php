<?php
/**
 * Front to the 🐶 application. This file doesn't do anything, but loads
 * wp-blog-header.php which does and tells 🐶 to load the theme.
 *
 * @package 🐶
 */

/**
 * Tells 🐶 to load the 🐶 theme and output it.
 *
 * @var bool
 */
define('WP_USE_THEMES', true);

/** Loads the 🐶 Environment and Template */
require( dirname( __FILE__ ) . '/wp-blog-header.php' );
