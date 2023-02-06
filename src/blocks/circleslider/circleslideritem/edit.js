/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  BlockControls,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  ToolbarGroup,
  ToolbarButton,
  PanelBody,
  TextControl,
  Spinner,
  Button,
  ResponsiveWrapper,
	Tooltip,
} from "@wordpress/components";
import { Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import { withSelect, withDispatch, subscribe } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

/**
 * External dependencies
 */
import classnames from "classnames";
import { map } from "lodash";

/**
 * Internal Dependencies
 */
import PlaceholderImg from "../../../assets/images/placeholder-square.jpg";
import Icons from "../../icon/icon.json";

/**
 * Create an Component
 */
class Edit extends Component {
  constructor() {
    super(...arguments);

    this.state = {
			icons: Icons,
			isOpen: false,
			keyword: "",
      hasContent: true,
    };

    this.hasContent = this.hasContent.bind(this);
    this.addSlide = this.addSlide.bind(this);
    this.listenSlideContentChange = this.listenSlideContentChange.bind(this);
  }

	search(keyword) {
		let filtered = [];

		map(Icons, (icon) => {
			if (icon.toLowerCase().search(keyword.toLowerCase()) !== -1) {
				filtered.push(icon);
			}
		});

		this.setState({ keyword, icons: filtered });
	}

	toggle() {
		this.setState((state) => ({
			isOpen: !state.isOpen,
		}));

		this.setState({ keyword: "", icons: Icons });

		const selection = window.getSelection();
		anchorRange = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
	}

	customResizeIcons() {
		var elements = document.getElementsByClassName("icon__visual");
		if (elements.length < 0) {
			return;
		}
		var _len = elements.length;
		for (var _i = 0; _i < _len; _i++) {
			var el = elements[_i];
			var elWidth = el.offsetWidth;
			var iconSize = elWidth * 0.9;
			var iconSizeRounded = Math.round(iconSize / 2) * 2;
			el.style.fontSize = iconSizeRounded + "px";
		}
	}

  hasContent() {
    const { getBlock, clientId } = this.props;

    const innerBlocks = getBlock(clientId).innerBlocks;

    return innerBlocks.length > 0;
  }

  addSlide(position = "after") {
    const {
      insertBlock,
      getBlock,
      clientId,
      getBlockIndex,
      getBlockRootClientId,
    } = this.props;

    const rootId = getBlockRootClientId(clientId);
    const index =
      getBlockIndex(clientId, rootId) + (position === "before" ? 0 : 1);
    const block = getBlock(clientId);

    if (block) {
      const insertedBlock = createBlock("epea-theme/circleslideritem");

      insertBlock(insertedBlock, index, rootId);
    }
  }

  renderBlockControls() {
    return (
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            label={__("Add Item Before", "epea-theme")}
            onClick={() => {
              this.addSlide("before");
            }}>
            {__("Add Item Before", "epea-theme")}
          </ToolbarButton>
          <ToolbarButton
            label={__("Add Item After", "epea-theme")}
            onClick={() => {
              this.addSlide();
            }}>
            {__("Add Item After", "epea-theme")}
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
    );
  }

  listenSlideContentChange() {
    const slideContent = this.props.getBlockOrder(this.props.clientId);

    if (!this.state.hasContent && slideContent.length > 0) {
      this.setState({
        hasContent: true,
      });
    }

    if (this.state.hasContent && slideContent.length <= 0) {
      this.setState({
        hasContent: false,
      });
    }
  }

  componentDidMount() {
    this.listenSlideContentChange();

    subscribe(this.listenSlideContentChange);
  }

  render() {
    const {
      headline,
      description,
      iconClass,
      imageId,
      imageAlt,
      imageDefaultAlt,
      imageUrl,
      mdimageUrl,
      xsimageUrl,
      webpImageUrl,
      webpmdImageUrl,
      webpxsImageUrl,
    } = this.props.attributes;
    const { setAttributes, Image } = this.props;

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

		const { icons, keyword } = this.state;

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
                  isLink
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
          <PanelBody title={__("Text", "epea-theme")} initialOpen={true}>
						<TextControl
							label={__("Headline", "epea-theme")}
							placeholder={__("Add Text here...", "epea-theme")}
							type="text"
							value={headline}
							onChange={(value) => setAttributes({ headline: value })}
						/>
						<TextControl
							label={__("Description", "epea-theme")}
							placeholder={__("Add Text here...", "epea-theme")}
							type="text"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
						/>
					</PanelBody>
          <PanelBody title={__("Icon", "epea-theme")} initialOpen={true}>
						<TextControl
							value={keyword}
							placeholder={__("Search", "epea-theme")}
							onChange={(newKeyword) => {
								this.search(newKeyword);
							}}
						/>
						<div className="epea-theme-icon-panel">
							{icons.length > 0 ? (
								<ul className="epea-theme-icon-list">
									{iconClass && (
										<li data-key={iconClass} className="selectedicon">
											<Tooltip text={iconClass}>
												<Button
													isTertiary
													onClick={() => {
														setAttributes({
															iconClass: iconClass,
														});
													}}
												>
													<i className={iconClass} aria-hidden="true"></i>
												</Button>
											</Tooltip>
										</li>
									)}

									{map(icons, (icon) => {
										return (
											<li data-key={icon}>
												<Tooltip text={icon}>
													<Button
														isTertiary
														onClick={() => {
															setAttributes({
																iconClass: icon,
															});
														}}
													>
														<i className={icon} aria-hidden="true"></i>
													</Button>
												</Tooltip>
											</li>
										);
									})}
								</ul>
							) : (
								<p>{__("No characters found.", "block-options")}</p>
							)}
						</div>
					</PanelBody>
        </InspectorControls>

        {this.renderBlockControls()}

        <div
					class="slider-circle__slide slider-circle__slide--fade"
					id={headline
						.replace(/[^a-zA-Z ]/g, "")
						.split(" ")
						.join("")}
					role="tabpanel"
					aria-labelledby={
						headline
							.replace(/[^a-zA-Z ]/g, "")
							.split(" ")
							.join("") + `-tab`
					}
				>

          <picture className="slider-circle__image">
            {imageUrl || xsimageUrl || mdimageUrl ? (
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
            ) : (
              <img src={PlaceholderImg} alt="placeholder" />
            )}
          </picture>

          <span className="slider-circle__icon icon icon--bgcolor-six icon--color-two">
            <i className={classnames(iconClass ? iconClass : "")}></i>
          </span>

        </div>
      
      </>
    );
  }
}

export default compose([
  withSelect((select, props) => {
    const { getBlock, getBlockRootClientId, getBlockIndex, getBlockOrder } =
      select("core/block-editor");
    const { getMedia } = select("core");
    const { imageId } = props.attributes;

    return {
      getBlock,
      getBlockRootClientId,
      getBlockIndex,
      getBlockOrder,
      Image: imageId ? getMedia(imageId) : null,
    };
  }),
  withDispatch((dispatch, props) => {
    const { insertBlock } = dispatch("core/block-editor");
    return {
      insertBlock,
    };
  }),
])(Edit);
