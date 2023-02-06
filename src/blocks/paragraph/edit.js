/**
 * External dependencies
 */

import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  TextControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
  CustomSelectControl,
  Button,
} from "@wordpress/components";
import {
  InspectorControls,
  useBlockProps,
  RichText,
  PanelColorSettings,
} from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import { Platform, useState } from "@wordpress/element";
import { alignCenter, alignLeft, alignRight } from "@wordpress/icons";

/***
 * Interal dependencies
 */
import { theme_colors } from "../../utils/block-helpers";

export default function edit({
  setAttributes,
  attributes,
  clientId,
  mergeBlocks,
  onReplace,
  onRemove,
}) {

  const [responsiveMode, setresponsiveMode] = useState("xs");

  const {
    content,
    tag,
    placeholder,
    textColorClass,
    textColor,
    textStyle,
    AlignXs,
    AlignSm,
    AlignMd,
    AlignLg,
    AlignXl,
    anchor,
    extraClass,
  } = attributes;

  const onContentChange = (value) => {
    const newContent = { content: value };
    setAttributes(newContent);
  };

  const tagName = tag;

  const SetColorClass = (value) => {
    theme_colors.filter(function (item) {
      if (item.color == value) {
        setAttributes({
          textColorClass: item.slug,
        });
      }
    });
  };

  let alignclass = "";

  if (
    AlignXs == AlignSm &&
    AlignSm == AlignMd &&
    AlignMd == AlignLg &&
    AlignLg == AlignXl &&
    AlignXs == "left"
  ) {
    alignclass = "";
  } else {
    if (AlignXs) {
      alignclass += " text--align-xs-" + AlignXs;
    }
    if (AlignSm) {
      if (AlignSm != AlignXs) {
        alignclass += " text--align-sm-" + AlignSm;
      }
    }
    if (AlignMd) {
      if (AlignMd != AlignSm) {
        alignclass += " text--align-md-" + AlignMd;
      }
    }
    if (AlignLg) {
      if (AlignLg != AlignMd) {
        alignclass += " text--align-lg-" + AlignLg;
      }
    }
    if (AlignXl) {
      if (AlignXl != AlignLg) {
        alignclass += " text--align-xl-" + AlignXl;
      }
    }
  }

  const colorClass = textColorClass ? `text--color-${textColorClass}` : "";
  const styleClass = textStyle ? `text--style-${textStyle}` : "";
  const extraParagraphClass = extraClass ? `${extraClass}` : "";
  const paragraphAlignClass = "" !== alignclass ? `${alignclass}` : "";

  const blockClass = classnames(
    `text`,
    `${paragraphAlignClass}`,
    `${colorClass}`,
    `${styleClass}`,
    `${extraParagraphClass}`
  );

  const resMode = ["xs", "sm", "md", "lg", "xl"];
  const textAlignSettings = {
    xs: {
      align: AlignXs,
    },
    sm: {
      align: AlignSm,
    },
    md: {
      align: AlignMd,
    },
    lg: {
      align: AlignLg,
    },
    xl: {
      align: AlignXl,
    },
  };

  const resetAlignment = (resMode) => {
    if (resMode == "xl") {
      setAttributes({
        AlignXl: "",
      });
    }
    if (resMode == "lg") {
      setAttributes({
        AlignLg: "",
      });
    }
    if (resMode == "md") {
      setAttributes({
        AlignMd: "",
      });
    }
    if (resMode == "sm") {
      setAttributes({
        AlignSm: "",
      });
    }
    if (resMode == "xs") {
      setAttributes({
        AlignXs: "",
      });
    }
  };

  const onChangeAlign = (value) => {
    if (responsiveMode == "xl") {
      setAttributes({
        AlignXl: value !== undefined ? value : "",
      });
    }
    if (responsiveMode == "lg") {
      setAttributes({
        AlignLg: value !== undefined ? value : "",
      });
    }
    if (responsiveMode == "md") {
      setAttributes({
        AlignMd: value !== undefined ? value : "",
      });
    }
    if (responsiveMode == "sm") {
      setAttributes({
        AlignSm: value !== undefined ? value : "",
      });
    }
    if (responsiveMode == "xs") {
      setAttributes({
        AlignXs: value !== undefined ? value : "",
      });
    }
  };

  const blockProps = useBlockProps();

  const options = [
    {
			key: "one",
			name: "One",
			style: {
				fontSize: "27px",
				lineHeight: "32px",
				fontFamily: "Barlow",
			},
		},
		{
			key: "two",
			name: "Two",
			style: {
				fontSize: "20px",
				lineHeight: "34px",
				fontFamily: "Barlow",
			},
		},
		{
			key: "three",
			name: "Three",
			style: {
				fontSize: "18px",
				lineHeight: "28px",
				fontFamily: "Barlow",
			},
		},
  ];

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__("Style", "epea-theme")} initialOpen={true}>
          <CustomSelectControl
            label={__("Type", "epea-theme")}
            options={options}
            className="block--customselect"
            onChange={({ selectedItem }) =>
              setAttributes({
                textStyle: selectedItem.key,
              })
            }
            __nextUnconstrainedWidth={true}
            value={options.find((option) => option.key === textStyle)}
          />
          <PanelColorSettings
            title={__("Text Color", "epea-theme")}
            className={"block-color-setting block-color-top-0"}
            colorSettings={[
              {
                colors: theme_colors,
                value: textColor,
                onChange: (value) => {
                  typeof value == "undefined"
                    ? setAttributes({ textColorClass: "" })
                    : SetColorClass(value);
                  typeof value == "undefined"
                    ? setAttributes({
                        textColor: "#000000",
                      })
                    : setAttributes({ textColor: value });
                },
                label: __("Color Selector", "epea-theme"),
              },
            ]}
          />          
        </PanelBody>
        <PanelBody title={__("Settings", "epea-theme")} initialOpen={true}>
          <div className="block--component-align">
            <label className="blocks-label block--label-as-component-button">
              Alignment
            </label>
            <ToggleGroupControl
              label={__("Responsive Mode", "epea-theme")}
              className="block-togglegroup"
              value={responsiveMode}
              isBlock
              onChange={(value) => {
                setresponsiveMode(value);
              }}>
              <ToggleGroupControlOption
                value="xs"
                label={__("XS", "epea-theme")}
                showTooltip={true}
                aria-label={__("Extra Small", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="sm"
                label={__("SM", "epea-theme")}
                showTooltip={true}
                aria-label={__("Small", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="md"
                label={__("MD", "epea-theme")}
                showTooltip={true}
                aria-label={__("Medium", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="lg"
                label={__("LG", "epea-theme")}
                showTooltip={true}
                aria-label={__("Large", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="xl"
                label={__("XL", "epea-theme")}
                showTooltip={true}
                aria-label={__("Extra Large", "epea-theme")}
              />
            </ToggleGroupControl>
            {responsiveMode ? (
              <div className="button-control">
                {resMode.map((item, index) => {
                  let align = textAlignSettings[item]["align"];
                  return (
                    <div className="col-control-wrap" id={`col-${index}`}>
                      {responsiveMode == item ? (
                        <div className="block--row__settings">
                          <ToggleGroupControl
                            label={__("Alignment", "epea-theme")}
                            className="block-togglegroup"
                            value={align}
                            isBlock
                            onChange={onChangeAlign}>
                            <ToggleGroupControlOptionIcon
                              value="left"
                              icon={alignLeft}
                              showTooltip={true}
                              aria-label={__("Left", "epea-theme")}
                            />
                            <ToggleGroupControlOptionIcon
                              value="center"
                              icon={alignCenter}
                              showTooltip={true}
                              aria-label={__("Center", "epea-theme")}
                            />
                            <ToggleGroupControlOptionIcon
                              value="right"
                              icon={alignRight}
                              showTooltip={true}
                              aria-label={__("Right", "epea-theme")}
                            />
                          </ToggleGroupControl>
                          <Button
                            onClick={() => resetAlignment(responsiveMode)}
                            label={__("Reset", "epea-theme")}
                            className="components-button components-range-control__reset is-secondary is-small align--reset">
                            {__("Reset", "epea-theme")}
                          </Button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <ToggleGroupControl
                label={__("Alignment", "epea-theme")}
                className="block-togglegroup epea-theme-togglegroup"
                value=""
                isBlock
                onChange={onChangeAlign}>
                <ToggleGroupControlOptionIcon
                  value="left"
                  icon={alignLeft}
                  showTooltip={true}
                  aria-label={__("Left", "epea-theme")}
                />
                <ToggleGroupControlOptionIcon
                  value="center"
                  icon={alignCenter}
                  showTooltip={true}
                  aria-label={__("Center", "epea-theme")}
                />
                <ToggleGroupControlOptionIcon
                  value="right"
                  icon={alignRight}
                  showTooltip={true}
                  aria-label={__("Right", "epea-theme")}
                />
              </ToggleGroupControl>
            )}
          </div>
          <ToggleGroupControl
            label={__("Tag", "epea-theme")}
            className="block-togglegroup block-toggle-full"
            value={tag}
            onChange={(value) => {
              setAttributes({
                tag: value,
              });
            }}>
            <ToggleGroupControlOption
              value="p"
              label={__("P", "epea-theme")}
              showTooltip={true}
              aria-label={__("P", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="span"
              label={__("SPAN", "epea-theme")}
              showTooltip={true}
              aria-label={__("SPAN", "epea-theme")}
            />
          </ToggleGroupControl>
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

      <RichText
        identifier="content"
        tagName={tagName}
        id={anchor ? anchor : null}
        className={blockClass}
        value={content}
        onChange={onContentChange}
        onSplit={(value, isOriginal) => {
          let newAttributes;

          newAttributes = {
            ...attributes,
            content: value,
          };

          const block = createBlock("epea-theme/paragraph", newAttributes);

          if (isOriginal) {
            block.clientId = clientId;
          }

          return block;
        }}
        onMerge={mergeBlocks}
        onReplace={onReplace}
        onRemove={onRemove}
        aria-label={__("Paragraph text", "epea-theme")}
        placeholder={placeholder || __("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", "epea-theme")}
        {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
        allowedFormats={["core/bold", "core/italic", "core/link"]}
      />
    </div>
  );
}
