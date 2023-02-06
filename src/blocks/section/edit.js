/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import {
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
  MediaUploadCheck,
  InnerBlocks,
} from "@wordpress/block-editor";
import {
  Spinner,
  Button,
  PanelBody,
  ResponsiveWrapper,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  TextControl,
  ToggleControl,
} from "@wordpress/components";
import { Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";

/***
 * Interal dependencies
 */
import { theme_colors } from "../../utils/block-helpers";

class Edit extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        backgroundColor,
        backgroundAlt,
        backgroundDefaultAlt,
        backgroundColorClass,
        xlbackgroundImageId,
        xlbackgroundImagesrc,
        webpImageUrl,
        mdbackgroundImagesrc,
        webpmdImageUrl,
        xsbackgroundImagesrc,
        webpxsImageUrl,
        mdbackgroundImageId,
        xsbackgroundImageId,
        topPadding,
        bottomPadding,
        anchor,
        hideLG,
        hideMD,
        hideXS,
      },
      xlbackgroundImage,
      mdbackgroundImage,
      xsbackgroundImage,
      setAttributes,
      bgResponsiveMode,
      setbgResponsiveMode,
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
        backgroundDefaultAlt: image.alt,
      });
      if (bgResponsiveMode == "xl") {
        setAttributes({
          xlbackgroundImageId: image.id,
          xlbackgroundImagesrc: image?.sizes?.xl?.url
            ? image?.sizes?.xl?.url
            : image.url,
        });
        var xlwebp = "";
        if (image.sizes["xl"]) {
          xlwebp =
            image.sizes["xl"].url.substring(
              0,
              image.sizes["xl"].url.lastIndexOf(".") + 1
            ) + "webp";
        } else {
          xlwebp =
            image.url.substring(0, image.url.lastIndexOf(".") + 1) + "webp";
        }
        if (xlwebp) {
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
        } else {
          setAttributes({
            webpImageUrl: "",
          });
        }
      }

      if (bgResponsiveMode == "md") {
        setAttributes({
          mdbackgroundImageId: image.id,
          mdbackgroundImagesrc: image?.sizes?.md?.url
            ? image?.sizes?.md?.url
            : image.url,
        });
        var mdwebp = "";
        if (image.sizes["md"]) {
          mdwebp =
            image.sizes["md"].url.substring(
              0,
              image.sizes["md"].url.lastIndexOf(".") + 1
            ) + "webp";
        } else {
          mdwebp =
            image.url.substring(0, image.url.lastIndexOf(".") + 1) + "webp";
        }
        if (mdwebp) {
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
      }
      if (bgResponsiveMode == "xs") {
        setAttributes({
          xsbackgroundImageId: image.id,
          xsbackgroundImagesrc: image?.sizes?.xs?.url
            ? image?.sizes?.xs?.url
            : image.url,
        });

        var xswebp = "";
        if (image.sizes["xs"]) {
          xswebp =
            image.sizes["xs"].url.substring(
              0,
              image.sizes["xs"].url.lastIndexOf(".") + 1
            ) + "webp";
        } else {
          xswebp =
            image.url.substring(0, image.url.lastIndexOf(".") + 1) + "webp";
        }

        if (xswebp) {
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
    };

    const onRemoveImage = () => {
      if (bgResponsiveMode == "xl") {
        setAttributes({
          xlbackgroundImageId: undefined,
          xlbackgroundImagesrc: "",
        });
      }
      if (bgResponsiveMode == "md") {
        setAttributes({
          mdbackgroundImageId: undefined,
          mdbackgroundImagesrc: "",
        });
      }
      if (bgResponsiveMode == "xs") {
        setAttributes({
          xsbackgroundImageId: undefined,
          xsbackgroundImagesrc: "",
        });
      }
    };

    const resMode = ["xs", "md", "xl"];

    const responsiveBgImage = {
      xs: {
        BgId: xsbackgroundImageId,
        BgImage: xsbackgroundImage,
      },
      md: {
        BgId: mdbackgroundImageId,
        BgImage: mdbackgroundImage,
      },
      xl: {
        BgId: xlbackgroundImageId,
        BgImage: xlbackgroundImage,
      },
    };

    const SetColorClass = (value) => {
      theme_colors.filter(function (item) {
        if (item.color == value) {
          setAttributes({
            backgroundColorClass: item.slug,
          });
        }
      });
    };
    const bgclass = backgroundColorClass
      ? `section--bg-${backgroundColorClass}`
      : "";

    let hideSection = "";
    if (hideLG == true) {
      hideSection += " section--lg-hide";
    }
    if (hideMD == true) {
      hideSection += " section--md-hide";
    }
    if (hideXS == true) {
      hideSection += " section--xs-hide";
    }
    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Background Image", "epea-theme")}
            initialOpen={false}>
            <ToggleGroupControl
              label=""
              className="responsive_buttons"
              value={bgResponsiveMode}
              isBlock
              onChange={(value) => {
                setbgResponsiveMode(value);
              }}>
              <ToggleGroupControlOption
                value="xl"
                label={__("Desktop", "epea-theme")}
                showTooltip={true}
                aria-label={__("Device > 1440px", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="md"
                label={__("Tablet", "epea-theme")}
                showTooltip={true}
                aria-label={__(
                  "Device (min. 768px - max. 1440px)",
                  "epea-theme"
                )}
              />
              <ToggleGroupControlOption
                value="xs"
                label={__("Mobile", "epea-theme")}
                showTooltip={true}
                aria-label={__("Device (max. 768px)", "epea-theme")}
              />
            </ToggleGroupControl>
            {bgResponsiveMode && (
              <div className="media-control">
                {resMode.map((item, index) => {
                  return (
                    <div className="media-control-wrap" id={`media-${index}`}>
                      {bgResponsiveMode == item ? (
                        <MediaUploadCheck fallback={instructions}>
                          <MediaUpload
                            title={__("Background Image", "tbblocks")}
                            onSelect={onUpdateImage}
                            allowedTypes={ALLOWED_MEDIA_TYPES}
                            value={responsiveBgImage[item]["BgId"]}
                            render={({ open }) => (
                              <Button
                                id={`media-imgbtn-${index}`}
                                className={
                                  !responsiveBgImage[item]["BgId"]
                                    ? "editor-post-featured-image__toggle"
                                    : "editor-post-featured-image__preview"
                                }
                                onClick={open}>
                                {!!responsiveBgImage[item]["BgId"] &&
                                  !responsiveBgImage[item]["BgImage"] && (
                                    <Spinner />
                                  )}
                                {!responsiveBgImage[item]["BgId"] &&
                                  __("Set image", "tbblocks")}
                                {!!responsiveBgImage[item]["BgId"] &&
                                  responsiveBgImage[item]["BgImage"] && (
                                    <ResponsiveWrapper
                                      naturalWidth={
                                        responsiveBgImage[item]["BgImage"]
                                          .media_details.width
                                      }
                                      naturalHeight={
                                        responsiveBgImage[item]["BgImage"]
                                          .media_details.height
                                      }>
                                      <img
                                        src={
                                          responsiveBgImage[item]["BgImage"]
                                            .source_url
                                        }
                                        alt={__("Background image", "tbblocks")}
                                      />
                                    </ResponsiveWrapper>
                                  )}
                              </Button>
                            )}
                          />
                        </MediaUploadCheck>
                      ) : (
                        <></>
                      )}
                      {bgResponsiveMode == item &&
                      !!responsiveBgImage[item]["BgId"] &&
                      responsiveBgImage[item]["BgImage"] ? (
                        <MediaUploadCheck>
                          <MediaUpload
                            title={__("Background Image", "tbblocks")}
                            onSelect={onUpdateImage}
                            allowedTypes={ALLOWED_MEDIA_TYPES}
                            value={responsiveBgImage[item]["BgId"]}
                            render={({ open }) => (
                              <Button
                                id={`media-replacebtn-${index}`}
                                onClick={open}
                                variant="secondary"
                                isLarge
                                className="is-secondary block--image-attr block-section-background-image-replace">
                                {__("Replace background image", "tbblocks")}
                              </Button>
                            )}
                          />
                        </MediaUploadCheck>
                      ) : (
                        <></>
                      )}
                      {bgResponsiveMode == item &&
                      !!responsiveBgImage[item]["BgId"] ? (
                        <MediaUploadCheck>
                          <Button
                            id={`media-removebtn-${index}`}
                            onClick={onRemoveImage}
                            isDestructive
                            className="is-link is-destructive block--image-attr block-section-background-image-remove">
                            {__("Remove background image", "tbblocks")}
                          </Button>
                        </MediaUploadCheck>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <TextControl
              className="block-mt"
              label={__("Alt Text", "epea-theme")}
              placeholder="Overwrite Alt Text…"
              type="text"
              value={backgroundAlt}
              onChange={(value) => setAttributes({ backgroundAlt: value })}
            />
          </PanelBody>
          <PanelBody title={__("Style", "epea-theme")} initialOpen={false}>
            <PanelColorSettings
              title={__("Background color", "epea-theme")}
              className={"block-color-setting"}
              colorSettings={[
                {
                  colors: theme_colors,
                  value: backgroundColor,
                  onChange: (value) => {
                    typeof value == "undefined"
                      ? setAttributes({
                          backgroundColorClass: "",
                        })
                      : SetColorClass(value);
                    setAttributes({
                      backgroundColor: value,
                    });
                  },
                  label: __("Background Color", "epea-theme"),
                },
              ]}
            />
            <ToggleGroupControl
              label={__("Top Padding", "epea-theme")}
              className="block-togglegroup"
              value={topPadding}
              isBlock
              onChange={(value) => {
                setAttributes({
                  topPadding: Number(value),
                });
              }}>
              <ToggleGroupControlOption
                value="0"
                label={__("0", "epea-theme")}
                showTooltip={true}
                aria-label={__("0px", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="1"
                label={__("1", "epea-theme")}
                showTooltip={true}
                aria-label={__("60px", "epea-theme")}
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
                aria-label={__("120px", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="4"
                label={__("4", "epea-theme")}
                showTooltip={true}
                aria-label={__("240px", "epea-theme")}
              />
            </ToggleGroupControl>
            <ToggleGroupControl
              label={__("Bottom Padding", "epea-theme")}
              className="block-togglegroup"
              value={bottomPadding}
              isBlock
              onChange={(value) => {
                setAttributes({
                  bottomPadding: Number(value),
                });
              }}>
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

          <PanelBody title={__("Additional", "epea-theme")} initialOpen={false}>
            <TextControl
              label={__("Anchor", "epea-theme")}
              placeholder="Specify link ID…"
              type="text"
              value={anchor}
              onChange={(value) => setAttributes({ anchor: value })}
            />
            <ToggleControl
              label={__("Hide on Smartphone", "epea-theme")}
              checked={hideXS}
              onChange={() =>
                setAttributes({
                  hideXS: !hideXS,
                })
              }
            />
            <ToggleControl
              label={__("Hide on Tablet", "epea-theme")}
              checked={hideMD}
              onChange={() =>
                setAttributes({
                  hideMD: !hideMD,
                })
              }
            />
            <ToggleControl
              label={__("Hide on Desktop", "epea-theme")}
              checked={hideLG}
              onChange={() =>
                setAttributes({
                  hideLG: !hideLG,
                })
              }
            />
          </PanelBody>
        </InspectorControls>

        <section
          id={anchor ? anchor : null}
          className={classnames(
            `section`,
            `section--pd-top-${topPadding}`,
            `section--pd-bottom-${bottomPadding}`,
            `${hideSection}`,
            `${bgclass}`
          )}>
          {(xsbackgroundImagesrc ||
            mdbackgroundImagesrc ||
            xlbackgroundImagesrc) && (
            <div className="section__background">
              <picture>
                {/* Desktop Image rendering */}
                {xlbackgroundImagesrc ? (
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
                      srcset={`${xlbackgroundImagesrc}`}
                    />
                  </>
                ) : (
                  <>
                    {mdbackgroundImagesrc ? (
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
                          srcset={`${mdbackgroundImagesrc}`}
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
                          srcset={`${xsbackgroundImagesrc}`}
                        />
                      </>
                    )}
                  </>
                )}
                {/* Tablet Image Rendering */}
                {mdbackgroundImagesrc ? (
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
                      srcset={`${mdbackgroundImagesrc}`}
                    />
                  </>
                ) : (
                  <>
                    {xlbackgroundImagesrc ? (
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
                          srcset={`${xlbackgroundImagesrc}`}
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
                          srcset={`${xsbackgroundImagesrc}`}
                        />
                      </>
                    )}
                  </>
                )}
                {/* Mobile Image Rendering */}
                {xsbackgroundImagesrc ? (
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
                      srcset={`${xsbackgroundImagesrc}`}
                    />
                  </>
                ) : (
                  <>
                    {mdbackgroundImagesrc ? (
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
                          srcset={`${mdbackgroundImagesrc}`}
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
                          srcset={`${xlbackgroundImagesrc}`}
                        />
                      </>
                    )}
                  </>
                )}
                {xlbackgroundImagesrc ? (
                  <img
                    src={`${xlbackgroundImagesrc}`}
                    alt={
                      "" !== backgroundAlt
                        ? `${backgroundAlt}`
                        : `${backgroundDefaultAlt}`
                    }
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                ) : !xlbackgroundImagesrc && mdbackgroundImagesrc ? (
                  <img
                    src={`${mdbackgroundImagesrc}`}
                    alt={
                      "" !== backgroundAlt
                        ? `${backgroundAlt}`
                        : `${backgroundDefaultAlt}`
                    }
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                ) : !xlbackgroundImagesrc &&
                  !mdbackgroundImagesrc &&
                  xsbackgroundImagesrc ? (
                  <img
                    src={`${xsbackgroundImagesrc}`}
                    alt={
                      "" !== backgroundAlt
                        ? `${backgroundAlt}`
                        : `${backgroundDefaultAlt}`
                    }
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                ) : (
                  ""
                )}
              </picture>
            </div>
          )}
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
        </section>
      </>
    );
  }
}
export default compose(
  withSelect((select, props) => {
    const { xlbackgroundImageId, mdbackgroundImageId, xsbackgroundImageId } =
      props.attributes;

    const { getMedia } = select("core");

    return {
      xlbackgroundImage: xlbackgroundImageId
        ? getMedia(xlbackgroundImageId)
        : null,
      mdbackgroundImage: mdbackgroundImageId
        ? getMedia(mdbackgroundImageId)
        : null,
      xsbackgroundImage: xsbackgroundImageId
        ? getMedia(xsbackgroundImageId)
        : null,
    };
  })
)(Edit);
