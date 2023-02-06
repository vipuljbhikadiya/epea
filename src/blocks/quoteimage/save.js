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

/***
 * Interal dependencies
 */
import PlaceholderImg from "../../assets/images/placeholder.jpg";
import { QuoteIcon } from "../../utils/block-icons";

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
        showButton,
        buttonLink,
        buttonText,
        content,
        anchor,
      },
    } = this.props;

    return (
      <>
        <div
					id={anchor ? anchor : null}
					className={classnames(
						`quote-image`
					)}
				>
          <div class="quote-image__background">
            <>
              <picture>
                {imageUrl || mdimageUrl || xsimageUrl ? (
                  <>
                    {/* Desktop Image rendering */}
                    {imageUrl ? (
                      <>
                        {webpImageUrl ? (
                          <source
                            media="(min-width:1025px)"
                            srcset={`${webpImageUrl}`}
                            type="image/webp"
                          />
                        ) : (
                          ""
                        )}
                        <source media="(min-width:1025px)" srcset={`${imageUrl}`} />
                      </>
                    ) : mdimageUrl ? (
                      <>
                        {webpmdImageUrl ? (
                          <source
                            media="(min-width:1025px)"
                            srcset={`${webpmdImageUrl}`}
                            type="image/webp"
                          />
                        ) : (
                          ""
                        )}
                        <source
                          media="(min-width:1025px)"
                          srcset={`${mdimageUrl}`}
                        />
                      </>
                    ) : (
                      <>
                        {webpxsImageUrl ? (
                          <source
                            media="(min-width:1025px)"
                            srcset={`${webpxsImageUrl}`}
                            type="image/webp"
                          />
                        ) : (
                          ""
                        )}
                        <source
                          media="(min-width:1025px)"
                          srcset={`${xsimageUrl}`}
                        />
                      </>
                    )}
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
                ) : (
                  <img src={PlaceholderImg} alt="placeholder" />
                )}
              </picture>
            </>
          </div>
          <div className="quote-image__content">
            <QuoteIcon />
            <RichText.Content
              value={content} 
              tagName="span"
              className="headline headline--style-six headline--color-three"
            />
            {showButton == true ? (
              (undefined == buttonLink ? (
                <RichText.Content
                  className="button-default button--style-one button--width-inline button--color-six button--align-xs-left"
                  value={buttonText} 
                  tagName="div"
                />
              ) : (
                <RichText.Content
                  className="button-default button--style-one button--width-inline button--color-six button--align-xs-left"
                  href={buttonLink ? buttonLink.url : ""}
                  target={buttonLink ? buttonLink.opensInNewTab == true ? `_blank` : null : ""}
                  rel={buttonLink ? buttonLink.opensInNewTab == true ? `noopener` : null : ""}
                  value={buttonText} 
                  tagName="a"
                />
              ))
            ) : (
              ""
            )}
					</div>
        </div>
      </>
    );
  }
}
