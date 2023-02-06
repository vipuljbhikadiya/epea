/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

export default class Save extends Component {
  render() {
    const { anchor } = this.props.attributes;
    return (
      <div id={anchor ? anchor : null} className="slider-testimonial">
        <div className="splide splide--testimonial">
          <div className="splide__track">
            <div className="splide__list">
              <InnerBlocks.Content />
            </div>
            <div class="splide__arrows">
						  <button class="splide__arrow splide__arrow--prev" type="button" aria-label="Go to last slide" aria-controls="rewind-example-track">
						    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>
						  </button>
						  <button class="splide__arrow splide__arrow--next" type="button" aria-label="Next slide" aria-controls="rewind-example-track">
						    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>
						  </button>
					  </div>
          </div>
        </div>
      </div>
    );
  }
}
