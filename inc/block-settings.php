<?php
// ADD BLOCK CATEGORY: SECTIONS
function register_block_category_sections( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-sections',
		'title' => 'Sections'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_sections' );

// ADD BLOCK CATEGORY: HEROS
function register_block_category_heros( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-heros',
		'title' => 'Sections | Heros'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_heros' );

// ADD BLOCK CATEGORY: GRID
function register_block_category_grid( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-grid',
		'title' => 'Grid'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_grid' );

// ADD BLOCK CATEGORY: BASIC
function register_block_category_basic( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-basic',
		'title' => 'Basic'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_basic' );

// ADD BLOCK CATEGORY: ADVANCED
function register_block_category_advanced( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-advanced',
		'title' => 'Advanced'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_advanced' );

// ADD BLOCK CATEGORY: STRUCTURE
function register_block_category_structure( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-structure',
		'title' => 'Structure'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_structure' );

// ADD BLOCK CATEGORY: SPECIAL
function register_block_category_special( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-special',
		'title' => 'Special'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_special' );

// ADD BLOCK CATEGORY: PREVIEW
function register_block_category_preview( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-preview',
		'title' => 'Preview'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_preview' );

// ADD BLOCK CATEGORY: LISTING
function register_block_category_listing( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-listing',
		'title' => 'Listing'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_listing' );

// ADD BLOCK CATEGORY: SLIDER
function register_block_category_slider( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-slider',
		'title' => 'Slider'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_slider' );

// ADD BLOCK CATEGORY: DO NOT USE
function register_block_category_not_use( $categories ) {
	
	$categories[] = array(
		'slug'  => 'block-category-not-use',
		'title' => 'Do not use'
	);

	return $categories;
}
add_filter( 'block_categories_all', 'register_block_category_not_use' );