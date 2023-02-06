<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

define('GbBlocks_VERSION', '1.0.0');
define('GbBlocks_DIR', get_template_directory_uri() . '/inc/gbblocks/');
define('GbBlocks_URL', get_template_directory() . '/inc/gbblocks/');
define('GbBlocks_FILE', __FILE__);
define('GbBlocks_API_NAMESPACE', 'gbblocks');

if (!class_exists('GbBlocks')) :
    /**
     * Main GbBlocks Class.
     *
     * @since 1.0.0
     */
    final class GbBlocks
    {
        /**
         * This blocks's instance.
         *
         * @var GbBlocks
         * @since 1.0.0
         */
        private static $instance;

        /**
         * Main GbBlocks Instance.
         *
         * Insures that only one instance of GbBlocks exists in memory at any one
         * time. Also prevents needing to define globals all over the place.
         *
         * @since 1.0.0
         * @static
         * @return object|GbBlocks The one true GbBlocks
         */
        public static function instance()
        {
            if (!isset(self::$instance) && !(self::$instance instanceof GbBlocks)) {
                self::$instance = new GbBlocks();
                self::$instance->init();
                self::$instance->includes();
            }
            return self::$instance;
        }

        /**
         * Throw error on object clone.
         *
         * The whole idea of the singleton design pattern is that there is a single
         * object therefore, we don't want the object to be cloned.
         *
         * @since 1.0.0
         * @access protected
         * @return void
         */
        public function __clone()
        {
            // Cloning instances of the class is forbidden.
            _doing_it_wrong(__FUNCTION__, esc_html__('Something went wrong.', 'GbBlocks'), '1.0');
        }

        /**
         * Disable unserializing of the class.
         *
         * @since 1.0.0
         * @access protected
         * @return void
         */
        public function __wakeup()
        {
            // Unserializing instances of the class is forbidden.
            _doing_it_wrong(__FUNCTION__, esc_html__('Something went wrong.', 'GbBlocks'), '1.0');
        }

        /**
         * Include required files.
         *
         * @access private
         * @since 1.0.0
         * @return void
         */
        private function includes()
        {

            require_once(GbBlocks_URL . 'includes/class-gbblocks-block-assets.php');
        }


        /**
         * Load actions
         *
         * @return void
         */
        private function init()
        {

            add_action('after_setup_theme', array($this, 'load_textdomain'), 99);
            add_action('enqueue_block_editor_assets', array($this, 'block_localization'));
            add_action('init', array($this, 'register_blocks_inside_theme'), 100, 9);
        }

        /**
         * Loads blocks from metadata
         *
         * @access public
         * @since 1.0.0 
         * @return void
         */
        public function register_blocks_inside_theme()
        {
            $gbblocks_Block_Assets = new gbblocks_Block_Assets();
            $dirs = $gbblocks_Block_Assets->getListofBlocks();


            if ($dirs) {
            
                foreach ($dirs as $block) {
 
                    $fileUrl = str_replace("\\", "/", addcslashes(str_replace(substr(strrchr(get_template_directory(), '/'), 1), '', substr($block, strrpos(get_template_directory(), '/') + 1)), "\f\r\n\t"));
                    
                    if ($block) {
                        $registerfile = get_template_directory() . $fileUrl . '/register.php';
                        
                        if (file_exists($registerfile)) {
                                require_once($registerfile);
                        }
                    }

                }
            }
        }

        /**
         * Returns URL to the asset path.
         *
         * @param string $path Any extra directories needed.
         */
        public function asset_source($path = null)
        {
            return GbBlocks_URL . trailingslashit(path_join('dist', $path));
        }

        /**
         * Loads the theme language files.
         *
         * @access public
         * @since 1.0.0 
         * @return void
         */
        public function load_textdomain()
        {
            load_theme_textdomain('gbblocks', false);
        }

        /**
         * Enqueue localization data for our blocks.
         *
         * @access public
         */
        public function block_localization()
        {
            if (function_exists('wp_set_script_translations')) {
                wp_set_script_translations('gbblocks-editor', 'gbblocks', GbBlocks_URL . '/languages');
            }
        }
    }
endif;


/**
 * The main function for that returns GbBlocks
 *
 * The main function responsible for returning the one true GbBlocks
 * Instance to functions everywhere.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * Example: <?php $gbblocks = GbBlocks(); ?>
 *
 * @since 1.0.0
 * @return object|GbBlocks The one true GbBlocks Instance.
 */
function GbBlocks()
{
    return GbBlocks::instance();
}

// Get the plugin running. Load on plugins_loaded action to avoid issue on multisite.
if (function_exists('is_multisite') && is_multisite()) {
    add_action('init', 'GbBlocks', 90);
} else {
    GbBlocks();
}
