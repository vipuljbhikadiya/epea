/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  TextControl,
} from "@wordpress/components";
import {
  InspectorControls,
  useBlockProps,
  PanelColorSettings,
} from "@wordpress/block-editor";

/***
 * Interal dependencies
 */
import { theme_colors } from "../../utils/block-helpers";

export default function edit({ setAttributes, attributes }) {
  const { anchor, dividerColor, dividerColorClass, paddingTop, paddingBottom } =
    attributes;

  const SetColorClass = (value) => {
    theme_colors.filter(function (item) {
      if (item.color == value) {
        setAttributes({
          dividerColorClass: item.slug,
        });
      }
    });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Style", "epea-theme")} initialOpen={true}>
          <PanelColorSettings
            title={__("Color", "epea-theme")}
            className={"block-color-setting block-color-top-0"}
            colorSettings={[
              {
                colors: theme_colors,
                value: dividerColor,
                onChange: (value) => {
                  typeof value == "undefined"
                    ? setAttributes({ dividerColorClass: "zero" })
                    : SetColorClass(value);
                  setAttributes({
                    dividerColor: value,
                  });
                },
                label: __("Pick Color", "epea-theme"),
              },
            ]}
          />
          <span className="block-seprator"></span>
          <ToggleGroupControl
            label="Spacing Top"
            className="block-togglegroup"
            value={paddingTop}
            isBlock
            onChange={(value) => {
              setAttributes({
                paddingTop: value,
              });
            }}>
            <ToggleGroupControlOption
              value="0"
              label="S"
              showTooltip={true}
              aria-label={__("Small", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="1"
              label="M"
              showTooltip={true}
              aria-label={__("Medium", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="2"
              label="L"
              showTooltip={true}
              aria-label={__("Large", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="3"
              label="Xl"
              showTooltip={true}
              aria-label={__("Extra Large", "epea-theme")}
            />
          </ToggleGroupControl>
          <ToggleGroupControl
            label="Spacing Bottom"
            className="block-togglegroup"
            value={paddingBottom}
            isBlock
            onChange={(value) => {
              setAttributes({
                paddingBottom: value,
              });
            }}>
            <ToggleGroupControlOption
              value="0"
              label="S"
              showTooltip={true}
              aria-label={__("Small", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="1"
              label="M"
              showTooltip={true}
              aria-label={__("Medium", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="2"
              label="L"
              showTooltip={true}
              aria-label={__("Large", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="3"
              label="XL"
              showTooltip={true}
              aria-label={__("Extra Large", "epea-theme")}
            />
          </ToggleGroupControl>
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
      <div {...useBlockProps()}>
        <hr
          id={anchor ? anchor : null}
          className={classnames(
            `divider`,
            "" !== dividerColorClass
              ? `divider--color-${dividerColorClass}`
              : null,
            `divider--pd-top-${paddingTop} divider--pd-bottom-${paddingBottom}`
          )}
        />
      </div>
    </>
  );
}
