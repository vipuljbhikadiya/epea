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
import { Platform, useState } from "@wordpress/element";
import { alignCenter, alignLeft, alignRight } from "@wordpress/icons";

/***
 * Interal dependencies
 */
import { theme_colors } from "../../utils/block-helpers";

export default function edit({ setAttributes, attributes }) {
  
  const [responsiveMode, setresponsiveMode] = useState("xs");

  const {
    content,
    level,
    placeholder,
    headColor,
    headColorClass,
    headStyle,
    AlignXs,
    AlignSm,
    AlignMd,
    AlignLg,
    AlignXl,
    anchor,
  } = attributes;

  const tagName = level == "span" ? "span" : "h" + level;

  const onContentChange = (value) => {
    const newContent = { content: value };
    setAttributes(newContent);
  };

  const blockProps = useBlockProps();

  const SetColorClass = (value) => {
    if (value !== undefined) {
      theme_colors.filter(function (item) {
        if (item.color == value) {
          setAttributes({
            headColorClass: item.slug,
          });
        }
      });
    } else {
      setAttributes({
        headColorClass: "",
      });
    }
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
      alignclass += " headline--align-xs-" + AlignXs;
    }
    if (AlignSm) {
      if (AlignSm != AlignXs) {
        alignclass += " headline--align-sm-" + AlignSm;
      }
    }
    if (AlignMd) {
      if (AlignMd != AlignSm) {
        alignclass += " headline--align-md-" + AlignMd;
      }
    }
    if (AlignLg) {
      if (AlignLg != AlignMd) {
        alignclass += " headline--align-lg-" + AlignLg;
      }
    }
    if (AlignXl) {
      if (AlignXl != AlignLg) {
        alignclass += " headline--align-xl-" + AlignXl;
      }
    }
  }

  const colorClass = headColorClass ? `headline--color-${headColorClass}` : "";
  const styleClass = headStyle ? `headline--style-${headStyle}` : "";
  const headlineAlign = "" !== alignclass ? `${alignclass}` : "";

  const blockClass = classnames(
    `headline`,
    `${headlineAlign}`,
    `${styleClass}`,
    `${colorClass}`
  );

  const resMode = ["xs", "sm", "md", "lg", "xl"];
  const headAlignSettings = {
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

  const options = [
    {
			key: "one",
			name: "One",
			style: {
				fontSize: "60px",
				lineHeight: "70px",
				textTransform: "uppercase",
				fontFamily: "Barlow",
				letterSpacing: "3.24px",
			},
		},
		{
			key: "two",
			name: "Two",
			style: {
				fontSize: "50px",
				lineHeight: "60px",
				textTransform: "uppercase",
				fontFamily: "Barlow",
				fontWeight: "600",
				letterSpacing: "2.7px",
			},
		},
		{
			key: "three",
			name: "Three",
			style: {
				fontSize: "31px",
				lineHeight: "37px",
				textTransform: "uppercase",
				fontFamily: "Barlow",
				letterSpacing: "1.674px",
			},
		},
		{
			key: "four",
			name: "Four",
			style: {
				fontSize: "26px",
				lineHeight: "29px",
				textTransform: "uppercase",
				fontWeight: "600",
				fontFamily: "Barlow",
			},
		},
		{
			key: "five",
			name: "Five",
			style: {
				fontSize: "24px",
				lineHeight: "29px",
				fontFamily: "Barlow",
				letterSpacing: "1.296px",
			},
		},
		{
			key: "six",
			name: "Six",
			style: {
				fontSize: "23px",
				lineHeight: "27px",
				fontFamily: "Barlow",
				fontWeight: "600",
			},
		},
		{
			key: "seven",
			name: "Seven",
			style: {
				fontSize: "18px",
				lineHeight: "22px",
				fontFamily: "Barlow",
				fontWeight: "500",
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
                headStyle: selectedItem.key,
              })
            }
            __nextUnconstrainedWidth={true}
            value={options.find((option) => option.key === headStyle)}
          />
          <PanelColorSettings
            title={__("Color", "epea-theme")}
            className={"block-color-setting block-color-top-0"}
            colorSettings={[
              {
                colors: theme_colors,
                value: headColor,
                onChange: (value) => {
                  typeof value == "undefined"
                    ? setAttributes({ headColorClass: "" })
                    : SetColorClass(value);
                  typeof value == "undefined"
                    ? setAttributes({
                        headColor: "#575756",
                      })
                    : setAttributes({ headColor: value });
                },
                label: __("Color Selector", "epea-theme"),
              },
            ]}
          />
        </PanelBody>
        <PanelBody title={__("Settings")} initialOpen={true}>
          <div className="block--component-align">
            <label className="blocks-label block--label-as-component-button">
              {__("Alignment")}
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
                  let align = headAlignSettings[item]["align"];

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
          <span className="block-seprator"></span>
          <ToggleGroupControl
            label={__("Tag", "epea-theme")}
            value={level}
            onChange={(value) => {
              setAttributes({
                level: value,
              });
            }}
            className="block-toggle-full">
            <ToggleGroupControlOption
              value="1"
              label={__("H1", "epea-theme")}
              showTooltip={true}
              aria-label={__("H1", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="2"
              label={__("H2", "epea-theme")}
              showTooltip={true}
              aria-label={__("H2", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="3"
              label={__("H3", "epea-theme")}
              showTooltip={true}
              aria-label={__("H3", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="4"
              label={__("H4", "epea-theme")}
              showTooltip={true}
              aria-label={__("H4", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="5"
              label={__("H5", "epea-theme")}
              showTooltip={true}
              aria-label={__("H5", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="6"
              label={__("H6", "epea-theme")}
              showTooltip={true}
              aria-label={__("H6", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="span"
              label={__("SPAN", "epea-theme")}
              showTooltip={true}
              aria-label={__("Span", "epea-theme")}
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
        className={blockClass}
        value={content}
        id={anchor ? anchor : null}
        onChange={onContentChange}
        withoutInteractiveFormatting={true}
        aria-label={__("Heading text", "epea-theme")}
        placeholder={placeholder || __("Lorem ipsum dolor", "epea-theme")}
        {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
        allowedFormats={[""]}
      />
    </div>
  );
}
