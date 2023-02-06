/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { compose } from "@wordpress/compose";
import { Platform, Component } from "@wordpress/element";
import {
  PanelBody,
  TextControl,
  ToolbarGroup,
  ToolbarButton,
  Spinner,
  Button,
  ResponsiveWrapper,
} from "@wordpress/components";
import {
  BlockControls,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  RichText,
} from "@wordpress/block-editor";
import { withSelect, withDispatch, subscribe } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

/**
 * Internal Dependencies
 */
import PlaceholderImg from "../../../assets/images/placeholder.jpg";
import { QuoteIconWhiteSm } from "../../../utils/block-icons";

/**
 * Create an Component
 */
class Edit extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      hasContent: true,
    };

    this.hasContent = this.hasContent.bind(this);
    this.addSlide = this.addSlide.bind(this);
    this.listenSlideContentChange = this.listenSlideContentChange.bind(this);
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
      const insertedBlock = createBlock("epea-theme/testimonialslide");

      insertBlock(insertedBlock, index, rootId);
    }
  }

  renderBlockControls() {
    return (
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            label={__("Add Testimonial Slide Before", "epea-theme")}
            onClick={() => {
              this.addSlide("before");
            }}>
            {__("Add Testimonial Slide Before", "epea-theme")}
          </ToolbarButton>
          <ToolbarButton
            label={__("Add Testimonial Slide After", "epea-theme")}
            onClick={() => {
              this.addSlide();
            }}>
            {__("Add Testimonial After", "epea-theme")}
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
      imageId,
      imageAlt,
      imageDefaultAlt,
      imageUrl,
      xsimageUrl,
      webpxsImageUrl,
      slideName,
      slidePosition,
      slideDescription,
    } = this.props.attributes;
    const { setAttributes, Image } = this.props;

    const onSlideNameChange = (value) => {
      const newSlideName = { slideName: value };
      setAttributes(newSlideName);
    };

    const onSlidePositionChange = (value) => {
      const newSlidePosition = { slidePosition: value };
      setAttributes(newSlidePosition);
    };

    const onSlideDescriptionChange = (value) => {
      const newSlideDescription = { slideDescription: value };
      setAttributes(newSlideDescription);
    };

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
        xsimageUrl: image?.sizes?.xs?.url
					? image?.sizes?.xs?.url
					: image?.sizes?.md?.url
					? image?.sizes?.md?.url
					: image.url,
        imageDefaultAlt: image.alt,
      });
    };

    const onRemoveImage = () => {
      setAttributes({
        imageId: undefined,
        xsimageUrl: "",
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

    return (
      <div className="splide__slide">
        {this.renderBlockControls()}
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
        </InspectorControls>

        <div className="image image--style-one">
          <div class="image__helper"></div>

          <picture className="splide__image">
            {!xsimageUrl ? (
              <img src={PlaceholderImg} alt="placeholder" />
            ) : (
              <>
                {webpxsImageUrl ? (
                  <source
                    srcset={`${webpxsImageUrl}`}
                    type="image/webp"
                  />
                ) : (
                  ""
                )}
                <source srcset={`${xsimageUrl}`} />
                <img
                  src={`${xsimageUrl}`}
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

          <span className="splide__icon">
            <QuoteIconWhiteSm />
          </span>

        </div>
        <div className="splide__content">
          <RichText
            identifier="slideName"
            tagName="span"
            className="splide__name headline headline--style-six headline--color-five"
            value={slideName}
            onChange={onSlideNameChange}
            withoutInteractiveFormatting={true}
            aria-label={__("Name", "epea-theme")}
            placeholder={__("Max Mustermann", "epea-theme")}
            {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
            allowedFormats={[""]}
          />
          <RichText
            identifier="slidePosition"
            tagName="span"
            className="splide__position text text--color-three text--style-three"
            value={slidePosition}
            onChange={onSlidePositionChange}
            withoutInteractiveFormatting={true}
            aria-label={__("Position", "epea-theme")}
            placeholder={__("Lorem ipsum dolor", "epea-theme")}
            {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
            allowedFormats={[""]}
          />
          <RichText
            identifier="slideDescription"
            tagName="span"
            className="splide__description text text--color-three text--style-three"
            value={slideDescription}
            onChange={onSlideDescriptionChange}
            withoutInteractiveFormatting={true}
            aria-label={__("Description", "epea-theme")}
            placeholder={__("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", "epea-theme")}
            {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
            allowedFormats={[""]}
          />
        </div>
      </div>
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
