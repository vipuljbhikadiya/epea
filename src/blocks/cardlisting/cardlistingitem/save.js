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
    const {
      attributes: {
        imageAlt,
        imageDefaultAlt,
        imageUrl,
        mdimageUrl,
        xsimageUrl,
        webpxsImageUrl,
        headline,
        paragraph,
        buttonText,
        itemLink,
      },
    } = this.props;

    return (
      <>
        <div className="listing-card__item col col--pd-0  col--xs-12 col--sm-6 col--lg-4 col--xl-3">
          <div className="col__content">
            <div className="image image--style-two">
              <picture className={`image__content`}>
                {(imageUrl || mdimageUrl || xsimageUrl) && (
                  <>
                    {/* Mobile Image rendering */}
                    {xsimageUrl ? (
                      <>
                        {webpxsImageUrl ? (
                          <source
                            media="(max-width:480px)"
                            srcset={`${webpxsImageUrl}`}
                            type="image/webp"
                          />
                        ) : (
                          ""
                        )}
                        <source
                          media="(max-width:480px)"
                          srcset={`${xsimageUrl}`}
                        />
                      </>
                    ) : (
                      ""
                    )}
                    <img
                      src={`${imageUrl}`}
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
            </div>

            <span className="headline headline--style-four headline--color-five">
              <RichText.Content value={headline} />
            </span>

            <span className="text text--color-three text--style-three">
              <RichText.Content value={paragraph} />
            </span>

            {undefined == itemLink ? (
              <div className="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left">
                <div className="icon icon--bgcolor-five icon--color-two">
                  <div className="icon__helper"></div>
                  <i className="icon__visual icon-41-external"></i>
                </div>
                <div className="button__helper">
                  <RichText.Content value={buttonText} />
                </div>
              </div>
            ) : (
              <a
                href={itemLink.url}
                target={itemLink.opensInNewTab == true ? `_blank` : null}
                rel={itemLink.opensInNewTab ? "noopener" : null}
                className="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left"
              >
                <div className="icon icon--bgcolor-five icon--color-two">
                  <div className="icon__helper"></div>
                  <i className="icon__visual icon-41-external"></i>
                </div>
                <div className="button__helper">
                  <RichText.Content value={buttonText} />
                </div>
              </a>
            )}
          </div>
        </div>
      </>
    );
  }
}
