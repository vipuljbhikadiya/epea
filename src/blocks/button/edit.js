/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect, useRef } from "@wordpress/element";
import {
  PanelBody,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
  Popover,
  ToolbarButton,
  ToggleControl,
  TextControl,
  Button,
} from "@wordpress/components";
import {
  InspectorControls,
  useBlockProps,
  RichText,
  __experimentalLinkControl as LinkControl,
  BlockControls,
  PanelColorSettings,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { displayShortcut } from "@wordpress/keycodes";
import { link, linkOff } from "@wordpress/icons";
import { alignCenter, alignLeft, alignRight } from "@wordpress/icons";

/***
 * Interal dependencies
 */
import { theme_colors } from "../../utils/block-helpers";

export default function edit({
  setAttributes,
  attributes,
  isSelected,
  onReplace,
  mergeBlocks,
}) {
  const {
    style,
    bgcolor,
    bgcolorClass,
    width,
    linkTarget,
		buttonicon,
    text,
    url,
    responsiveMode,
    AlignXs,
    AlignSm,
    AlignMd,
    AlignLg,
    AlignXl,
    anchor,
    downloadable,
  } = attributes;

  const ref = useRef();
  const richTextRef = useRef();

  const [isEditingURL, setIsEditingURL] = useState(false);
  const isURLSet = !!url;
  const opensInNewTab = linkTarget === "_blank";
  const NEW_TAB_REL = "noopener";

  const relAttributes = [];

  // Stop the buttons from doing anything in the editor.
  const links = document.querySelectorAll("a.button");

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener(
      "click",
      function (e) {
        if (links[i].getAttribute("href")) {
          links[i].removeAttribute("href");
          e.preventDefault();
        }
      },
      false
    );
  }

  function onToggleOpenInNewTab(value) {
    const newLinkTarget = value ? "_blank" : undefined;

    if (newLinkTarget) {
      relAttributes.push("noopener");
    }

    setAttributes({
      linkTarget: newLinkTarget,
    });
  }

  function startEditing(event) {
    event.preventDefault();
    setIsEditingURL(true);
  }

  function unlink() {
    setAttributes({
      url: undefined,
      linkTarget: undefined,
      rel: undefined,
    });
    setIsEditingURL(false);
  }

  useEffect(() => {
    if (!isSelected) {
      setIsEditingURL(false);
    }
  }, [isSelected]);

  const SetColorClass = (value) => {
    if (value !== undefined) {
      theme_colors.filter(function (item) {
        if (item.color == value) {
          setAttributes({
            bgcolorClass: item.slug,
          });
          setAttributes({
            bgcolor: item.color,
          });
        }
      });
    } else {
      setAttributes({
        bgcolorClass: "",
        bgcolor: "",
      });
    }
  };

  let alignclass = "";

  if (
    AlignXs == AlignSm &&
    AlignSm == AlignMd &&
    AlignMd == AlignLg &&
    AlignLg == AlignXl
  ) {
    if (AlignXs) {
      alignclass += " button--align-xs-" + AlignXs;
    }
  } else {
    if (AlignXs) {
      alignclass += " button--align-xs-" + AlignXs;
    }
    if (AlignSm) {
      if (AlignSm != AlignXs) {
        alignclass += " button--align-sm-" + AlignSm;
      }
    }
    if (AlignMd) {
      if (AlignMd != AlignSm) {
        alignclass += " button--align-md-" + AlignMd;
      }
    }
    if (AlignLg) {
      if (AlignLg != AlignMd) {
        alignclass += " button--align-lg-" + AlignLg;
      }
    }
    if (AlignXl) {
      if (AlignXl != AlignLg) {
        alignclass += " button--align-xl-" + AlignXl;
      }
    }
  }

  const classes = `button-default button--style-${style} button--width-${width} button--color-${bgcolorClass}`;
  const btnclassName = classnames({
    [`${classes}`]: undefined !== classes,
		' button--icon': false !== buttonicon,
    [`${alignclass}`]: "" !== alignclass,
  });

  const relation =
    relAttributes && relAttributes.length > 0 ? relAttributes.join(" ") : null;

    const innerBlocksProps = useInnerBlocksProps(
      { className: '' },
      {
        allowedBlocks: ['epea-theme/icon'],
        template: [
          [
            'epea-theme/icon',
            {
              iconbgColor: '#49725B',
              iconbgColorClass: 'five',
            },
          ],
        ],
        templateLock: 'all',
      }
    );

  const resMode = ["xs", "sm", "md", "lg", "xl"];
  const btnAlignSettings = {
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

  return (
    <>
      <div {...useBlockProps({ className: `${alignclass}` })}>
        <InspectorControls>
          <PanelBody title={__("Style", "default-theme")} initialOpen={true}>
            <ToggleGroupControl
              label={__("Type", "default-theme")}
              className="block-togglegroup"
              value={style}
              isBlock
              onChange={(value) => {
                setAttributes({
                  style: value,
                });
              }}>
              <ToggleGroupControlOption
                value="one"
                label={__("Fill", "default-theme")}
                showTooltip={true}
                aria-label="Fill"
              />
              <ToggleGroupControlOption
                value="two"
                label={__("Outline", "default-theme")}
                showTooltip={true}
                aria-label="Outline"
              />
            </ToggleGroupControl>
            <PanelColorSettings
              title={__("Color", "default-theme")}
              className={"block-color-setting block-color-top-0"}
              colorSettings={[
                {
                  colors: theme_colors,
                  value: bgcolor,
                  onChange: (value) => {
                    SetColorClass(value);
                  },
                  label: __("Color Selector", "default-theme"),
                },
              ]}
            />
          </PanelBody>
          <PanelBody title={__("Settings", "default-theme")} initialOpen={true}>
            <ToggleGroupControl
              label={__("Width", "default-theme")}
              className="block-togglegroup"
              value={width}
              isBlock
              onChange={(value) => {
                setAttributes({
                  width: value,
                });
              }}>
              <ToggleGroupControlOption
                value="inline"
                label={__("Inline", "default-theme")}
                showTooltip={true}
                aria-label={__("Inline", "default-theme")}
              />
              <ToggleGroupControlOption
                value="one"
                label={__("1/4", "default-theme")}
                showTooltip={true}
                aria-label={__("1/4", "default-theme")}
              />
              <ToggleGroupControlOption
                value="two"
                label={__("2/4", "default-theme")}
                showTooltip={true}
                aria-label={__("2/4", "default-theme")}
              />
              <ToggleGroupControlOption
                value="three"
                label={__("3/4", "default-theme")}
                showTooltip={true}
                aria-label={__("3/4", "default-theme")}
              />
              <ToggleGroupControlOption
                value="four"
                label={__("4/4", "default-theme")}
                showTooltip={true}
                aria-label={__("4/4", "default-theme")}
              />
            </ToggleGroupControl>
            <span className="block-seprator"></span>
            <ToggleControl
							label={__('Add Icon', 'default-theme')}
							checked={buttonicon}
							onChange={() =>
								setAttributes({
									buttonicon: !buttonicon,
								})
							}
						/>
            <ToggleControl
              label={__("Set Download", "default-theme")}
              className="block-mt"
              checked={downloadable}
              onChange={() =>
                setAttributes({
                  downloadable: !downloadable,
                })
              }
            />
            <span className="block-seprator"></span>
            <div className="block--component-align">
              <label className="blocks-label block--label-as-component-button">
                {__("Alignment", "default-theme")}
              </label>
              <ToggleGroupControl
                label={__("Responsive Mode", "default-theme")}
                className="block-togglegroup"
                value={responsiveMode}
                isBlock
                onChange={(value) => {
                  setAttributes({
                    responsiveMode: value,
                  });
                }}>
                <ToggleGroupControlOption
                  value="xs"
                  label={__("XS", "default-theme")}
                  showTooltip={true}
                  aria-label={__("Extra Small", "default-theme")}
                />
                <ToggleGroupControlOption
                  value="sm"
                  label={__("SM", "default-theme")}
                  showTooltip={true}
                  aria-label={__("Small", "default-theme")}
                />
                <ToggleGroupControlOption
                  value="md"
                  label={__("MD", "default-theme")}
                  showTooltip={true}
                  aria-label={__("Medium", "default-theme")}
                />
                <ToggleGroupControlOption
                  value="lg"
                  label={__("LG", "default-theme")}
                  showTooltip={true}
                  aria-label={__("Large", "default-theme")}
                />
                <ToggleGroupControlOption
                  value="xl"
                  label={__("XL", "default-theme")}
                  showTooltip={true}
                  aria-label={__("Extra Large", "default-theme")}
                />
              </ToggleGroupControl>
              {responsiveMode && (
                <div className="button-control">
                  {resMode.map((item, index) => {
                    let align = btnAlignSettings[item]["align"];
                    return (
                      <div className="col-control-wrap" id={`col-${index}`}>
                        {responsiveMode == item ? (
                          <div className="block--row__settings">
                            <ToggleGroupControl
                              label={__("Alignment", "default-theme")}
                              className="block-togglegroup default-theme-togglegroup"
                              value={align}
                              isBlock
                              onChange={onChangeAlign}>
                              <ToggleGroupControlOptionIcon
                                value="left"
                                icon={alignLeft}
                                showTooltip={true}
                                aria-label={__("Left", "default-theme")}
                              />
                              <ToggleGroupControlOptionIcon
                                value="center"
                                icon={alignCenter}
                                showTooltip={true}
                                aria-label={__("Center", "default-theme")}
                              />
                              <ToggleGroupControlOptionIcon
                                value="right"
                                icon={alignRight}
                                showTooltip={true}
                                aria-label={__("Right", "default-theme")}
                              />
                            </ToggleGroupControl>
                            <Button
                              onClick={() => resetAlignment(responsiveMode)}
                              label={__("Reset", "default-theme")}
                              className="components-button components-range-control__reset is-secondary is-small align--reset">
                              {__("Reset", "default-theme")}
                            </Button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </PanelBody>
          <PanelBody
            title={__("Additional", "default-theme")}
            initialOpen={false}>
            <TextControl
              label={__("Anchor", "default-theme")}
              placeholder={__("Specify Id…", "default-theme")}
              type="text"
              value={anchor}
              onChange={(value) => setAttributes({ anchor: value })}
            />
          </PanelBody>
        </InspectorControls>

        <BlockControls group="block">
          {!isURLSet && (
            <ToolbarButton
              name="link"
              icon={link}
              title={__("Link", "default-theme")}
              shortcut={displayShortcut.primary("k")}
              onClick={startEditing}
            />
          )}
          {isURLSet && (
            <ToolbarButton
              name="link"
              icon={linkOff}
              title={__("Unlink", "default-theme")}
              shortcut={displayShortcut.primaryShift("k")}
              onClick={unlink}
              isActive={true}
            />
          )}
        </BlockControls>
        {isSelected && (isEditingURL || isURLSet) && (
          <Popover
            onClose={() => {
              setIsEditingURL(false);
              richTextRef.current?.focus();
            }}
            anchorRef={ref?.current}
            focusOnMount={isEditingURL ? "firstElement" : false}
            __unstableSlotName={"__unstable-block-tools-after"}>
            <LinkControl
              className="wp-block-navigation-link__inline-link-input"
              value={{ url, opensInNewTab }}
              onChange={({
                url: newURL = "",
                opensInNewTab: newOpensInNewTab,
              }) => {
                setAttributes({ url: newURL });

                if (opensInNewTab !== newOpensInNewTab) {
                  onToggleOpenInNewTab(newOpensInNewTab);
                }
              }}
              onRemove={() => {
                unlink();
                richTextRef.current?.focus();
              }}
              forceIsEditingLink={isEditingURL}
            />
          </Popover>
        )}

        <a
          onClick={(e) => e.preventDefault()}
          id={anchor ? anchor : null}
          className={btnclassName}
          href={!!url ? url : null}
          target={!!linkTarget ? "_blank" : null}
          rel={relation}
          download={downloadable == true ? true : false}>

            {!!buttonicon ? (
              <>
							  <>
								  {!!buttonicon && <span {...innerBlocksProps} />}
							  </>
                <span className="button__helper">
                  <RichText
                    ref={richTextRef}
                    aria-label={__("Button text", "default-theme")}
                    placeholder={__("Lorem ipsum dolor", "default-theme")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                    withoutInteractiveFormatting={false}
                    allowedFormats={[]}
                    onReplace={onReplace}
                    onMerge={mergeBlocks}
                    identifier="text"
                  />
							  </span>
						  </>
					  ) : (
						  <span className="button__helper">
                <RichText
                  ref={richTextRef}
                  aria-label={__("Button text", "default-theme")}
                  placeholder={__("Lorem ipsum dolor", "default-theme")}
                  value={text}
                  onChange={(value) => setAttributes({ text: value })}
                  withoutInteractiveFormatting={false}
                  allowedFormats={[]}
                  onReplace={onReplace}
                  onMerge={mergeBlocks}
                  identifier="text"
                />
              </span>
            )}
        </a>
      </div>
    </>
  );
}
