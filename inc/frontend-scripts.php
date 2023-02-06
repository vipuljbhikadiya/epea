<?php

// Scripts for all Systems ---------------------------------------------

// Remove default WordPress Favicon
add_filter( 'get_site_icon_url', '__return_false' );

// Enqueue Favicon Tags
function cutoms_favicon_script() {
    
    echo '<link rel="icon" type="image/png" sizes="192x192" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/android-icon-192x192.png">';
    echo '<link rel="icon" type="image/png" sizes="32x32" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/favicon-32x32.png">';
    echo '<link rel="icon" type="image/png" sizes="96x96" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/favicon-96x96.png">';
    echo '<link rel="icon" type="image/png" sizes="16x16" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/favicon-16x16.png">';
    echo '<link rel="shortcut icon" type="image/x-icon" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/favicon.ico">';

    echo '<link rel="apple-touch-icon" sizes="57x57" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/apple-icon-57x57.png">';
    echo '<link rel="apple-touch-icon" sizes="60x60" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/apple-icon-60x60.png">';
    echo '<link rel="apple-touch-icon" sizes="72x72" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/apple-icon-72x72.png">';
    echo '<link rel="apple-touch-icon" sizes="76x76" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/apple-icon-76x76.png">';
    echo '<link rel="apple-touch-icon" sizes="114x114" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/apple-icon-114x114.png">';
    echo '<link rel="apple-touch-icon" sizes="120x120" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/apple-icon-120x120.png">';
    echo '<link rel="apple-touch-icon" sizes="144x144" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/apple-icon-144x144.png">';
    echo '<link rel="apple-touch-icon" sizes="152x152" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/apple-icon-152x152.png">';
    echo '<link rel="apple-touch-icon" sizes="180x180" href="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/apple-icon-180x180.png">';

    echo '<meta name="msapplication-TileColor" content="#ffffff">';
    echo '<meta name="msapplication-TileImage" content="' . site_url() . '/wp-content/themes/epea-theme/assets/images/favicon/ms-icon-144x144.png">';
}
add_action( 'wp_head', 'cutoms_favicon_script', 2 );


// Scripts for Development and Staging Systems -------------------------
if (wp_get_environment_type() === 'development' || wp_get_environment_type() === 'staging') {

} 


// Scripts for Production System ---------------------------------------
else {

    // Enqueue Usercentrics Scripts
    function usercentrics_script() {
        echo '
            <link rel="preconnect" href="//app.usercentrics.eu">
            <link rel="preconnect" href="//api.usercentrics.eu">
            <link rel="preload" href="//app.usercentrics.eu/browser-ui/latest/loader.js" as="script">
            <script id="usercentrics-cmp" data-settings-id="" src="https://app.usercentrics.eu/browser-ui/latest/loader.js" async></script>
        ';
    }
    add_action( 'wp_head', 'usercentrics_script', 2 );

    // Enqueue Google Tag Manager Script
    function google_tag_manager_main_script() {
        echo "
            <script type='text/plain' data-usercentrics='Google Tag Manager'>
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5GK5FC8');
            </script>
        ";
    }
    add_action( 'wp_head', 'google_tag_manager_main_script', 20 );

}