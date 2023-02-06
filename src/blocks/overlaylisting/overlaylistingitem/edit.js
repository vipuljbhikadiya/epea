/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  MediaUpload,
  MediaUploadCheck,
  RichText,
  InspectorControls,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import {
  Spinner,
  Button,
  PanelBody,
  ResponsiveWrapper,
  TextControl,
} from "@wordpress/components";
import { Platform, Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import { withSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import PlaceholderImg from "../../../assets/images/placeholder.jpg";

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
        mdimageUrl,
        xsimageUrl,
        webpxsImageUrl,
        content,
        itemLink,
      },
      Image,
      setAttributes,
    } = this.props;

    const onContentChange = (value) => {
      const newContent = { content: value };
      setAttributes(newContent);
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
        webpxsImageUrl: "",
      });
    };

    const unlink = () => {
      setAttributes({
        itemLink: undefined
      });
    };

    if (Image) {
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
    const innerContent = () => {
      return (
        <>
          <picture className={`listing-overlay__image`}>
            {!imageUrl ? (
              <div className="image placeholder__img">
                <img src={PlaceholderImg} alt="placeholder" />
              </div>
            ) : (
              (imageUrl || xsimageUrl || mdimageUrl) && ( 
                <>
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
              )
            )}
          </picture>
          <RichText
            identifier="content"
            tagName="span"
            className="listing-overlay__title headline headline--align-xs-left headline--style-seven headline--color-five"
            value={content}
            onChange={onContentChange}
            withoutInteractiveFormatting={true}
            aria-label={__("Name", "epea-theme")}
            placeholder={__("Lorem ipsum dolor sit amet", "epea-theme")}
            {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
            allowedFormats={[""]}
          />
        </>
      );
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
                      className="is-secondary block--image-attr block-section-background-image-replace">
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
                  className="is-link is-destructive block--image-attr block-section-background-image-remove">
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
              <div className="gb--link-control">
                <LinkControl
                  searchInputPlaceholder="Search here..."
                  value={itemLink}
                  settings={[
                    {
                      id: "opensInNewTab",
                      title: "Open in new tab",
                    },
                  ]}
                  onChange={(newLink) => setAttributes({ itemLink: newLink })}
                  onRemove={() => {
                    unlink();
                  }}
                  withCreateSuggestion={true}
                  createSuggestion={(inputValue) =>
                    setAttributes({
                      post: {
                        ...itemLink,
                        title: inputValue,
                        type: "custom-url",
                        id: Date.now(),
                        url: inputValue,
                      },
                    })
                  }></LinkControl>
              </div>
            </PanelBody>
        </InspectorControls>
        {undefined == itemLink ? (
          <div className="listing-overlay__item col col--xs-12 col--md-6 col--xl-4 col--pd-0">
            <div className="col__content">
              {innerContent()}
            </div>
          </div>
        ) : (
          <a
            onClick={(e) => e.preventDefault()}
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
export default compose(
  withSelect((select, props) => {
    const { getMedia } = select("core");
    const { imageId } = props.attributes;

    return {
      Image: imageId ? getMedia(imageId) : null,
    };
  })
)(Edit);
