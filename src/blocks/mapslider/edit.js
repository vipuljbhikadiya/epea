/**
 * External dependencies
 */

import { isEqual, isEmpty } from "lodash";

/**
 * Internal dependencies
 */

import Navigation from "./navigation";
import MapImage from "../../assets/images/epea-europe-map.svg";

import PinAustria from "../../assets/images/epea-pins-austria.svg";
import PinBelgium from "../../assets/images/epea-pins-belgium.svg";
import PinEngland from "../../assets/images/epea-pins-england.svg";
import PinGermany from "../../assets/images/epea-pins-germany.svg";
import PinLuxembourg from "../../assets/images/epea-pins-luxembourg.svg";
import PinNetherlands from "../../assets/images/epea-pins-netherlands.svg";
import PinSwitzerland from "../../assets/images/epea-pins-switzerland.svg";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { compose } from "@wordpress/compose";
import { Component, createRef } from "@wordpress/element";
import {
  ToolbarGroup,
  ToolbarButton,
  TextControl,
  PanelBody,
} from "@wordpress/components";
import {
  BlockControls,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { withSelect, withDispatch, subscribe } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

/**
 * Create an Component
 */
class Edit extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      activeSlideIndex: 0,
      activeSlideID: "",
      slidesCount: 0,
      slidesOrder: [],
      innerBlocksAttributes: [],
    };

    this.addSlide = this.addSlide.bind(this);
    this.activateSlide = this.activateSlide.bind(this);
    this.getSelectedSlide = this.getSelectedSlide.bind(this);
    this.listenSlidesChange = this.listenSlidesChange.bind(this);
    this.isSlidesOrderChanged = this.isSlidesOrderChanged.bind(this);
    this.isSlidesSelectionUpdated = this.isSlidesSelectionUpdated.bind(this);
    this.updateChildBlockattributes =
      this.updateChildBlockattributes.bind(this);

    this.myRef = createRef();
  }

  addSlide() {
    const { insertBlock, getBlock, clientId } = this.props;

    let innerBlocks;
    const block = getBlock(clientId);

    if (block) {
      const insertedBlock = createBlock("epea-theme/mapslideritem");
      innerBlocks = block.innerBlocks;
      insertBlock(insertedBlock, innerBlocks.length, clientId);
    }
  }

  activateSlide(index) {
    const { clientId, getBlockOrder } = this.props;
    const blocksOrder = getBlockOrder(clientId);
    const activeSlideID = blocksOrder[index] || blocksOrder[0];

    this.setState({
      slidesOrder: blocksOrder,
      activeSlideID: activeSlideID,
      activeSlideIndex: index,
      slidesCount: blocksOrder.length,
    });

    if (this.myRef) {
      if (this.myRef.current !== null) {
        const { ownerDocument } = this.myRef.current;
        const { defaultView } = ownerDocument;

        blocksOrder.forEach((blockId) => {
          defaultView.document
            .getElementById(`block-${blockId}`)
            ?.setAttribute("data-hidden", true);
        });

        defaultView.document
          .getElementById(`block-${activeSlideID}`)
          ?.removeAttribute("data-hidden");

        const markers = defaultView.document.querySelectorAll(".marker");
        markers.forEach((marker) => {
          marker.classList.remove("slider-map__marker--active");
          var marker_index = marker.getAttribute("data-index");

          if (marker_index == index) {
            marker.classList.add("slider-map__marker--active");
          }
        });
      }
    }
  }

  getSelectedSlide() {
    const { clientId, hasSelectedInnerBlock, getSelectedBlock } = this.props;

    if (hasSelectedInnerBlock(clientId)) {
      return getSelectedBlock();
    }

    return null;
  }

  getIndexOfSelectedSlide() {
    const { clientId, getBlockIndex } = this.props;
    const selectedSlide = this.getSelectedSlide();

    return selectedSlide ? getBlockIndex(selectedSlide.clientId, clientId) : 0;
  }

  listenSlidesChange() {
    if (this.isSlidesOrderChanged() || this.isSlidesSelectionUpdated()) {
      this.activateSlide(this.getIndexOfSelectedSlide());
    }
    this.updateChildBlockattributes();
  }

  isSlidesOrderChanged() {
    const newSlidesOrder = this.props.getBlockOrder(this.props.clientId);

    return !isEqual(this.state.slidesOrder, newSlidesOrder);
  }

  isSlidesSelectionUpdated() {
    const { clientId, hasSelectedInnerBlock, getSelectedBlockClientId } =
      this.props;

    const hasSelectedSlide = hasSelectedInnerBlock(clientId);
    const selectedBlockId = getSelectedBlockClientId();

    return hasSelectedSlide && selectedBlockId !== this.state.activeSlideID;
  }

  componentDidMount() {
    this.activateSlide(0);
    subscribe(this.listenSlidesChange);
  }

  updateChildBlockattributes() {
    const { select } = window.wp.data;
    const { clientId, setAttributes } = this.props;
    if (clientId) {
      const innerBlocksOuter = select("core/block-editor").getBlock(clientId);
      if (innerBlocksOuter) {
        const innerBlocksItems = innerBlocksOuter.innerBlocks;
        let new_attributes = [];

        innerBlocksItems.forEach(function (item, index) {
          const { markerXPosition, markerYPosition, flag } = item.attributes;

          const InnerBlocksProps = {
            attributes: {
              markerXPosition,
              markerYPosition,
              flag,
            },
          };
          new_attributes.push(InnerBlocksProps);
        });

        const { innerBlocksAttributes } = this.state;

        if (!isEqual(innerBlocksAttributes, new_attributes)) {
          this.setState({
            innerBlocksAttributes: new_attributes,
          });
        }
      }
    }
  }

  render() {
    const {
      attributes: { innerItem, anchor },
      setAttributes,
    } = this.props;
    const innerBlocksAttributes = this.state.innerBlocksAttributes;
    if (
      innerBlocksAttributes.length > 0 &&
      !isEqual(innerItem, innerBlocksAttributes)
    ) {
      setAttributes({ innerItem: [...innerBlocksAttributes] });
    }

    return (
      <>
        <InspectorControls>
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

        <div
          id={anchor ? anchor : null}
          className="slider-map"
          ref={this.myRef}>
          <BlockControls>
            <ToolbarGroup>
              <ToolbarButton
                label={__("Add Item", "epea-theme")}
                onClick={this.addSlide}>
                {__("Add Item", "epea-theme")}
              </ToolbarButton>
            </ToolbarGroup>
          </BlockControls>

          <Navigation
            addSlide={this.addSlide}
            activateSlide={this.activateSlide}
            activeSlideIndex={this.state.activeSlideIndex}
            activeSlideID={this.state.activeSlideID}
            slidesCount={this.state.slidesCount}
            slidesOrder={this.state.slidesOrder}
            selectBlock={this.props.selectBlock}
            isEditActive={this.props.isSelected}
          />

          <div className="slider-map__wrapper">
            <div className="slider-map__visual">
              <div className="slider-map__visual-helper">
                {innerItem && (
                  <>
                    <img
                      src={MapImage}
                      alt="epea map"
                      className="slider-map__background"
                      loading="lazy"
                    />
                    {innerItem.map((item, index) => {
                      let style = {};
                      let flagPin = {};
                      if (!isEmpty(item)) {
                        style = {
                          left: item.attributes.markerXPosition + "%",
                          top: item.attributes.markerYPosition + "%",
                        };
                        {
                          item.attributes.flag === "austria"
                            ? (flagPin = (
                                <img src={PinAustria} loading="lazy" />
                              ))
                            : item.attributes.flag === "belgium"
                            ? (flagPin = (
                                <img src={PinBelgium} loading="lazy" />
                              ))
                            : item.attributes.flag === "england"
                            ? (flagPin = (
                                <img src={PinEngland} loading="lazy" />
                              ))
                            : item.attributes.flag === "germany"
                            ? (flagPin = (
                                <img src={PinGermany} loading="lazy" />
                              ))
                            : item.attributes.flag === "luxembourg"
                            ? (flagPin = (
                                <img src={PinLuxembourg} loading="lazy" />
                              ))
                            : item.attributes.flag === "netherlands"
                            ? (flagPin = (
                                <img src={PinNetherlands} loading="lazy" />
                              ))
                            : item.attributes.flag === "switzerland"
                            ? (flagPin = (
                                <img src={PinSwitzerland} loading="lazy" />
                              ))
                            : "";
                        }
                      }
                      return (
                        <div
                          data-index={index}
                          data-id={"marker--" + index}
                          className={
                            "slider-map__marker" +
                            (index === this.state.activeSlideIndex
                              ? " slider-map__marker--active"
                              : "")
                          }
                          style={style}>
                          {flagPin}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="slider-map__locations">
              <div class="list-link">
                <div class="list-link__item">
                  <div class="list-link__helper">
                    <div class="icon icon--bgcolor-six icon--color-two">
                      <div class="icon__helper"></div>
                      <i class="icon__visual icon-01-visual"></i>
                    </div>
                    <span class="headline headline--align-xs-left headline--style-seven headline--color-three">
                      {__("Contact Details", "gbblocks")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="splide splide--map">
                <div className="splide__track">
                  <div className="splide__list"></div>
                  <InnerBlocks
                    template={[["epea-theme/mapslideritem", {}]]}
                    allowedBlocks={["epea-theme/mapslideritem"]}
                    templateLock={false}
                    renderAppender={() => {
                      return "";
                    }}
                    orientation="horizontal"
                  />
                </div>
                <div class="splide__arrows">
                  <button
                    class="splide__arrow splide__arrow--prev"
                    type="button"
                    aria-label="Go to last slide"
                    aria-controls="rewind-example-track">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 11.762 21.714"
                      aria-hidden="true">
                      <g
                        id="Group_254"
                        data-name="Group 254"
                        transform="translate(-1606.977 -1340.643)">
                        <line
                          id="Line_7"
                          data-name="Line 7"
                          x2="10.142"
                          y2="10.363"
                          transform="translate(1607.677 1361.642) rotate(-90)"
                          fill="none"
                          stroke="#000000"
                          stroke-width="2"></line>
                        <line
                          id="Line_8"
                          data-name="Line 8"
                          x1="10.142"
                          y2="10.363"
                          transform="translate(1607.677 1351.5) rotate(-90)"
                          fill="none"
                          stroke="#000000"
                          stroke-width="2"></line>
                      </g>
                    </svg>
                  </button>
                  <button
                    class="splide__arrow splide__arrow--next"
                    type="button"
                    aria-label="Next slide"
                    aria-controls="rewind-example-track">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 11.762 21.714"
                      aria-hidden="true">
                      <g
                        id="Group_254"
                        data-name="Group 254"
                        transform="translate(-1606.977 -1340.643)">
                        <line
                          id="Line_7"
                          data-name="Line 7"
                          x2="10.142"
                          y2="10.363"
                          transform="translate(1607.677 1361.642) rotate(-90)"
                          fill="none"
                          stroke="#000000"
                          stroke-width="2"></line>
                        <line
                          id="Line_8"
                          data-name="Line 8"
                          x1="10.142"
                          y2="10.363"
                          transform="translate(1607.677 1351.5) rotate(-90)"
                          fill="none"
                          stroke="#000000"
                          stroke-width="2"></line>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default compose([
  withSelect((select, props) => {
    const {
      getBlock,
      getBlockIndex,
      getBlockOrder,
      hasSelectedInnerBlock,
      getSelectedBlockClientId,
      getSelectedBlock,
    } = select("core/block-editor");

    return {
      getBlock,
      getBlockIndex,
      getBlockOrder,
      hasSelectedInnerBlock,
      getSelectedBlockClientId,
      getSelectedBlock,
    };
  }),
  withDispatch((dispatch, props) => {
    const {
      updateBlockAttributes,
      insertBlock,
      selectNextBlock,
      selectPreviousBlock,
      selectBlock,
    } = dispatch("core/block-editor");

    return {
      insertBlock,
      updateBlockAttributes,
      selectNextBlock,
      selectPreviousBlock,
      selectBlock,
    };
  }),
])(Edit);
