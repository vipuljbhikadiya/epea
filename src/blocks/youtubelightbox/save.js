/**
 * Wordpress dependencies
 */

import { __ } from '@wordpress/i18n';
export default function save() {
	return (
		<div class="lightbox-youtube lightbox-youtube--fadeIn">
			<div class="lightbox-youtube__container">
				<div class="lightbox-youtube__close-helper">
					<button class="lightbox-youtube__close"></button>
				</div>
				<div class="lightbox-youtube__video-helper">
					<iframe
						className="lightbox-youtube__video"
						src=""
						frameborder="0"
						allowfullscreen
						allow="autoplay;"
					></iframe>
				</div>
				<div class="lightbox-youtube__consent">
					<span class="headline headline--style-five headline--color-five">
						{ __( 'Wir benötigen Ihre Zustimmung, um den YouTube Video-Service zu laden!', 'epea-theme' ) }
					</span>
					<span class="text text--color-three text--style-two">
						{ __( 'Wir verwenden einen Service eines Drittanbieters, um Videoinhalte einzubetten. Dieser Service kann Daten zu Ihren Aktivitäten sammeln. Bitte lesen Sie die Details durch und stimmen Sie der Nutzung des Service zu, um dieses Video anzusehen.', 'epea-theme' ) }
					</span>
					<button onclick="UC_UI.showSecondLayer('BJz7qNsdj-7');" class="lightbox-youtube__consent-more button-default button--style-one button--width-inline button--color-four">{ __( 'Mehr Informationen', 'epea-theme' ) }</button>
					<button class="lightbox-youtube__consent-accept button-default button--style-one button--width-inline button--color-six">{ __( 'Akzeptieren', 'epea-theme' ) }</button>
				</div>
			</div>
		</div>
	);
}
