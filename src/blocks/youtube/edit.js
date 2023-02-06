/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  InnerBlocks,
} from "@wordpress/block-editor";
import {
  PanelBody,
  ToggleControl,
  TextControl,
  Spinner,
  Button,
  ResponsiveWrapper,
} from "@wordpress/components";
import { Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";

/**
 * External dependencies
 */
import classnames from "classnames";

/***
 * Interal dependencies
 */
import { IconPlay } from "../../utils/block-icons";
import PlaceholderImg from "../../assets/images/placeholder.jpg";

class Edit extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        imageUrl,
        webpImageUrl,
        xsimageUrl,
        webpxsImageUrl,
        mdimageUrl,
        webpmdImageUrl,
        imageId,
        imageAlt,
        imageDefaultAlt,
        youTubeId,
        showdesc,
        anchor,
        iframeId,
      },
      setAttributes,
      VideoImage,
      clientId,
    } = this.props;

    const instructions = (
      <p>
        {__(
          "To edit the image, you need permission to upload media.",
          "epea-theme"
        )}
      </p>
    );

    const ALLOWED_MEDIA_TYPES = ["image"];

    setAttributes({
      iframeId: clientId,
    });

    const onUpdateImage = (image) => {
      setAttributes({
        imageId: image.id,
        imageUrl: image.url,
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
      });
    };

    if (VideoImage) {
      var xlwebp =
        VideoImage.source_url.substring(
          0,
          VideoImage.source_url.lastIndexOf(".") + 1
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
          webpImageUrl: "",
        });
      }

      if (VideoImage.media_details.sizes["md"]) {
        var mdwebp =
          VideoImage.media_details.sizes["md"].source_url.substring(
            0,
            VideoImage.media_details.sizes["md"].source_url.lastIndexOf(".") + 1
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
      if (VideoImage.media_details.sizes["xs"]) {
        var xswebp =
          VideoImage.media_details.sizes["xs"].source_url.substring(
            0,
            VideoImage.media_details.sizes["xs"].source_url.lastIndexOf(".") + 1
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

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Settings", "epea-theme")} initialOpen={true}>
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
                    {!!imageId && !VideoImage && <Spinner />}
                    {!imageId && __("Set image", "epea-theme")}
                    {!!imageId && VideoImage && (
                      <ResponsiveWrapper
                        naturalWidth={VideoImage.media_details.width}
                        naturalHeight={VideoImage.media_details.height}>
                        <img
                          src={VideoImage.source_url}
                          alt={__("Image", "epea-theme")}
                        />
                      </ResponsiveWrapper>
                    )}
                  </Button>
                )}
              />
            </MediaUploadCheck>
            {!!imageId && VideoImage ? (
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
                      className="block--image-attr block-section-background-image-replace">
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
                  className="block--image-attr block-section-background-image-remove">
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
            <TextControl
              label={__("Youtube Id", "epea-theme")}
              type="text"
              placeholder="Specify YouTube Id..."
              value={youTubeId}
              onChange={(value) => setAttributes({ youTubeId: value })}
            />
            <ToggleControl
              label={__("Show/Hide Description", "epea-theme")}
              checked={showdesc}
              onChange={() =>
                setAttributes({
                  showdesc: !showdesc,
                })
              }
            />
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
        <div
          id={anchor ? `${anchor}` : null}
          className={classnames(`youtube`)}>
            <a
              href="#"
              data-id={`${iframeId}`}
              className="youtube__link"
              data-youtubeid={youTubeId}>

              <picture className={`youtube__image-helper`}>

                {imageUrl || xsimageUrl || mdimageUrl ? (
                  <>
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
                        <source
                          media="(min-width:1025px)"
                          srcset={`${imageUrl}`}
                        />
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
                        <source
                          media="(min-width:481px)"
                          srcset={`${imageUrl}`}
                        />
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
                        <source
                          media="(max-width:480px)"
                          srcset={`${imageUrl}`}
                        />
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
              <div class="youtube__content">
                <div class="youtube__content-helper">
                  <div class="youtube__icon">
                    <IconPlay />
                  </div>
                  {showdesc == true && (
                    <div class="youtube__text">
                      <InnerBlocks
                        allowedBlocks={["epea-theme/paragraph"]}
                        template={[
                          [
                            "epea-theme/paragraph",
                            {
                              textColor: "#575756",
                              textColorClass: "three",
                            },
                          ],
                        ]}
                        renderAppender={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            </a>
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
      VideoImage: imageId ? getMedia(imageId) : null,
    };
  })
)(Edit);
