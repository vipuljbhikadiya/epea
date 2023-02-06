/**
 * WordPress dependencies
 */

import { __ } from "@wordpress/i18n";
import { withSelect, withDispatch } from "@wordpress/data";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { compose } from "@wordpress/compose";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import {
  TextareaControl,
  PanelRow,
  Spinner,
  Button,
  ResponsiveWrapper,
} from "@wordpress/components";

const edit = ({ postType, postMeta, setPostMeta, Image }) => {
  if ("post" !== postType && "page" !== postType && "blog" !== postType) {
    return null; // Will render component for post type 'post', 'page', 'blog'
  }

  const instructions = (
    <p>
      {__(
        "To edit the image, you need permission to upload media.",
        "epea-theme"
      )}
    </p>
  );
  const ALLOWED_MEDIA_TYPES = ["image"];

  return (
    <PluginDocumentSettingPanel
      title={__("Social Settings", "epea-theme")}
      icon=""
      initialOpen="false"
      className="epea-theme_hide_panel_icon">
      <PanelRow>
        <TextareaControl
          className="epea-theme_text_area"
          label={__("Title", "epea-theme")}
          value={postMeta.social_meta_title}
          onChange={(value) => setPostMeta({ social_meta_title: value })}
        />
      </PanelRow>
      <PanelRow>
        <TextareaControl
          className="epea-theme_text_area"
          label={__("Description", "epea-theme")}
          value={postMeta.social_meta_description}
          onChange={(value) => setPostMeta({ social_meta_description: value })}
        />
      </PanelRow>
      <PanelRow className="social--image-row">
        <MediaUploadCheck fallback={instructions}>
          <MediaUpload
            title={__("Social Image", "epea-theme")}
            onSelect={(image) => {
              setPostMeta({ social_meta_image: image.id });
            }}
            allowedTypes={ALLOWED_MEDIA_TYPES}
            value={postMeta.social_meta_image}
            render={({ open }) => (
              <Button
                className={
                  !postMeta.social_meta_image
                    ? "editor-post-featured-image__toggle"
                    : "editor-post-featured-image__preview"
                }
                onClick={open}>
                {!!postMeta.social_meta_image && !Image && <Spinner />}
                {!postMeta.social_meta_image &&
                  __("Set image", "epea-theme")}
                {!!postMeta.social_meta_image && Image && (
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
        {!!postMeta.social_meta_image && Image ? (
          <MediaUploadCheck>
            <MediaUpload
              title={__("Image", "epea-theme")}
              onSelect={(image) => setPostMeta({ social_meta_image: image.id })}
              allowedTypes={ALLOWED_MEDIA_TYPES}
              value={postMeta.social_meta_image}
              render={({ open }) => (
                <Button
                  onClick={open}
                  variant="secondary"
                  isLarge
                  className="is-secondary">
                  {__("Replace image", "epea-theme")}
                </Button>
              )}
            />
          </MediaUploadCheck>
        ) : (
          <></>
        )}
        {!!postMeta.social_meta_image ? (
          <MediaUploadCheck>
            <Button
              onClick={() => setPostMeta({ social_meta_image: 0 })}
              isDestructive
              className="is-link is-destructive">
              {__("Remove image", "epea-theme")}
            </Button>
          </MediaUploadCheck>
        ) : (
          <></>
        )}
      </PanelRow>
    </PluginDocumentSettingPanel>
  );
};

export default compose([
  withSelect((select) => {
    return {
      postMeta: select("core/editor").getEditedPostAttribute("meta"),
      postType: select("core/editor").getCurrentPostType(),
      Image:
        select("core/editor").getEditedPostAttribute("meta") != undefined
          ? select("core/editor").getEditedPostAttribute("meta")
              .social_meta_image
            ? select("core").getMedia(
                select("core/editor").getEditedPostAttribute("meta")
                  .social_meta_image
              )
            : null
          : null,
    };
  }),
  withDispatch((dispatch) => {
    return {
      setPostMeta(newMeta) {
        dispatch("core/editor").editPost({ meta: newMeta });
      },
    };
  }),
])(edit);
