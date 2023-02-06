/**
 * Wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
  store as blockEditorStore,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { 
  PanelBody,
  TextControl,
  Spinner,
  Button,
  ResponsiveWrapper,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { useSelect, withSelect } from "@wordpress/data";
import { Platform, Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";

/**
 * External dependencies
 */

import classnames from "classnames";

/**
 * Internal Dependencies
 */
import PlaceholderImg from "../../assets/images/placeholder.jpg";


class Edit extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        anchor,
        style,
        imageId,
        imageAlt,
        imageDefaultAlt,
        imageUrl,
        webpImageUrl,
        mdimageUrl,
        webpmdImageUrl,
        xsimageUrl,
        webpxsImageUrl,
      },
      Image,
      clientId,
      setAttributes,
    } = this.props;


    const instructions = (
      <p>
        {__(
          "To edit the background image, you need permission to upload media.",
          "epea-theme"
        )}
      </p>
    );
  
    const ALLOWED_MEDIA_TYPES = ["image"];
  
    const onUpdateImage = (image) => {
      setAttributes({
        imageId: image.id,
        imageUrl: image?.sizes?.xl?.url ? image?.sizes?.xl?.url : image.url,
        mdimageUrl: image?.sizes?.md?.url,
        xsimageUrl: image?.sizes?.xs?.url,
        imageDefaultAlt: image.alt,
      });
    };
  
    const onRemoveImage = () => {
      setAttributes({
        imageId: undefined,
        imageUrl: "",
        xsimageUrl: "",
        mdimageUrl: "",
        webpImageUrl: "",
        webpmdImageUrl: "",
        webpxsImageUrl: "",
      });
    };
  
    if (Image) {
      var mainwebp =
        Image.source_url.substring(0, Image.source_url.lastIndexOf(".") + 1) +
        "webp";
  
      if (Image.media_details.sizes["xl"]) {
        var xlwebp =
          Image.media_details.sizes["xl"].source_url.substring(
            0,
            Image.media_details.sizes["xl"].source_url.lastIndexOf(".") + 1
          ) + "webp";
  
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", xlwebp, false);
        xhr.send();
        if (xhr.status != "404") {
          setAttributes({
            webpImageUrl: xlwebp,
          });
        } else {
          setAttributes({
            webpImageUrl: mainwebp,
          });
        }
      } else {
        setAttributes({
          webpImageUrl: mainwebp,
        });
      }
  
      if (Image.media_details.sizes["md"]) {
        var mdwebp =
          Image.media_details.sizes["md"].source_url.substring(
            0,
            Image.media_details.sizes["md"].source_url.lastIndexOf(".") + 1
          ) + "webp";
  
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", mdwebp, false);
        xhr.send();
        if (xhr.status != "404") {
          setAttributes({
            webpmdImageUrl: mdwebp,
          });
        } else {
          setAttributes({
            webpmdImageUrl: "",
          });
        }
      } else {
        setAttributes({
          webpmdImageUrl: "",
        });
      }
      if (Image.media_details.sizes["xs"]) {
        var xswebp =
          Image.media_details.sizes["xs"].source_url.substring(
            0,
            Image.media_details.sizes["xs"].source_url.lastIndexOf(".") + 1
          ) + "webp";
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", xswebp, false);
        xhr.send();
        if (xhr.status != "404") {
          setAttributes({
            webpxsImageUrl: xswebp,
          });
        } else {
          setAttributes({
            webpxsImageUrl: "",
          });
        }
      } else {
        setAttributes({
          webpxsImageUrl: "",
        });
      }
    }
  
    const classes = `visual-image visual-image--${style}`;
  

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Styles", "default-theme")} initialOpen={true}>
              <ToggleGroupControl
                label="Orientation"
                className="block-togglegroup"
                value={style}
                isBlock
                onChange={(value) => {
                  setAttributes({
                    style: value,
                  });
                }}>
                <ToggleGroupControlOption
                  value="left"
                  label="Left"
                  showTooltip={true}
                  aria-label="Left"
                />
                <ToggleGroupControlOption
                  value="right"
                  label="Right"
                  showTooltip={true}
                  aria-label="Right"
                />
              </ToggleGroupControl>
            </PanelBody>
            <PanelBody title={__("Settings", "epea-theme")} initialOpen={true}>
              <MediaUploadCheck fallback={instructions}>
                <MediaUpload
                  title={__("Background Image", "epea-theme")}
                  onSelect={onUpdateImage}
                  allowedTypes={ALLOWED_MEDIA_TYPES}
                  value={imageId}
                  render={({ open }) => (
                    <Button
                      className={
                        !imageId
                          ? "editor-post-featured-image__toggle"
                          : "editor-post-featured-image__preview"
                      }
                      onClick={open}>
                      {!!imageId && !Image && <Spinner />}
                      {!imageId && __("Set image", "epea-theme")}
                      {!!imageId && Image && (
                        <ResponsiveWrapper
                          naturalWidth={Image.media_details.width}
                          naturalHeight={Image.media_details.height}>
                          <img
                            src={Image.source_url}
                            alt={__("Image", "epea-theme")}
                          />
                        </ResponsiveWrapper>
                      )}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
              {!!imageId && Image ? (
                <MediaUploadCheck>
                  <MediaUpload
                    title={__("Image", "epea-theme")}
                    onSelect={onUpdateImage}
                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    value={imageId}
                    render={({ open }) => (
                      <Button
                        onClick={open}
                        variant="secondary"
                        isLarge
                        className="is-secondary block-section-background-image-replace">
                        {__("Replace image", "epea-theme")}
                      </Button>
                    )}
                  />
                </MediaUploadCheck>
              ) : (
                <></>
              )}
              {!!imageId ? (
                <MediaUploadCheck>
                  <Button
                    onClick={onRemoveImage}
                    isDestructive
                    className="is-link is-destructive block-section-background-image-remove">
                    {__("Remove image", "epea-theme")}
                  </Button>
                </MediaUploadCheck>
              ) : (
                <></>
              )}
              <TextControl
                className="block-mt"
                label={__("Alt Text", "epea-theme")}
                type="text"
                placeholder="Overwrite default Alt-Text..."
                value={imageAlt}
                onChange={(value) => setAttributes({ imageAlt: value })}
              />
            </PanelBody>
          <PanelBody title={__("Additional", "epea-theme")} initialOpen={false}>
            <TextControl
              label={__("Anchor", "epea-theme")}
              placeholder={__("Specify Id…", "epea-theme")}
              type="text"
              value={anchor}
              onChange={(value) => setAttributes({ anchor: value })}
            />
          </PanelBody>
        </InspectorControls>
        <div
          id={anchor ? anchor : null}
          className={classes}>
          <div className="row-wrapper">
            <div className="row row--xs-top row--lg-middle">

              <div className={classnames(
                `col col--xs-12 col--md-10 col--lg-6 col--pd-0`,
                style == 'left' ? '' : 'col--md-os-2 col--lg-os-1')}>

                <div className="col__content">        
                  <div className="visual-image__item">

                    <picture>
              
                      {!imageUrl ? (
                        <img src={PlaceholderImg} alt="placeholder" />
                      ) : (
                        (imageUrl || xsimageUrl || mdimageUrl) && (
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
                                <source media="(min-width:481px)" srcset={`${mdimageUrl}`} />
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
                                <source media="(min-width:481px)" srcset={`${xsimageUrl}`} />
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
                                <source media="(max-width:480px)" srcset={`${xsimageUrl}`} />
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
                                <source media="(max-width:480px)" srcset={`${mdimageUrl}`} />
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
                    
                  </div>
                </div>
              </div>

              <div className="col col--xs-10 col--lg-4 col--xs-os-1 col--lg-os-1 col--pd-0">
                <div className="col__content">

                  <InnerBlocks
                    allowedBlocks={[
                      "epea-theme/divider"
                    ]}
                    templateLock={false}
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                  />

                </div>
              </div>

            </div>
          </div>
        </div>
      </>   
    );
  }
}

export default compose(
  withSelect((select, props) => {
    const { getMedia } = select("core");
    const { imageId } = props.attributes;

    return {
      Image: imageId ? getMedia(imageId) : null,
    };
  })
)(Edit);