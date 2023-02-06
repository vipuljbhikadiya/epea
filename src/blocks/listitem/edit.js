/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Platform } from "@wordpress/element";
import { createBlock } from "@wordpress/blocks";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function edit({ 
  setAttributes, 
  attributes, 
  clientId, 
  mergeBlocks,
  onReplace,
  onRemove, }) {
  const { values } = attributes;

  return (
    <li {...useBlockProps()}>
      <RichText
        identifier="values"
        value={values}
        onChange={(nextValues) => setAttributes({ values: nextValues })}
        onSplit={(value, isOriginal) => {
          let newAttributes;

          newAttributes = {
            ...attributes,
            values: value,
          };

          const block = createBlock("epea-theme/listitem", newAttributes);

          if (isOriginal) {
            block.clientId = clientId;
          }

          return block;
        }}
        onMerge={mergeBlocks}
        onReplace={onReplace}
        onRemove={onRemove}
        aria-label={__("List text", "epea-theme")}
        placeholder={__("List", "epea-theme")}
        {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
        allowedFormats={["core/bold", "core/italic", "core/link"]}></RichText>
    </li>
  );
}
