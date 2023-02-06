/**
 * Wordpress dependencies
 */ 
import { __ } from "@wordpress/i18n";
import {
  InnerBlocks,
  InspectorControls,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { 
  PanelBody,
  TextControl,
  Spinner,
  Button,
  ResponsiveWrapper,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ToggleControl,
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";
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

import swipeXSLeft from "../../assets/images/epea-swipe-xs-left.png";
import swipeMDLeft from "../../assets/images/epea-swipe-md-left.png";
import swipeLGLeft from "../../assets/images/epea-swipe-lg-left.png";
import swipeWebXSLeft from "../../assets/images/epea-swipe-xs-left.webp";
import swipeWebMDLeft from "../../assets/images/epea-swipe-md-left.webp";
import swipeWebLGLeft from "../../assets/images/epea-swipe-lg-left.webp";


class Edit extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        anchor,
        hideDescription,
        hideButton,
        mainHeadline,
        mainLevel,
        paragraph,
        buttonLink,
        buttonText,
        bottomPadding,
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
  
    const TagNameMainHeadline = mainLevel == "span" ? "span" : "h" + mainLevel;
    const TagNameParagraph = "span";
  
    const onMainHeadlineChange = (value) => {
      const newMainHeadline = { mainHeadline: value };
      setAttributes(newMainHeadline);
    };
  
    const onParagraphChange = (value) => {
      const newParagraph = { paragraph: value };
      setAttributes(newParagraph);
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
        <PanelBody title={__("General", "epea-theme")} initialOpen={false}>
            <ToggleGroupControl
              label={__("Bottom Padding", "epea-theme")}
              className="block-togglegroup"
              value={bottomPadding}
              isBlock
              onChange={(value) => {
                setAttributes({
                  bottomPadding: Number(value),
                });
              }}
            >
              <ToggleGroupControlOption
                value="0"
                label={__("0", "epea-theme")}
                showTooltip={true}
                aria-label={__("0px", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="1"
                label="1"
                showTooltip={true}
                aria-label="60px"
              />
              <ToggleGroupControlOption
                value="2"
                label={__("2", "epea-theme")}
                showTooltip={true}
                aria-label={__("90px", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="3"
                label={__("3", "epea-theme")}
                showTooltip={true}
                aria-label={__("120", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="4"
                label={__("4", "epea-theme")}
                showTooltip={true}
                aria-label={__("240px", "epea-theme")}
              />
            </ToggleGroupControl>
          </PanelBody>
          <PanelBody
            title={__('Image', 'epea-theme')}
            initialOpen={false}
          >
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
            title={__('Headline', 'epea-theme')}
            initialOpen={false}
          >
            <ToggleGroupControl
              label={__("Tag", "epea-theme")}
              value={mainLevel}
              onChange={(value) => {
                setAttributes({
                  mainLevel: value,
                });
              }}
              className="block-toggle-full">
              <ToggleGroupControlOption
                value="1"
                label={__("1", "epea-theme")}
                showTooltip={true}
                aria-label={__("H1", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="2"
                label={__("2", "epea-theme")}
                showTooltip={true}
                aria-label={__("H2", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="3"
                label={__("3", "epea-theme")}
                showTooltip={true}
                aria-label={__("H3", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="4"
                label={__("4", "epea-theme")}
                showTooltip={true}
                aria-label={__("H4", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="5"
                label={__("5", "epea-theme")}
                showTooltip={true}
                aria-label={__("H5", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="6"
                label={__("6", "epea-theme")}
                showTooltip={true}
                aria-label={__("H6", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="span"
                label={__("SPAN", "epea-theme")}
                showTooltip={true}
                aria-label={__("Span", "epea-theme")}
              />
            </ToggleGroupControl>
          </PanelBody>
          <PanelBody
            title={__('Text', 'epea-theme')}
            initialOpen={false}
          >
            <ToggleControl
              label={__('Show / Hide Description', 'epea-theme')}
              checked={hideDescription}
              onChange={() =>
                setAttributes({
                  hideDescription: !hideDescription,
                })
              }
            />
          </PanelBody>
          <PanelBody
            title={__('Button', 'epea-theme')}
            initialOpen={false}
          >
            <ToggleControl
              label={__('Show / Hide Button', 'epea-theme')}
              checked={hideButton}
              onChange={() =>
                setAttributes({
                  hideButton: !hideButton,
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
            title={__('Additional', 'epea-theme')}
            initialOpen={false}
          >
            <TextControl
              label={__('Anchor', 'epea-theme')}
              placeholder={__('Specify Id…', 'epea-theme')}
              type="text"
              value={anchor}
              onChange={(value) =>
                setAttributes({ anchor: value })
              }
            />
          </PanelBody>
        </InspectorControls>

        <section
          id={anchor ? anchor : null}
          className={classnames(
            `section section--hero-main`,
            bottomPadding ? `section--pd-bottom-${bottomPadding}` : null
          )}
        >
          <div className="section__content">
            <div className="section__header row-wrapper">
              <div className="row row--xs-center row--sm-start row--gap-0">

                <div className="col col--xs-10 col--sm-9 col--md-9 col--lg-4 col--xl-4 col--sm-os-1 col--md-os-1 col--lg-os-1 col--xl-os-1 col--pd-0">
                  <div className="section__header-content col__content">

                    <RichText
                      identifier="mainHeadline"
                      tagName={TagNameMainHeadline}
                      className="headline headline--style-one headline--color-five"
                      value={mainHeadline}
                      onChange={onMainHeadlineChange}
                      withoutInteractiveFormatting={true}
                      aria-label={__("Add MainHeadline ...", "epea-theme")}
                      placeholder={__("Lorem ipsum dolor", "epea-theme")}
                      {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                      allowedFormats={[""]}
                    />
                    {hideDescription == true ? (
                      <RichText
                        identifier="paragraph"
                        tagName={TagNameParagraph}
                        className="text text--color-three text--style-one"
                        value={paragraph}
                        onChange={onParagraphChange}
                        withoutInteractiveFormatting={true}
                        aria-label={__("Add Text ...", "epea-theme")}
                        placeholder={__("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.", "epea-theme")}
                        {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                        allowedFormats={[""]}
                      />
                    ) : (
                      ""
                    )}
                    {hideButton == true ? (
                      (undefined == buttonLink ? (
                        <div
                          className="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left"
                        >
                          <div class="icon icon--bgcolor-five icon--color-two">
                            <div class="icon__helper"></div>
                            <i class="icon__visual icon-37-epea"></i>
                          </div>
                          <RichText
                            tagName="div"
                            className="button__helper"
                            identifier="buttonText"
                            value={buttonText}
                            onChange={onButtonTextChange}
                            aria-label={__("Button text", "epea-theme")}
                            placeholder={__("Lorem ipsum", "epea-theme")}
                            {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                            allowedFormats={[]}
                          />
                        </div>
                      ) : (
                        <a
                          className="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left"
                          href={buttonLink ? buttonLink.url : ""}
                          target={buttonLink ? buttonLink.opensInNewTab == true ? `_blank` : null : ""}
                          rel={buttonLink ? buttonLink.opensInNewTab == true ? `noopener` : null : ""}
                          onClick={(e) => e.preventDefault()}
                        >
                          <div class="icon icon--bgcolor-five icon--color-two">
                            <div class="icon__helper"></div>
                            <i class="icon__visual icon-37-epea"></i>
                          </div>
                          <RichText
                            tagName="div"
                            className="button__helper"
                            identifier="buttonText"
                            value={buttonText}
                            onChange={onButtonTextChange}
                            aria-label={__("Button text", "epea-theme")}
                            placeholder={__("Lorem ipsum", "epea-theme")}
                            {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                            allowedFormats={[]}
                          />
                        </a>
                      ))
                    ) : (
                      ""
                    )}

                  </div>
                </div>
          
                <div className="col col--xs-12 col--md-10 col--lg-6 col--md-os-2 col--lg-os-1 col--xl-os-1 col--pd-0">
                  <div className="section__header-visual col__content">
                    
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
                            />
                          </>
                        )
                      )}
                    </picture>

                  </div>
                </div>

              </div>

              <picture className="section__swipe">
                <source
                  media="(min-width:1025px)"
                  srcset={swipeWebLGLeft}
                  type="image/webp"
                />
                <source
                  media="(min-width:1025px)"
                  srcset={swipeLGLeft}
                />
                <source
                  media="(min-width:481px)"
                  srcset={swipeWebMDLeft}
                  type="image/webp"
                />
                <source
                  media="(min-width:481px)"
                  srcset={swipeMDLeft}
                />
                <source
                  media="(max-width:480px)"
                  srcset={swipeWebXSLeft}
                  type="image/webp"
                />
                <source
                  media="(max-width:480px)"
                  srcset={swipeXSLeft}
                />
                <img
                  decoding="async"
                  loading="lazy"
                  srcset={swipeLGLeft}
                  alt="EPEA Swipe Visual"
                  width="auto"
                  height="auto"
                />
              </picture>

            </div>

            <div className="section__content">

              <InnerBlocks
                allowedBlocks={[
                  "epea-theme/quoteimage",
                  "epea-theme/row",
                  "epea-theme/divider",
                  "epea-theme/previewcards",
                  "epea-theme/teamlisting",
                ]}
                templateLock={false}
                renderAppender={InnerBlocks.ButtonBlockAppender}
              />

            </div>

          </div>
        </section>
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