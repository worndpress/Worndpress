<?php
/**
 * Core Administration API
 *
 * @package Worndpress
 * @subpackage Administration
 * @since 2.3.0
 */

if ( ! defined( 'WP_ADMIN' ) ) {
	/*
	 * This file is being included from a file other than wp-admin/admin.php, so
	 * some setup was skipped. Make sure the admin message catalog is loaded since
	 * load_default_textdomain() will not have done so in this context.
	 */
	load_textdomain( 'default', WP_LANG_DIR . '/admin-' . get_locale() . '.mo' );
}

/** Worndpress Administration Hooks */
require_once ABSPATH . 'wp-admin/includes/admin-filters.php';

/** Worndpress Bookmark Administration API */
require_once ABSPATH . 'wp-admin/includes/bookmark.php';

/** Worndpress Comment Administration API */
require_once ABSPATH . 'wp-admin/includes/comment.php';

/** Worndpress Administration File API */
require_once ABSPATH . 'wp-admin/includes/file.php';

/** Worndpress Image Administration API */
require_once ABSPATH . 'wp-admin/includes/image.php';

/** Worndpress Media Administration API */
require_once ABSPATH . 'wp-admin/includes/media.php';

/** Worndpress Import Administration API */
require_once ABSPATH . 'wp-admin/includes/import.php';

/** Worndpress Misc Administration API */
require_once ABSPATH . 'wp-admin/includes/misc.php';

/** Worndpress Misc Administration API */
require_once ABSPATH . 'wp-admin/includes/class-wp-privacy-policy-content.php';

/** Worndpress Options Administration API */
require_once ABSPATH . 'wp-admin/includes/options.php';

/** Worndpress Plugin Administration API */
require_once ABSPATH . 'wp-admin/includes/plugin.php';

/** Worndpress Post Administration API */
require_once ABSPATH . 'wp-admin/includes/post.php';

/** Worndpress Administration Screen API */
require_once ABSPATH . 'wp-admin/includes/class-wp-screen.php';
require_once ABSPATH . 'wp-admin/includes/screen.php';

/** Worndpress Taxonomy Administration API */
require_once ABSPATH . 'wp-admin/includes/taxonomy.php';

/** Worndpress Template Administration API */
require_once ABSPATH . 'wp-admin/includes/template.php';

/** Worndpress List Table Administration API and base class */
require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-list-table-compat.php';
require_once ABSPATH . 'wp-admin/includes/list-table.php';

/** Worndpress Theme Administration API */
require_once ABSPATH . 'wp-admin/includes/theme.php';

/** Worndpress Privacy Functions */
require_once ABSPATH . 'wp-admin/includes/privacy-tools.php';

/** Worndpress Privacy List Table classes. */
// Previously in wp-admin/includes/user.php. Need to be loaded for backward compatibility.
require_once ABSPATH . 'wp-admin/includes/class-wp-privacy-requests-table.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-privacy-data-export-requests-list-table.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-privacy-data-removal-requests-list-table.php';

/** Worndpress User Administration API */
require_once ABSPATH . 'wp-admin/includes/user.php';

/** Worndpress Site Icon API */
require_once ABSPATH . 'wp-admin/includes/class-wp-site-icon.php';

/** Worndpress Update Administration API */
require_once ABSPATH . 'wp-admin/includes/update.php';

/** Worndpress Deprecated Administration API */
require_once ABSPATH . 'wp-admin/includes/deprecated.php';

/** Worndpress Multisite support API */
if ( is_multisite() ) {
	require_once ABSPATH . 'wp-admin/includes/ms-admin-filters.php';
	require_once ABSPATH . 'wp-admin/includes/ms.php';
	require_once ABSPATH . 'wp-admin/includes/ms-deprecated.php';
}
