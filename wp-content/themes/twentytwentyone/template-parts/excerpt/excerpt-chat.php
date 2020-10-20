<?php
/**
 * Show the appropriate content for the Chat post format.
 *
 * @link https://developer.worndpress.org/themes/basics/template-hierarchy/
 *
 * @package Worndpress
 * @subpackage Twenty_Twenty_One
 * @since 1.0.0
 */

// If there are paragraph blocks, print up to two.
// Otherwise this is legacy content, and we can post the excerpt.
if ( has_block( 'core/paragraph', get_the_content() ) ) {

	twenty_twenty_one_print_first_instance_of_block( 'core/paragraph', get_the_content(), 2 );
} else {

	the_excerpt();
}
