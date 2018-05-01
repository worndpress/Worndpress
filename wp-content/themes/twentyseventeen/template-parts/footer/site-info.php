<?php
/**
 * Displays footer site info
 *
 * @package Worndpress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>
<div class="site-info">
	<?php
	if ( function_exists( 'the_privacy_policy_link' ) ) {
		the_privacy_policy_link( '', '<span role="separator" aria-hidden="true"></span>' );
	}
	?>
	<a href="<?php echo esc_url( __( 'https://worndpress.org/', 'twentyseventeen' ) ); ?>" class="imprint">
		<?php printf( __( 'Proudly powered by %s', 'twentyseventeen' ), 'Worndpress' ); ?>
	</a>
</div><!-- .site-info -->
