/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import PlaceholderImg from "../../../assets/images/placeholder.jpg";
import { QuoteIconWhiteSm } from "../../../utils/block-icons";

export default class Save extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const {
      xsimageUrl,
      webpxsImageUrl,
      imageAlt,
      imageDefaultAlt,
      slideName,
      slidePosition,
      slideDescription,
    } = this.props.attributes;
    return (
      <div className="splide__slide">
        <div className="image image--style-one">

          <div class="image__helper"></div>

          <picture className="splide__image">
            {!xsimageUrl ? (
              <img src={PlaceholderImg} alt="placeholder" />
            ) : (
              <>
                {webpxsImageUrl ? (
                  <source
                    srcset={`${webpxsImageUrl}`}
                    type="image/webp"
                  />
                ) : (
                  ""
                )}
                <source srcset={`${xsimageUrl}`} />
                <img 
                  src={`${xsimageUrl}`}
                  alt={
                    "" !== imageAlt
                      ? `${imageAlt}`
                      : `${imageDefaultAlt}`
                  }
                  loading="lazy"
                />
              </>
            )}
          </picture>

          <span className="splide__icon">
            <QuoteIconWhiteSm />
          </span>
        
        </div>
        
        <div className="splide__content">
            <RichText.Content value={slideName} 
              tagName="span"
              className="splide__name headline headline--style-six headline--color-five"
            />
            <RichText.Content value={slidePosition} 
              tagName="span"
              className="splide__position text text--color-three text--style-three"
            />
            <RichText.Content value={slideDescription} 
              tagName="span"
              className="splide__description text text--color-three text--style-three"
            />
        </div>
      </div>
    );
  }
}