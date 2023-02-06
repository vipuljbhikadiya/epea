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
        imageStyle,
        anchor,
      },
    } = this.props;
    const TagName = "div";
    return (
      <>
        <TagName
          id={anchor ? anchor : null} 
          className={classnames(
            `image image--style-${imageStyle}`
          )}>

          {imageStyle == 'one' ? (
            <div class="image__helper"></div>
          ) : (
            ''
          )}
        
          <picture>

            {!imageUrl ? (
              <img src={PlaceholderImg} alt="placeholder" />
            ) : (
              (imageUrl || mdimageUrl || xsimageUrl) && (
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
              )
            )}
          </picture>
        </TagName>
      </>
    );
  }
}
