
<?php function epea_option_setting()
{
    register_setting('epea_theme_setting', 'mailchimpapikey');
    register_setting('epea_theme_setting', 'listid');
    register_setting('epea_theme_setting', 'serverprefix');
}

add_action('admin_init', 'epea_option_setting');

/**
 * Registers a new options page under Themes.
 */

add_action('admin_menu', 'theme_option_setting_page_menu');

function theme_option_setting_page_menu()
{
    add_theme_page(
        __('Mailchimp Options', 'epea-theme'),
        __('MailChimp Setting', 'epea-theme'),
        'manage_options',
        'mailchimp',
        'mailchimp_callback'
    );
}

/**
 * Settings page display callback.
 */
function mailchimp_callback()
{ ?>
    <style>
        .mailchimpdata .postbox {
            width: 1024px;
            max-width: 100%;
        }

        .mailchimpdata .wp-meta-fields-table .wp-meta-fields-content input[type="text"] {
            width: 100%;
        }
    </style>
    <h2>Mailchimp Settings</h2>
    <div id="poststuff" class="mailchimpdata">
        <div id="postbox-container-2" class="postbox-container">
            <div id="mailchimp-meta-box" class="postbox ">
                <div class="postbox-header">
                    <h2 class="hndle ui-sortable-handle">Mailchimp API Details</h2>
                </div>
                <div class="inside">
                    <form method="post" action="options.php">
                        <?php settings_fields('epea_theme_setting'); ?>
                        <table class="widefat wp-meta-fields-table">
                            <tr class="wp-meta-fields-row">
                                <td class="wp-meta-fields-heading"><label for="login_url">Mailchimp Api key:</label></td>
                                <td class="wp-meta-fields-content"><input type="text" id="mailchimpapikey" name="mailchimpapikey" value="<?php echo get_option('mailchimpapikey'); ?>" /></td>
                            </tr>
                            <tr class="wp-meta-fields-row">
                                <td class="wp-meta-fields-heading"><label for="listid">Mailchimp List ID:</label></td>
                                <td class="wp-meta-fields-content"><input type="text" id="listid" name="listid" value="<?php echo get_option('listid'); ?>" /></td>
                            </tr>
                            <tr class="wp-meta-fields-row">
                                <td class="wp-meta-fields-heading"><label for="serverprefix">Mailchimp Server Prefix:</label></td>
                                <td class="wp-meta-fields-content"><input type="text" id="serverprefix" name="serverprefix" value="<?php echo get_option('serverprefix'); ?>" /></td>
                            </tr>
                            <tr class="wp-meta-fields-row">
                                <td class="wp-meta-fields-heading"></td>
                                <td class="wp-meta-fields-content"><?php submit_button(); ?></td>
                            </tr>
                        </table>

                    </form>
                </div>
            </div>
        </div>
    </div>

<?php }