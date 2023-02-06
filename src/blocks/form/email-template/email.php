<?php 

/**
 * Email Template
 */

?>

<!DOCTYPE html>
<html>
    <body>
        <center>
            <table width="100%" style="padding:0; text-align:left; font-family: Arial, sans-serif; font-size:16px; background-color: #575757;" border="0" cellpadding="0" cellspacing="0" align="center">
                <tr style="background-color:#E3E3E3;">
                    <td align="center" colspan="3" valign="middle" style="padding:20px 20px 20px 20px;text-align:center;">
                        <a href="<?php echo site_url(); ?>" target="_blank" style="display: inline-block; text-decoration:none; color:#575757; width:150px;">
                        <img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/logo.png" border="0" height="auto" width="auto" />
                        </a>
                    </td>
                </tr>
                <tr>
                    <td align="center" width="10%" valign="middle"></td>
                    <td align="center" width="80%" valign="middle" style="padding:60px 20px 60px 20px; text-align:left;">
                        <h1 style="font-size: 20px; line-height: 22px; margin-bottom: 40px;">Contact Request Data:</h1>
                        <ul>
                            <li style="font-size: 14px; line-height: 16px; margin-bottom: 8px; color: #575757;"><strong>First-Name:</strong> <?php echo $_REQUEST['firstname']; ?></li>
                            <li style="font-size: 14px; line-height: 16px; margin-bottom: 8px; color: #575757;"><strong>Last-Name:</strong> <?php echo $_REQUEST['lastname']; ?></li>
                            <li style="font-size: 14px; line-height: 16px; margin-bottom: 8px; color: #575757;"><strong>Company:</strong> <?php echo $_REQUEST['company']; ?></li>
                            <li style="font-size: 14px; line-height: 16px; margin-bottom: 8px; color: #575757;"><strong>E-Mail-Adress:</strong> <?php echo $_REQUEST['email']; ?></li>
                            <li style="font-size: 14px; line-height: 16px; margin-bottom: 8px; color: #575757;"><strong>Message:</strong> <?php if ('' != $_REQUEST['message']) : echo $_REQUEST['message']; endif; ?></li>
                        </ul>
                        <ul>
                    </td>
                    <td align="center" width="10%" valign="middle"></td>
                </tr>
            </table>
        </center>
    </body>
</html>