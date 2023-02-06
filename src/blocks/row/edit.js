/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  ToggleControl,
  SelectControl,
  Button,
  TextControl,
} from "@wordpress/components";
import { Component } from "@wordpress/element";

export default class Edit extends Component {
  render() {
    const {
      attributes: {
        xlAlignH,
        lgAlignH,
        mdAlignH,
        smAlignH,
        xsAlignH,
        xlAlignV,
        lgAlignV,
        mdAlignV,
        smAlignV,
        xsAlignV,
        xlReverseCol,
        lgReverseCol,
        mdReverseCol,
        smReverseCol,
        xsReverseCol,
        colheight,
        contentwidth,
        colgap,
        anchor,
      },
      rowResponsiveMode,
      setrowResponsiveMode,
      setAttributes,
    } = this.props;

    const resMode = ["xs", "sm", "md", "lg", "xl"];

    const rowSettings = {
      xs: {
        alignH: xsAlignH,
        alignV: xsAlignV,
      },
      sm: {
        alignH: smAlignH,
        alignV: smAlignV,
      },
      md: {
        alignH: mdAlignH,
        alignV: mdAlignV,
      },
      lg: {
        alignH: lgAlignH,
        alignV: lgAlignV,
      },
      xl: {
        alignH: xlAlignH,
        alignV: xlAlignV,
      },
    };

    const updateHAlign = (value) => {
      if (rowResponsiveMode == "xl") {
        setAttributes({
          xlAlignH: value,
        });
      }
      if (rowResponsiveMode == "lg") {
        setAttributes({
          lgAlignH: value,
        });
      }
      if (rowResponsiveMode == "md") {
        setAttributes({
          mdAlignH: value,
        });
      }
      if (rowResponsiveMode == "sm") {
        setAttributes({
          smAlignH: value,
        });
      }
      if (rowResponsiveMode == "xs") {
        setAttributes({
          xsAlignH: value,
        });
      }
    };
    const updateVAlign = (value) => {
      if (rowResponsiveMode == "xl") {
        setAttributes({
          xlAlignV: value,
        });
      }
      if (rowResponsiveMode == "lg") {
        setAttributes({
          lgAlignV: value,
        });
      }
      if (rowResponsiveMode == "md") {
        setAttributes({
          mdAlignV: value,
        });
      }
      if (rowResponsiveMode == "sm") {
        setAttributes({
          smAlignV: value,
        });
      }
      if (rowResponsiveMode == "xs") {
        setAttributes({
          xsAlignV: value,
        });
      }
    };

    const resetHAlignment = (responsiveMode) => {
      if (responsiveMode == "xl") {
        setAttributes({
          xlAlignH: "",
        });
      }
      if (responsiveMode == "lg") {
        setAttributes({
          lgAlignH: "",
        });
      }
      if (responsiveMode == "md") {
        setAttributes({
          mdAlignH: "",
        });
      }
      if (responsiveMode == "sm") {
        setAttributes({
          smAlignH: "",
        });
      }
      if (responsiveMode == "xs") {
        setAttributes({
          xsAlignH: "",
        });
      }
    };

    const resetVAlignment = (responsiveMode) => {
      if (responsiveMode == "xl") {
        setAttributes({
          xlAlignV: "",
        });
      }
      if (responsiveMode == "lg") {
        setAttributes({
          lgAlignV: "",
        });
      }
      if (responsiveMode == "md") {
        setAttributes({
          mdAlignV: "",
        });
      }
      if (responsiveMode == "sm") {
        setAttributes({
          smAlignV: "",
        });
      }
      if (responsiveMode == "xs") {
        setAttributes({
          xsAlignV: "",
        });
      }
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("Settings", "epea-theme")} initialOpen={true}>
            <ToggleGroupControl
              label={__("Responsive Mode", "epea-theme")}
              className="block-togglegroup"
              value={rowResponsiveMode}
              isBlock
              onChange={(value) => {
                setrowResponsiveMode(value);
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
            {rowResponsiveMode && (
              <div className="row-control">
                {resMode.map((item, index) => {
                  let horizontalAlign = rowSettings[item]["alignH"];
                  let verticalAlign = rowSettings[item]["alignV"];
                  return (
                    <div className="row-control-wrap" id={`row-${index}`}>
                      {rowResponsiveMode == item ? (
                        <>
                          <div className="block--row__settings">
                            <SelectControl
                              label={__(
                                "Horizontal Alignment",
                                "epea-theme"
                              )}
                              options={[
                                {
                                  value: "",
                                  label: __("Not Set", "epea-theme"),
                                },
                                {
                                  value: "start",
                                  label: __("Start", "epea-theme"),
                                },
                                {
                                  value: "center",
                                  label: __("Center", "epea-theme"),
                                },
                                {
                                  value: "end",
                                  label: __("End", "epea-theme"),
                                },
                              ]}
                              value={horizontalAlign}
                              onChange={updateHAlign}></SelectControl>
                            <Button
                              onClick={() => resetHAlignment(rowResponsiveMode)}
                              label={__("Reset", "epea-theme")}
                              className="components-button components-range-control__reset is-secondary is-small">
                              {__("Reset", "epea-theme")}
                            </Button>
                          </div>
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
                              value={verticalAlign}
                              onChange={updateVAlign}></SelectControl>
                            <Button
                              onClick={() => resetVAlignment(rowResponsiveMode)}
                              label={__("Reset", "epea-theme")}
                              className="components-button components-range-control__reset is-secondary is-small">
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
            <label className="block--label">{__("Order", "epea-theme")}</label>
            <div className="block--row__settings">
              {rowResponsiveMode == "xl" && (
                <>
                  <ToggleControl
                    label={__("Reverse", "epea-theme")}
                    checked={xlReverseCol}
                    onChange={() =>
                      setAttributes({
                        xlReverseCol: !xlReverseCol,
                      })
                    }
                  />
                  <Button
                    onClick={() =>
                      setAttributes({
                        xlReverseCol: false,
                      })
                    }
                    label={__("Reset", "epea-theme")}
                    className="components-button components-range-control__reset is-secondary is-small">
                    {__("Reset", "epea-theme")}
                  </Button>
                </>
              )}
              {rowResponsiveMode == "lg" && (
                <>
                  <ToggleControl
                    label={__("Reverse", "epea-theme")}
                    checked={lgReverseCol}
                    onChange={() =>
                      setAttributes({
                        lgReverseCol: !lgReverseCol,
                      })
                    }
                  />
                  <Button
                    onClick={() =>
                      setAttributes({
                        lgReverseCol: false,
                      })
                    }
                    label={__("Reset", "epea-theme")}
                    className="components-button components-range-control__reset is-secondary is-small">
                    {__("Reset", "epea-theme")}
                  </Button>
                </>
              )}
              {rowResponsiveMode == "md" && (
                <>
                  <ToggleControl
                    label={__("Reverse", "epea-theme")}
                    checked={mdReverseCol}
                    onChange={() =>
                      setAttributes({
                        mdReverseCol: !mdReverseCol,
                      })
                    }
                  />
                  <Button
                    onClick={() =>
                      setAttributes({
                        mdReverseCol: false,
                      })
                    }
                    label={__("Reset", "epea-theme")}
                    className="components-button components-range-control__reset is-secondary is-small">
                    {__("Reset", "epea-theme")}
                  </Button>
                </>
              )}
              {rowResponsiveMode == "sm" && (
                <>
                  <ToggleControl
                    label={__("Reverse", "epea-theme")}
                    checked={smReverseCol}
                    onChange={() =>
                      setAttributes({
                        smReverseCol: !smReverseCol,
                      })
                    }
                  />
                  <Button
                    onClick={() =>
                      setAttributes({
                        smReverseCol: false,
                      })
                    }
                    label={__("Reset", "epea-theme")}
                    className="components-button components-range-control__reset is-secondary is-small">
                    {__("Reset", "epea-theme")}
                  </Button>
                </>
              )}
              {rowResponsiveMode == "xs" && (
                <>
                  <ToggleControl
                    label={__("Reverse", "epea-theme")}
                    checked={xsReverseCol}
                    onChange={() =>
                      setAttributes({
                        xsReverseCol: !xsReverseCol,
                      })
                    }
                  />
                  <Button
                    onClick={() =>
                      setAttributes({
                        xsReverseCol: false,
                      })
                    }
                    label={__("Reset", "epea-theme")}
                    className="components-button components-range-control__reset is-secondary is-small">
                    {__("Reset", "epea-theme")}
                  </Button>
                </>
              )}
            </div>
            <span className="block-seprator"></span>
            <label className="block--label">{__("Column Height", "epea-theme")}</label>
            <ToggleControl
              label={__("Same Height", "epea-theme")}
              checked={colheight}
              onChange={() =>
                setAttributes({
                  colheight: !colheight,
                })
              }
            />
            <label className="block--label">{__("Content Width", "epea-theme")}</label>
            <ToggleControl
              label={__("Limited Width", "epea-theme")}
              checked={contentwidth}
              onChange={() =>
                setAttributes({
                  contentwidth: !contentwidth,
                })
              }
            />
            <ToggleGroupControl
              label={__("Column Gap", "epea-theme")}
              className="block-togglegroup"
              value={colgap}
              isBlock
              onChange={(value) => {
                setAttributes({
                  colgap: Number(value),
                });
              }}>
              <ToggleGroupControlOption
                value="0"
                label={__("0", "epea-theme")}
                showTooltip={true}
                aria-label={__("Small", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="1"
                label={__("1", "epea-theme")}
                showTooltip={true}
                aria-label={__("Medium", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="2"
                label={__("2", "epea-theme")}
                showTooltip={true}
                aria-label={__("Large", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="3"
                label={__("3", "epea-theme")}
                showTooltip={true}
                aria-label={__("Extra Large", "epea-theme")}
              />
            </ToggleGroupControl>
          </PanelBody>
          <PanelBody title={__("Additional", "epea-theme")} initialOpen={false}>
            <TextControl
              label={__("Anchor", "epea-theme")}
              placeholder={__("Specify ID…", "epea-theme")}
              type="text"
              value={anchor}
              onChange={(value) => setAttributes({ anchor: value })}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  }
}
