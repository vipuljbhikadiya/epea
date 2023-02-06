<?php 

// Blog Custom Post

function blogs_custom_post_type()
{

    $labels = array(
        'name' => _x('Blog', 'Post Type General Name', 'epea-theme'),
        'singular_name' => _x('Blogartikel', 'Post Type Singular Name', 'epea-theme'),
        'menu_name' => __('Blog', 'epea-theme'),
        'parent_item_colon' => __('Parent Blog', 'epea-theme'),
        'all_items' => __('All Blog Article', 'epea-theme'),
        'view_item' => __('View Blog Article', 'epea-theme'),
        'add_new_item' => __('Add New Blog Article', 'epea-theme'),
        'add_new' => __('Add New Blog Article', 'epea-theme'),
        'edit_item' => __('Edit Blog Article', 'epea-theme'),
        'update_item' => __('Update Blog Article', 'epea-theme'),
        'search_items' => __('Search Blog Article', 'epea-theme'),
        'not_found' => __('Not Found', 'epea-theme'),
        'not_found_in_trash' => __('Not found in Trash', 'epea-theme'),
    );

    $args = array(
        'label'                 => __('Blog', 'epea-theme'),
        'description'           => __('Blog', 'epea-theme'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'taxonomies'            => array('gener'),
        'hierarchical'          => false,
        'public'                => true,
        'menu_icon'             => 'dashicons-megaphone',
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_nav_menus'     => true,
        'show_in_admin_bar'     => true,
        'menu_position'         => 5,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rewrite'               => array(
            'slug'          => 'blog',
            'with_front'    => false
        ),
    );
    register_post_type('blog', $args);
}
add_action('init', 'blogs_custom_post_type', 0);

// Blog Custom Taxonomy
add_action('init', 'blog_taxonomy', 0);
function blog_taxonomy()
{
    $labels = array(
        'name' => _x('Categories', 'epea-theme'),
        'singular_name' => _x('Category', 'epea-theme'),
        'search_items' => __('Category Search', 'epea-theme'),
        'all_items' => __('All Categories', 'epea-theme'),
        'parent_item' => __('Parent Category', 'epea-theme'),
        'parent_item_colon' => __('Parent Category:', 'epea-theme'),
        'edit_item' => __('Edit Category', 'epea-theme'),
        'update_item' => __('Update Category', 'epea-theme'),
        'add_new_item' => __('Add New Category', 'epea-theme'),
        'new_item_name' => __('New Category Name', 'epea-theme'),
        'menu_name' => __('Categories', 'epea-theme'),
    );

    register_taxonomy('blog_category', array('blog'), array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'category', 'with_front' => false),
    ));
}
