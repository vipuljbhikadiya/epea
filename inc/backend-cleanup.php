<?php

/**
 * Removes some menus by page.
 */
function remove_menus()
{
    remove_menu_page('edit.php');                   //Posts
    remove_menu_page('edit-comments.php');          //Comments

}
add_action('admin_menu', 'remove_menus');

function theme_custom_menu_order($menu_ord)
{
    return array(
        'index.php', // Dashboard
        'separator1', // First separator
        'edit.php?post_type=page',
        'edit.php?post_type=blog', // Posts
		'edit.php?post_type=customers', // Customers
		'edit.php?post_type=downloads', // Downloads
        'upload.php', // media
        'separator2', // Second separator
        'themes.php', // Appearance
        'plugins.php', // Plugins
        'users.php', // Users
        'tools.php', // Tools
        'options-general.php', // Settings
        'separator-last', // Last separator
    );
}
add_filter('custom_menu_order', 'theme_custom_menu_order', 10, 1);
add_filter('menu_order', 'theme_custom_menu_order', 10, 1);

/**
 * remove theme support
 */
if (!function_exists('DT_theme_setup')) :

    function DT_theme_setup()
    {
        remove_theme_support('automatic-feed-links');
        remove_theme_support('editor-styles');
        remove_theme_support('editor-script');
        remove_theme_support('wp-block-styles');
        remove_theme_support('core-block-patterns');
        add_theme_support('menus');
        add_theme_support('post-thumbnails');

        // register new sizes images
        add_image_size('xs', 480);
        add_image_size('md', 1024);
        add_image_size('xl', 1920);
    }

endif;
add_action('after_setup_theme', 'DT_theme_setup');

/**
 * Add custom image size
 */
add_filter('image_size_names_choose', 'child_custom_sizes');

function child_custom_sizes($sizes)
{
    return array_merge($sizes, array(
        'xl' =>             __('Large'),
        'md' =>             __('Medium'),
        'xs' =>             __('Small'),
    ));
}

/**
 * Allowed custom blocks 
 * Removed default core blocks
 */
add_filter('allowed_block_types_all', 'theme_allowed_block_types');
function theme_allowed_block_types($allowed_blocks)
{
    return array(
        'epea-theme/header',
        'epea-theme/headerlanguage',
        'epea-theme/footer',
        'epea-theme/footersection',
        'epea-theme/footercolumn',
        'epea-theme/footerlogo',
        'epea-theme/youtubelightbox',
        'epea-theme/navigation',
        'epea-theme/section',
        'epea-theme/sectionswipe',
        'epea-theme/sectionhero',
        'epea-theme/sectionherosub',
        'epea-theme/row',
        'epea-theme/column',
        'epea-theme/headline',
        'epea-theme/paragraph',
        'epea-theme/button',
        'epea-theme/list',
        'epea-theme/listitem',
        'epea-theme/listlink',
        'epea-theme/listlinkitem',
        'epea-theme/image',
        'epea-theme/imagebutton',
        'epea-theme/quote',
        'epea-theme/quoteimage',
        'epea-theme/divider',
        'epea-theme/icon',
        'epea-theme/youtube',
        'epea-theme/customerpreview',
        'epea-theme/bloglisting',
        'epea-theme/blogslider',
        'epea-theme/customerlisting',
        'epea-theme/overlaylisting',
        'epea-theme/overlaylistingitem',
        'epea-theme/cardlisting',
        'epea-theme/cardlistingitem',
        'epea-theme/joblisting',
        'epea-theme/joblistingitem',
        'epea-theme/downloadlisting',
        'epea-theme/form',
        'epea-theme/newsletter',
        'epea-theme/accordion',
        'epea-theme/accordionitem',
        'epea-theme/tabsslider',
        'epea-theme/tabsslideritem',
        'epea-theme/timelineslider',
        'epea-theme/timelineslideritem',
        'epea-theme/mapslider',
        'epea-theme/mapslideritem',
        'epea-theme/icontext',
        'epea-theme/testimonialslider',
        'epea-theme/testimonialslide',
        'epea-theme/circleslider',
        'epea-theme/circleslideritem',
        'epea-theme/visualimage',
        'epea-theme/visualheadline',
        'epea-theme/visualcircle',
        'epea-theme/visualcircleitem',
    );
}

if (file_exists(get_template_directory() . '/inc/image-handling.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/image-handling.php';
}

if (file_exists(get_template_directory() . '/inc/smtp-settings.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/smtp-settings.php';
}

if (file_exists(get_template_directory() . '/inc/mailchimp-settings.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/mailchimp-settings.php';
}

if (file_exists(get_template_directory() . '/inc/custom-post-types/blog-post.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/custom-post-types/blog-post.php';
}
if (file_exists(get_template_directory() . '/inc/custom-post-types/customers-post.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/custom-post-types/customers-post.php';
}
if (file_exists(get_template_directory() . '/inc/custom-post-types/downloads-post.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/custom-post-types/downloads-post.php';
}
if (file_exists(get_template_directory() . '/inc/WP-HTML-Compression.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/WP-HTML-Compression.php';
}

/**
 * Enable auto updates for plugins
 */
add_filter( 'auto_update_plugin', '__return_true' );

/**
 * Hide dashboard update notifications for all users
 */
function hide_update_notification_dashboard() {
    remove_action( 'admin_notices', 'update_nag', 3 );
}
add_action('admin_menu','hide_update_notification_dashboard');