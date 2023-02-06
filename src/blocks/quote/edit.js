/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl } from "@wordpress/components";
import {
  InspectorControls,
  useBlockProps,
  RichText,
  PanelColorSettings,
} from "@wordpress/block-editor";
import { Platform } from "@wordpress/element";

/***
 * Interal dependencies
 */
import { theme_colors } from "../../utils/block-helpers";
import { QuoteIcon } from "../../utils/block-icons";

export default function edit({
  setAttributes,
  attributes,
  mergeBlocks,
  onReplace,
  onRemove,
}) {
  const { content, quoteColor, quoteColorClass, anchor } =
    attributes;

  const onContentChange = (value) => {
    const newContent = { content: value };
    setAttributes(newContent);
  };

  const SetColorClass = (value) => {
    theme_colors.filter(function (item) {
      if (item.color == value) {
        setAttributes({
          quoteColorClass: item.slug,
        });
      }
    });
  };

  const colorClass = quoteColorClass ? `quote--color-${quoteColorClass}` : "";

  const blockClass = classnames(`quote`, `${colorClass}`);

  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__("Style", "epea-theme")} initialOpen={true}>
          <PanelColorSettings
            title={__("Color", "epea-theme")}
            className={"block-color-setting block-color-top-0"}
            colorSettings={[
              {
                colors: theme_colors,
                value: quoteColor,
                onChange: (value) => {
                  typeof value == "undefined"
                    ? setAttributes({ quoteColorClass: "" })
                    : SetColorClass(value);
                  typeof value == "undefined"
                    ? setAttributes({
                        quoteColor: "#000000",
                      })
                    : setAttributes({ quoteColor: value });
                },
                label: __("Color Selector", "epea-theme"),
              },
            ]}
          />
        </PanelBody>
        <PanelBody title={__("Additional", "epea-theme")} initialOpen={false}>
          <TextControl
            label={__("Anchor", "epea-theme")}
            placeholder={__("Specify Id…", "epea-theme")}
            type="text"
            value={anchor}
            onChange={(value) => setAttributes({ anchor: value })}
          />
        </PanelBody>
      </InspectorControls>
      <div id={anchor ? anchor : null} className={blockClass}>
        <QuoteIcon />
        <RichText
          identifier="content"
          tagName="p"
          className="quote__text"
          value={content}
          onChange={onContentChange}
          onMerge={mergeBlocks}
          onReplace={onReplace}
          onRemove={onRemove}
          aria-label={__("Quote text", "epea-theme")}
          placeholder={__("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", "epea-theme")}
          {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
          allowedFormats={["core/bold", "core/italic", "core/link"]}
        />
      </div>
    </div>
  );
}
