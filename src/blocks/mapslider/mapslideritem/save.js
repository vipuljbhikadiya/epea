/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";

export default class Save extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const { adress, contact, ButtonLink } = 
      this.props.attributes;

    return (

      <div className="splide__slide">
        <RichText.Content
          value={adress} 
          tagName="span"
          className="slider-map__adress text text--align-xs-left text--color-three text--style-two"
        />
        <RichText.Content
          value={contact} 
          tagName="span"
          className="slider-map__contact text text--align-xs-left text--color-three text--style-two"
        />
        {ButtonLink == '' ? (
          ""
        ) : (          
          <a
            href={ButtonLink}
            target="_blank"
            rel="noopener"
            class="button-default button--style-one button--width-inline button--color-six button--align-xs-left"
          >
            {__("Directions", "epea-theme")} 
          </a>
        )}
      </div>
    );
  }
}
