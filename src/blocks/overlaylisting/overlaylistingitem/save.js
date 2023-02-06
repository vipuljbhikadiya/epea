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
        content,
        itemLink,
      },
    } = this.props;

    const innerContent = () => {
      return (
        <>
          <picture className={`listing-overlay__image`}>
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
          <span className="listing-overlay__title headline headline--align-xs-left headline--style-seven headline--color-five">
            <RichText.Content value={content} />
          </span>
        </>
      );
    };

    return (
      <>
        {undefined == itemLink ? (
          <div className="listing-overlay__item col col--xs-12 col--md-6 col--xl-4 col--pd-0">
            <div className="col__content">
              {innerContent()}
            </div>
          </div>
        ) : (
          <a
            href={itemLink.url}
            target={itemLink.opensInNewTab == true ? `_blank` : null}
            rel={itemLink.opensInNewTab ? "noopener" : null}
            className="listing-overlay__item col col--xs-12 col--md-6 col--xl-4 col--pd-0">
              <div className="col__content">
                {innerContent()}
              </div>
          </a>
        )}
      </>
    );
  }
}
