/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import {
  PanelBody,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  ToggleControl,
  SelectControl,
  RangeControl,
  Button,
  TextControl,
} from "@wordpress/components";
import { Component } from "@wordpress/element";

/***
 * Interal dependencies
 */
import { theme_colors } from "../../utils/block-helpers";

export default class Edit extends Component {
  render() {
    const {
      attributes: {
        backgroundColor,
        xlwidth,
        lgwidth,
        mdwidth,
        smwidth,
        xswidth,
        xloffset,
        lgoffset,
        mdoffset,
        smoffset,
        xsoffset,
        colPadding,
        xlalignV,
        lgalignV,
        mdalignV,
        smalignV,
        xsalignV,
        anchor,
        hideLG,
        hideMD,
        hideXS,
      },
      colResponsiveMode,
      setcolResponsiveMode,
      setAttributes,
    } = this.props;

    const resMode = ["xs", "sm", "md", "lg", "xl"];

    const colSettings = {
      xs: {
        width: xswidth,
        offset: xsoffset,
        alignV: xsalignV,
      },
      sm: {
        width: smwidth,
        offset: smoffset,
        alignV: smalignV,
      },
      md: {
        width: mdwidth,
        offset: mdoffset,
        alignV: mdalignV,
      },
      lg: {
        width: lgwidth,
        offset: lgoffset,
        alignV: lgalignV,
      },
      xl: {
        width: xlwidth,
        offset: xloffset,
        alignV: xlalignV,
      },
    };

    const onChangeWidth = (value) => {
      if (colResponsiveMode == "xl") {
        setAttributes({
          xlwidth: value !== undefined ? value : 0,
        });
      }
      if (colResponsiveMode == "lg") {
        setAttributes({
          lgwidth: value !== undefined ? value : 0,
        });
      }
      if (colResponsiveMode == "md") {
        setAttributes({
          mdwidth: value !== undefined ? value : 0,
        });
      }
      if (colResponsiveMode == "sm") {
        setAttributes({
          smwidth: value !== undefined ? value : 0,
        });
      }
      if (colResponsiveMode == "xs") {
        setAttributes({
          xswidth: value !== undefined ? value : 0,
        });
      }
    };
    const onChangeOffset = (value) => {
      if (colResponsiveMode == "xl") {
        setAttributes({
          xloffset: value !== undefined ? value : -1,
        });
      }
      if (colResponsiveMode == "lg") {
        setAttributes({
          lgoffset: value !== undefined ? value : -1,
        });
      }
      if (colResponsiveMode == "md") {
        setAttributes({
          mdoffset: value !== undefined ? value : -1,
        });
      }
      if (colResponsiveMode == "sm") {
        setAttributes({
          smoffset: value !== undefined ? value : -1,
        });
      }
      if (colResponsiveMode == "xs") {
        setAttributes({
          xsoffset: value !== undefined ? value : -1,
        });
      }
    };
    const onChangeAlignV = (value) => {
      if (colResponsiveMode == "xl") {
        setAttributes({
          xlalignV: value,
        });
      }
      if (colResponsiveMode == "lg") {
        setAttributes({
          lgalignV: value,
        });
      }
      if (colResponsiveMode == "md") {
        setAttributes({
          mdalignV: value,
        });
      }
      if (colResponsiveMode == "sm") {
        setAttributes({
          smalignV: value,
        });
      }
      if (colResponsiveMode == "xs") {
        setAttributes({
          xsalignV: value,
        });
      }
    };

    const resetColAlignV = (responsiveMode) => {
      if (responsiveMode == "xl") {
        setAttributes({
          xlalignV: "",
        });
      }
      if (responsiveMode == "lg") {
        setAttributes({
          lgalignV: "",
        });
      }
      if (responsiveMode == "md") {
        setAttributes({
          mdalignV: "",
        });
      }
      if (responsiveMode == "sm") {
        setAttributes({
          smalignV: "",
        });
      }
      if (responsiveMode == "xs") {
        setAttributes({
          xsalignV: "",
        });
      }
    };

    const SetColorClass = (value) => {
      theme_colors.filter(function (item) {
        if (item.color == value) {
          setAttributes({
            colbgClass: item.slug,
          });
        }
      });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Style", "epea-theme")} initialOpen={true}>
            <PanelColorSettings
              title={__("Background color", "epea-theme")}
              className={"block-color-setting"}
              colorSettings={[
                {
                  colors: theme_colors,
                  value: backgroundColor,
                  onChange: (value) => {
                    typeof value == "undefined"
                      ? setAttributes({ colbgClass: "" })
                      : SetColorClass(value);
                    setAttributes({
                      backgroundColor: value,
                    });
                  },
                  label: __("Color Selector", "epea-theme"),
                },
              ]}
            />
            <span className="block-seprator"></span>
            <diV className="block--row__settings block--row__col">
              <ToggleGroupControl
                label={__("Padding", "epea-theme")}
                className="block-togglegroup"
                value={colPadding}
                isBlock
                onChange={(value) => {
                  setAttributes({
                    colPadding: Number(value),
                  });
                }}>
                <ToggleGroupControlOption
                  value="0"
                  label={__("0", "epea-theme")}
                  showTooltip={true}
                  aria-label={__("0px", "epea-theme")}
                />
                <ToggleGroupControlOption
                  value="1"
                  label={__("1", "epea-theme")}
                  showTooltip={true}
                  aria-label={__("3px", "epea-theme")}
                />
                <ToggleGroupControlOption
                  value="2"
                  label={__("2", "epea-theme")}
                  showTooltip={true}
                  aria-label={__("30px", "epea-theme")}
                />
                <ToggleGroupControlOption
                  value="3"
                  label={__("3", "epea-theme")}
                  showTooltip={true}
                  aria-label={__("50px", "epea-theme")}
                />
                <ToggleGroupControlOption
                  value="4"
                  label={__("4", "epea-theme")}
                  showTooltip={true}
                  aria-label={__("50px", "epea-theme")}
                />
              </ToggleGroupControl>
              <Button
                onClick={() =>
                  setAttributes({
                    colPadding: Number(1),
                  })
                }
                label={__("Reset Padding", "epea-theme")}
                className="components-button components-range-control__reset is-secondary is-small block--reset-btn">
                {__("Reset Padding", "epea-theme")}
              </Button>
            </diV>
          </PanelBody>
          <PanelBody title={__("Settings", "epea-theme")} initialOpen={true}>
            <ToggleGroupControl
              label={__("Responsive Mode", "epea-theme")}
              className="block-togglegroup"
              value={colResponsiveMode}
              isBlock
              onChange={(value) => {
                setcolResponsiveMode(value);
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
            {colResponsiveMode && (
              <div className="col-control">
                {resMode.map((item, index) => {
                  let vAlign = colSettings[item]["alignV"];
                  let width = colSettings[item]["width"];
                  let offset = colSettings[item]["offset"];
                  return (
                    <div className="col-control-wrap" id={`col-${index}`}>
                      {colResponsiveMode == item ? (
                        <>
                          <RangeControl
                            label={__("Width", "epea-theme")}
                            value={width}
                            onChange={onChangeWidth}
                            min={0}
                            max={12}
                            allowReset={true}
                          />
                          <RangeControl
                            label={__("Offset", "epea-theme")}
                            value={offset}
                            onChange={onChangeOffset}
                            min={-1}
                            max={11}
                            allowReset={true}
                          />
                          <div className="block--row__settings">
                            <SelectControl
                              label={__(
                                "Vertical Alignment",
                                "epea-theme"
                              )}
                              options={[
                                {
                                  value: "",
                                  label: __("Not Set", "epea-theme"),
                                },
                                {
                                  value: "top",
                                  label: __("Top", "epea-theme"),
                                },
                                {
                                  value: "middle",
                                  label: __("Middle", "epea-theme"),
                                },
                                {
                                  value: "bottom",
                                  label: __("Bottom", "epea-theme"),
                                },
                              ]}
                              value={vAlign}
                              onChange={onChangeAlignV}></SelectControl>
                            <Button
                              onClick={() => resetColAlignV(colResponsiveMode)}
                              label={__("Reset", "epea-theme")}
                              className="components-button components-range-control__reset is-secondary is-small block--reset-btn">
                              {__("Reset", "epea-theme")}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </PanelBody>
          <PanelBody title={__("Additional", "epea-theme")} initialOpen={false}>
            <TextControl
              label={__("Anchor", "epea-theme")}
              placeholder={__("Specify link ID…", "epea-theme")}
              type="text"
              value={anchor}
              onChange={(value) => setAttributes({ anchor: value })}
            />
            <span className="block-seprator"></span>
            <ToggleControl
              label={__("Hide on Smartphone", "epea-theme")}
              checked={hideXS}
              onChange={() =>
                setAttributes({
                  hideXS: !hideXS,
                })
              }
            />
            <ToggleControl
              label={__("Hide on Tablet", "epea-theme")}
              checked={hideMD}
              onChange={() =>
                setAttributes({
                  hideMD: !hideMD,
                })
              }
            />
            <ToggleControl
              label={__("Hide on Desktop", "epea-theme")}
              checked={hideLG}
              onChange={() =>
                setAttributes({
                  hideLG: !hideLG,
                })
              }
            />
          </PanelBody>
        </InspectorControls>
      </>
    );
  }
}
