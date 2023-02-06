<?php 

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */

register_block_type(
    GbBlocks_URL . 'build/blocks/newsletter',
);

add_action("wp_ajax_newsletter__form", "newsletter__form_callback");
add_action("wp_ajax_nopriv_newsletter__form", "newsletter__form_callback");

function newsletter__form_callback()
{
    $msg = __("Subscription unsuccessfull. Please try again.");
    $status = false;
    $subscription_status = '';

    $responsedata = array(
        'status' => $status,
        'msg' =>  $msg,
        'subscription_status' => $subscription_status
    );

    $apiKey =   get_option('mailchimpapikey');
    $server =   get_option('serverprefix');
    $list_id =  get_option('listid');

    if (!empty($apiKey) && !empty($server) && !empty($list_id)) {

        $apiKey = trim($apiKey);
        $server = trim($server);
        $list_id = trim($list_id);

        $keyName =  'key:' . $apiKey;

        $token = base64_encode($keyName);

        if ($_POST) {
            $timediff = strtotime(date('Y-m-d H:i:s', time())) - strtotime(date('Y-m-d H:i:s', $_POST['time']));
            if (!empty($_POST['subscriber_email']) || $timediff <= 3) {
                $responsedata['subscription_status'] = true;
                $responsedata['status'] = true;
                $responsedata['msg'] = __("processed sucessfully.", "epea-theme");
            } else {
                $email = isset($_POST['your-email']) ? trim($_POST['your-email']) : '';

                if (!empty($email)) {
                    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

                    $data = array(
                        'email_address' => $email,
                        "status" => "subscribed",
                    );

                    $submit_url =  'https://' . $server . '.api.mailchimp.com/3.0/lists/' . $list_id . '/members';

                    $payload = json_encode($data);

                    $curl = curl_init();

                    curl_setopt_array($curl, array(
                        CURLOPT_URL => $submit_url,
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_ENCODING => '',
                        CURLOPT_MAXREDIRS => 10,
                        CURLOPT_TIMEOUT => 0,
                        CURLOPT_FOLLOWLOCATION => true,
                        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                        CURLOPT_CUSTOMREQUEST => 'POST',
                        CURLOPT_POSTFIELDS => $payload,
                        CURLOPT_HTTPHEADER => array(
                            'Authorization: Basic ' . $token,
                            'Content-Type: application/json'
                        ),
                    ));

                    $response = curl_exec($curl);

                    $response = json_decode($response, true);

                    if (isset($response['status']) and $response['status'] == "subscribed") {
                        $responsedata['subscription_status'] = true;
                        $responsedata['status'] = true;
                        $responsedata['msg'] = __("processed sucessfully.", "epea-theme");
                    }
                }
            }
        }
    }

    wp_send_json_success($responsedata);
}
