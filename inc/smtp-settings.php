<?php
function DT_register_setting()
{
    register_setting('dt_smtp_setting', 'smtp_host');
    register_setting('dt_smtp_setting', 'smtp_port');
    register_setting('dt_smtp_setting', 'smtp_username');
    register_setting('dt_smtp_setting', 'smtp_password');
    register_setting('dt_smtp_setting', 'smtp_secure');
    register_setting('dt_smtp_setting', 'smtp_from');
    register_setting('dt_smtp_setting', 'smtp_fromName');
}
add_action('admin_init', 'DT_register_setting');

function DT_register_options_page()
{
    add_options_page('SMTP Settings', 'SMTP Settings', 'manage_options', 'smtp_setting', 'DT_option_page');
}
add_action('admin_menu', 'DT_register_options_page');

function DT_option_page()
{
    $post_types = get_post_types(array('public' => true), 'names', 'and');
?>
    <div>
        <h2>SMTP Settings</h2>
        <form method="post" action="options.php">
            <?php settings_fields('dt_smtp_setting'); ?>
            <table>
                <tr valign="top">
                    <th scope="row"><label for="smtp_host">SMTP Host</label></th>
                    <td><input type="text" id="smtp_host" name="smtp_host" value="<?php echo get_option('smtp_host'); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label for="smtp_port">SMTP Port</label></th>
                    <td><input type="text" id="smtp_port" name="smtp_port" value="<?php echo get_option('smtp_port'); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label for="smtp_username">SMTP Username</label></th>
                    <td><input type="text" id="smtp_username" name="smtp_username" value="<?php echo get_option('smtp_username'); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label for="smtp_password">SMTP Password</label></th>
                    <td><input type="password" id="smtp_password" name="smtp_password" value="<?php echo get_option('smtp_password'); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label for="smtp_secure">SMTP Secure</label></th>
                    <td><input type="text" id="smtp_secure" name="smtp_secure" value="<?php echo get_option('smtp_secure'); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label for="smtp_from">From Email</label></th>
                    <td><input type="text" id="smtp_from" name="smtp_from" value="<?php echo get_option('smtp_from'); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label for="smtp_fromName">From Name</label></th>
                    <td><input type="text" id="smtp_fromName" name="smtp_fromName" value="<?php echo get_option('smtp_fromName'); ?>" /></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
<?php
}
function DT_phpmailer_example($phpmailer)
{
    $phpmailer->isSMTP();
    $phpmailer->Host = get_option('smtp_host');
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = get_option('smtp_port');
    $phpmailer->Username = get_option('smtp_username');
    $phpmailer->Password = get_option('smtp_password');

    // Additional settings…
    $phpmailer->SMTPSecure = get_option('smtp_secure'); // Choose 'ssl' for SMTPS on port 465, or 'tls' for SMTP+STARTTLS on port 25 or 587
    $phpmailer->From = get_option('smtp_from');
    $phpmailer->FromName = get_option('smtp_fromName');
    $phpmailer->SMTPDebug = 0; // write 0 if you don't want to see client/server communication in page
    $phpmailer->CharSet  = "utf-8";
}
add_action('phpmailer_init', 'DT_phpmailer_example');
