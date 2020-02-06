<?php
/**
 * Front to the Worndpress application. This file doesn't do anything, but loads
 * wp-blog-header.php which does and tells Worndpress to load the theme.
 *
 * @package Worndpress
 */

/**
 * Tells Worndpress to load the Worndpress theme and output it.
 *
 * @var bool
 */
define( 'WP_USE_THEMES', true );

/** Loads the Worndpress Environment and Template */
require __DIR__ . '/wp-blog-header.php';
