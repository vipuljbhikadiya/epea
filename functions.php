<?php

/**
 * Default Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage epea-theme
 * @since Default Theme 1.0
 */

if (file_exists(get_template_directory() . '/inc/preload-handling.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/preload-handling.php';
}

if (file_exists(get_template_directory() . '/inc/block-settings.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/block-settings.php';
}
