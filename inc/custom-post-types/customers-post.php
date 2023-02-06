<?php 

function customer_custom_post_type()
{

    $labels = array(
        'name'                => _x('Customers', 'Post Type General Name', 'nextblocktheme'),
        'singular_name'       => _x('Customers', 'Post Type Singular Name', 'nextblocktheme'),
        'menu_name'           => __('Customers', 'nextblocktheme'),
        'parent_item_colon'   => __('Parent Customer', 'nextblocktheme'),
        'all_items'           => __('All Customers', 'nextblocktheme'),
        'view_item'           => __('View Customer', 'nextblocktheme'),
        'add_new_item'        => __('Add New Customer', 'nextblocktheme'),
        'add_new'             => __('Add New', 'nextblocktheme'),
        'edit_item'           => __('Edit Customer', 'nextblocktheme'),
        'update_item'         => __('Update Customer', 'nextblocktheme'),
        'search_items'        => __('Search Customer', 'nextblocktheme'),
        'not_found'           => __('Not Found', 'nextblocktheme'),
        'not_found_in_trash'  => __('Not found in Trash', 'nextblocktheme'),
    );

    $args = array(
        'label'               => __('Customer', 'nextblocktheme'),
        'description'         => __('Customer', 'nextblocktheme'),
        'labels'              => $labels,
        'supports'            => array('title', 'editor', 'excerpt', 'author', 'thumbnail', 'custom-fields',),
        'taxonomies'          => array('genres'),
        'hierarchical'        => false,
        'public'              => true,
        'menu_icon'           => 'dashicons-admin-users',
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 8,
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'post',
        'show_in_rest'        => true,
        'rewrite'                => array(
            'slug' => 'customers',
            'with_front' => false
        ),
    );
    register_post_type('customers', $args);
}
add_action('init', 'customer_custom_post_type', 0);


add_action('init', 'customers_taxonomy', 0);
function customers_taxonomy()
{
    $labels = array(
        'name' => _x('Categories', 'nextblocktheme'),
        'singular_name' => _x('Category', 'nextblocktheme'),
        'search_items' =>  __('Category Search'),
        'all_items' => __('All Categories'),
        'parent_item' => __('Parent Category'),
        'parent_item_colon' => __('Parent Category:'),
        'edit_item' => __('Edit Category'),
        'update_item' => __('Update Category'),
        'add_new_item' => __('Add New Category'),
        'new_item_name' => __('New Category Name'),
        'menu_name' => __('Categories'),
    );

    register_taxonomy('category', array('customers'), array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'category', 'with_front' => false),
    ));
}