/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";

/**
 * Internal Dependencies
 */
import PlaceholderImg from "../../assets/images/placeholder.jpg";

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
        webpImageUrl,
        mdimageUrl,
        webpmdImageUrl,
        xsimageUrl,
        webpxsImageUrl,
				url,
				linkTarget,
				buttonText,
				buttonPosition,
        anchor,
      },
    } = this.props;
    const TagName = "div";
    return (
      <>
        <div class="col col--xs-12 col--md-6 col--pd-0">
          <div class="col__content">
            <TagName
              id={anchor ? anchor : null} 
              className={classnames(
                `image image--style-one image--button`,
              buttonPosition ? `image--button-${buttonPosition}` : ''
              )}>

              <div class="image__helper"></div>

              <picture>

                {!imageUrl ? (
                  <img src={PlaceholderImg} alt="placeholder" />
                ) : (
                  (imageUrl || mdimageUrl || xsimageUrl) && (
                    <>

                      {/* Tablet Image rendering */}
                      {mdimageUrl ? (
                        <>
                          {webpmdImageUrl ? (
                            <source
                              media="(min-width:481px)"
                              srcset={`${webpmdImageUrl}`}
                              type="image/webp"
                            />
                          ) : (
                            ""
                          )}
                          <source
                            media="(min-width:481px)"
                            srcset={`${mdimageUrl}`}
                          />
                        </>
                      ) : imageUrl ? (
                        <>
                          {webpImageUrl ? (
                            <source
                              media="(min-width:481px)"
                              srcset={`${webpImageUrl}`}
                              type="image/webp"
                            />
                          ) : (
                            ""
                          )}
                          <source media="(min-width:481px)" srcset={`${imageUrl}`} />
                        </>
                      ) : (
                        <>
                          {webpxsImageUrl ? (
                            <source
                              media="(min-width:481px)"
                              srcset={`${webpxsImageUrl}`}
                              type="image/webp"
                            />
                          ) : (
                            ""
                          )}
                          <source
                            media="(min-width:481px)"
                            srcset={`${xsimageUrl}`}
                          />
                        </>
                      )}
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
                      ) : mdimageUrl ? (
                        <>
                          {webpmdImageUrl ? (
                            <source
                              media="(max-width:480px)"
                              srcset={`${webpmdImageUrl}`}
                              type="image/webp"
                            />
                          ) : (
                            ""
                          )}
                          <source
                            media="(max-width:480px)"
                            srcset={`${mdimageUrl}`}
                          />
                        </>
                      ) : (
                        <>
                          {webpImageUrl ? (
                            <source
                              media="(max-width:480px)"
                              srcset={`${webpImageUrl}`}
                              type="image/webp"
                            />
                          ) : (
                            ""
                          )}
                          <source media="(max-width:480px)" srcset={`${imageUrl}`} />
                        </>
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
                  )
                )}
              </picture>
              {undefined == url || '' == url ? (
                <div className={`image__button`}>
                  <RichText.Content
                    value={buttonText} 
                    tagName="span"
                    className="image__button-text"
                  />
                </div>
              ) : (
                <a
                  href={url}
                  rel={linkTarget ? 'noopener' : null}
                  target={linkTarget ? linkTarget : null}
                  className={`image__button`}
                >
                  <RichText.Content
                    value={buttonText} 
                    tagName="span"
                    className="image__button-text"
                  />
                </a>
              )}
            </TagName>
          </div>
        </div>
      </>
    );
  }
}
