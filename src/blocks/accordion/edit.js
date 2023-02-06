/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl, SelectControl } from "@wordpress/components";
import {
  InspectorControls,
  PanelColorSettings,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
/**
 * Internal dependencies
 */
import { theme_colors, ButtonBlockAppender } from "../../utils/block-helpers";

export default function edit(props) {
  const { attributes, setAttributes, clientId } = props;

  const ALLOWED_BLOCKS = ["epea-theme/accordionitem"];

  const {
    anchor,
    accordionColor,
    accordionColorClass,
    accordionStyle,
  } = attributes;

  const blockProps = useBlockProps();

  const SetColorClass = (value) => {
    if (value !== undefined) {
      theme_colors.filter(function (item) {
        if (item.color == value) {
          setAttributes({
            accordionColorClass: item.slug,
          });
        }
      });
    } else {
      setAttributes({
        accordionColorClass: "",
      });
    }
  };

  const renderappender = () => <ButtonBlockAppender rootClientId={clientId} />;

  const accordionClass = classnames(
    `accordion`,
    accordionStyle ? `accordion--style-${accordionStyle}` : null,
    accordionColorClass ? `accordion--color-${accordionColorClass}` : null
  );

  const innerBlocksProps = useInnerBlocksProps(
    { className: accordionClass },

    {
      allowedBlocks: ALLOWED_BLOCKS,
      renderAppender: renderappender,
    }
  );

  return (
    <div id={anchor ? anchor : null} {...blockProps}>
      <InspectorControls>
        <PanelBody title={__("Style", "epea-theme")} initialOpen={true}>
          <SelectControl
            label={__("Type", "epea-theme")}
            options={[
              {
                value: "one",
                label: __("One", "epea-theme"),
              },
              {
                value: "two",
                label: __("Two", "epea-theme"),
              },
            ]}
            value={accordionStyle}
            onChange={(value) =>
              setAttributes({ accordionStyle: value })
            }></SelectControl>
          <PanelColorSettings
            title={__("Color", "epea-theme")}
            className={"block-color-setting block-color-top-0"}
            colorSettings={[
              {
                colors: theme_colors,
                value: accordionColor,
                onChange: (value) => {
                  typeof value == "undefined"
                    ? setAttributes({ accordionColorClass: "one" })
                    : SetColorClass(value);
                  typeof value == "undefined"
                    ? setAttributes({
                        accordionColor: "#000",
                      })
                    : setAttributes({ accordionColor: value });
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

      <div {...innerBlocksProps} />
    </div>
  );
}
