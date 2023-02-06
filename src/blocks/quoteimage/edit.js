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
  __experimentalLinkControl as LinkControl,
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
import { QuoteIcon } from "../../utils/block-icons";

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
        showButton,
        buttonLink,
        buttonText,
        content,
        anchor,
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

    const onContentChange = (value) => {
      setAttributes({ content: value });
    };

    const onButtonTextChange = (value) => {
      setAttributes({ buttonText: value });
    };

    const unlink = () => {
      setAttributes({
        buttonLink: undefined
      });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Image", "epea-theme")} initialOpen={true}>
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
          <PanelBody
            title={__("Link", "epea-theme")}
            initialOpen={true}>
            <ToggleControl
							label={__("Show / Hide Button", "epea-theme")}
							checked={showButton}
							onChange={() =>
								setAttributes({
									showButton: !showButton,
								})
							}
						/>
            <span className="block-seprator"></span>
            <div className="gb--link-control">
              <LinkControl
                searchInputPlaceholder="Search here..."
                value={buttonLink}
                settings={[
                  {
                    id: "opensInNewTab",
                    title: "Open in new Tab",
                  },
                ]}
                onChange={(newLink) => setAttributes({ buttonLink: newLink })}
								onRemove={() => {
									unlink();
								}}
                withCreateSuggestion={true}
                createSuggestion={(inputValue) =>
                  setAttributes({
                    post: {
                      ...buttonLink,
                      title: inputValue,
                      type: "custom-url",
                      id: Date.now(),
                      url: inputValue,
                    },
                  })
                }></LinkControl>
            </div>
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
					id={anchor ? anchor : null}
					className={classnames(
						`quote-image`
					)}
				>
          <div class="quote-image__background">
            <>
              <picture> 
                {imageUrl || xsimageUrl || mdimageUrl ? (
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
                ) : (
                  <img src={PlaceholderImg} alt="placeholder" />
                )}
              </picture>
            </>
          </div>
          
					<div className="quote-image__content">
            <QuoteIcon />
            <RichText
                identifier="content"
                tagName="span"
                className="headline headline--style-six headline--color-three"
                value={content}
                onChange={onContentChange}
                aria-label={__("Quote Text", "epea-theme")}
                placeholder={__("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", "epea-theme")}
                {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                allowedFormats={["core/bold", "core/italic", "core/link"]}
              />

              {showButton == true ? (
                (undefined == buttonLink ? (

                  <RichText
                    className="button-default button--style-one button--width-inline button--color-six button--align-xs-left"
                    identifier="buttonText"
                    tagName="div"
                    value={buttonText}
                    onChange={onButtonTextChange}
                    aria-label={__("Button text", "epea-theme")}
                    placeholder={__("Lorem Ipsum", "epea-theme")}
                    {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                    allowedFormats={[]}
                  />

                ) : (
                  <RichText
                    onClick={(e) => e.preventDefault()}
                    className="button-default button--style-one button--width-inline button--color-six button--align-xs-left"
                    href={buttonLink ? buttonLink.url : ""}
                    target={buttonLink ? buttonLink.opensInNewTab == true ? `_blank` : null : ""}
                    rel={buttonLink ? buttonLink.opensInNewTab == true ? `noopener` : null : ""}
                    identifier="buttonText"
                    tagName="a"
                    value={buttonText}
                    onChange={onButtonTextChange}
                    aria-label={__("Button text", "epea-theme")}
                    placeholder={__("Lorem Ipsum", "epea-theme")}
                    {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                    allowedFormats={[]}
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

export default compose(
  withSelect((select, props) => {
    const { getMedia } = select("core");
    const { imageId } = props.attributes;

    return {
      Image: imageId ? getMedia(imageId) : null,
    };
  })
)(Edit);
