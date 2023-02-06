<?php

/**
 * Load assets for our blocks.
 *
 * @package epea-theme
 */



// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Load general assets for our blocks.
 *
 * @since 1.0.0
 */
class gbblocks_Block_Assets
{


	/**
	 * This plugin's instance.
	 *
	 * @var gbblocks_Block_Assets
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return gbblocks_Block_Assets
	 */
	public static function register()
	{
		if (null === self::$instance) {
			self::$instance = new gbblocks_Block_Assets();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct()
	{
		add_action('init', array($this, 'block_assets'));
		add_action('enqueue_block_editor_assets', array($this, 'editor_assets'));
		add_action('wp_enqueue_scripts', array($this, 'frontend_only_scripts'));
	}

	/**
	 * Loads the asset file for the given script or style.
	 * Returns a default if the asset file is not found.
	 *
	 * @param string $filepath The name of the file without the extension.
	 *
	 * @return array The asset file contents.
	 */
	public function get_asset_file($filepath)
	{
		$asset_path = GbBlocks_URL . 'build/' . $filepath . '.asset.php';

		return file_exists($asset_path)
			? include $asset_path
			: array(
				'dependencies' => array(),
				'version'      => GbBlocks_VERSION,
			);
	}

	/**
	 * Enqueue scripts that should only be available on the front end
	 */
	public function frontend_only_scripts()
	{
		$name       = 'gbblocks-main';
		$filepath   = 'build/js/' . $name;
		$asset_file = $this->get_asset_file($filepath);
		if (file_exists(GbBlocks_URL . $filepath . '.js')) {

			wp_enqueue_script(
				'gbblocks-frontend',
				GbBlocks_DIR . $filepath . '.js',
				$asset_file['dependencies'],
				$asset_file['version'],
				true
			);

			wp_localize_script(
				'gbblocks-frontend',
				'gb_ajax',
				array('ajaxurl' => admin_url('admin-ajax.php'), 'site_url' => site_url())
			);
		}
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets()
	{

		// Styles.
		$name       = 'main';
		$filepath   = 'styles/' . $name;
		$asset_file = $this->get_asset_file($filepath);

		if (file_exists(GbBlocks_URL . 'build/' . $filepath . '.css')) {
			wp_enqueue_style(
				'gbblocks-frontend',
				GbBlocks_DIR . 'build/' . $filepath . '.css',
				array(),
				$asset_file['version'],
			);
		}
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets()
	{

		// Styles.
		$name       = 'index';

		$allgbBlocks = gbblocks_Block_Assets::getListofBlocks();

		for ($b = 0; $b < count($allgbBlocks); $b++) {
			if (file_exists($allgbBlocks[$b] . '/index.js')) {

				$fileUrl = str_replace("\\", "/", addcslashes(str_replace(substr(strrchr(get_template_directory(), '/'), 1), '', substr($allgbBlocks[$b], strrpos(get_template_directory(), '/') + 1)) . '/' . $name, "\f\r\n\t"));

				$folder_name = basename($allgbBlocks[$b]);

				if ($folder_name == 'seo-plugin' || $folder_name == 'social-plugin') {
					$asset_file = $this->get_asset_file('blocks/' . $folder_name . '/' . $name);

					if (file_exists(get_template_directory() . '/' . $fileUrl . '.css')) {
						wp_enqueue_style(
							'gbblocks-' . $folder_name . '-editor',
							get_template_directory_uri() .  $fileUrl . '.css',
							array(),
							$asset_file['version']
						);
					}
					if (file_exists(get_template_directory() . $fileUrl . '.js')) {
						wp_enqueue_script(
							$folder_name,
							get_template_directory_uri() . $fileUrl . '.js',
							array_merge($asset_file['dependencies']),
							$asset_file['version'],
							true
						);
					}
				}
			}
		}

		// frontend js
		$name       = 'gbblocks-editor-main';
		$filepath   = 'build/js/' . $name;
		$asset_file = $this->get_asset_file($filepath);
		if (file_exists(GbBlocks_URL . $filepath . '.js')) {

			wp_enqueue_script(
				'gbblocks-editor',
				GbBlocks_DIR . $filepath . '.js',
				$asset_file['dependencies'],
				$asset_file['version'],
				true
			);
		}
	}

	public function getListofBlocks()
	{
		$blocks = [];

		if (is_dir(GbBlocks_URL . 'build/blocks/')) {
			$allBlocksFiles = (new \RecursiveTreeIterator(new \RecursiveDirectoryIterator(GbBlocks_URL . 'build/blocks/', \RecursiveDirectoryIterator::SKIP_DOTS)));
			foreach ($allBlocksFiles as $blockfile) {
				$getFile = trim(str_replace(['|', ' ', '~', '\\-'], '', $blockfile), '-');
				if (is_dir($getFile)) {
					$blocks[] = $getFile;
				}
			}
		}
		return $blocks;
	}

	/**
	 * Determine if the given post content contains any epea-theme blocks
	 *
	 * @access public
	 * @since  2.14.2
	 * @param  WP_Post $post_object Post object.
	 *
	 * @return boolean True when post content contains a epea-theme block.
	 */
	public function has_gbblocks_block(WP_Post $post_object)
	{

		return !empty(array_filter(
			array(
				false !== strpos($post_object->post_content, '<!-- wp:epea-theme/'),
				has_block('core/block', $post_object),
				has_block('core/button', $post_object),
				has_block('core/cover', $post_object),
				has_block('core/heading', $post_object),
				has_block('core/image', $post_object),
				has_block('core/gallery', $post_object),
				has_block('core/list', $post_object),
				has_block('core/paragraph', $post_object),
				has_block('core/pullquote', $post_object),
				has_block('core/quote', $post_object),
			)
		));
	}

	/**
	 * Return whether a post type should display the Block Editor.
	 *
	 * @param string $post_type The post_type slug to check.
	 */
	protected function is_post_type_gutenberg($post_type)
	{
		return use_block_editor_for_post_type($post_type);
	}

	/**
	 * Return whether the page we are on is loading the Block Editor.
	 */
	protected function is_page_gutenberg()
	{
		if (!is_admin()) {
			return false;
		}

		$admin_page = isset($_SERVER['REQUEST_URI']) ? wp_basename(esc_url_raw(filter_var(wp_unslash($_SERVER['REQUEST_URI']), FILTER_SANITIZE_URL))) : false;

		if (!$admin_page) {
			return false;
		}

		if (false !== strpos($admin_page, 'post-new.php') && empty($_GET['post_type'])) {
			return true;
		}

		if (false !== strpos($admin_page, 'post-new.php') && isset($_GET['post_type']) && $this->is_post_type_gutenberg(filter_input(INPUT_GET, wp_unslash($_GET['post_type']), FILTER_UNSAFE_RAW))) {
			return true;
		}

		if (false !== strpos($admin_page, 'post.php') && isset($_GET['post'])) {
			$wp_post = get_post(filter_input(INPUT_GET, wp_unslash($_GET['post']), FILTER_UNSAFE_RAW));
			if (isset($wp_post) && isset($wp_post->post_type) && $this->is_post_type_gutenberg($wp_post->post_type)) {
				return true;
			}
		}

		if (false !== strpos($admin_page, 'revision.php') && isset($_GET['revision'])) {
			$wp_post     = get_post(filter_input(INPUT_GET, wp_unslash($_GET['revision']), FILTER_UNSAFE_RAW));
			$post_parent = get_post($wp_post->post_parent);
			if (isset($post_parent) && isset($post_parent->post_type) && $this->is_post_type_gutenberg($post_parent->post_type)) {
				return true;
			}
		}
		return false;
	}
}

gbblocks_Block_Assets::register();
