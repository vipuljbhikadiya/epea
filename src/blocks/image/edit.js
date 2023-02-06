/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  RichText,
} from "@wordpress/block-editor";
import {
  Spinner,
  Button,
  PanelBody,
  ResponsiveWrapper,
  TextControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import { Component, Platform } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import { withSelect } from "@wordpress/data";

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
        imageId,
        imageAlt,
        imageDefaultAlt,
        imageUrl,
        webpImageUrl,
        mdimageUrl,
        webpmdImageUrl,
        xsimageUrl,
        webpxsImageUrl,
        imageStyle,
        anchor
      },
      Image,
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

    const TagName = "div";

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Image", "epea-theme")} initialOpen={true}>
            <MediaUploadCheck fallback={instructions}>
              <MediaUpload
                title={__("Image", "epea-theme")}
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
          <PanelBody title={__("Style", "epea-theme")} initialOpen={true}>
            <SelectControl
              label={__("Type", "epea-theme")}
              options={[
                {
                  value: "one",
                  label: __("One", "epea-theme"),
                },
                {
                  value: "two",
                  label: __("Two", "epea-theme"),
                },
              ]}
              value={imageStyle}
              onChange={(value) =>
                setAttributes({ imageStyle: value })
              }></SelectControl>
          </PanelBody>
          <PanelBody
            title={__("Additional", "epea-theme")}
            initialOpen={false}>
            <TextControl
              label={__("Anchor", "epea-theme")}
              placeholder={__("Specify Id…", "epea-theme")}
              type="text"
              value={anchor}
              onChange={(value) => setAttributes({ anchor: value })}
            />
          </PanelBody>
        </InspectorControls>

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
              (imageUrl || xsimageUrl || mdimageUrl) && (
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
                      <source media="(min-width:1025px)" srcset={`${mdimageUrl}`} />
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
                      <source media="(min-width:1025px)" srcset={`${xsimageUrl}`} />
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
        </TagName>
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
