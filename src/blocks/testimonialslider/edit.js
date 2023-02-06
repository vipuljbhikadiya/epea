/**
 * External dependencies
 */

import { isEqual } from "lodash";

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
 * Internal dependencies
 */

import Navigation from "./navigation";

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

    this.myRef = createRef();
  }

  addSlide() {
    const { insertBlock, getBlock, clientId } = this.props;

    let innerBlocks;
    const block = getBlock(clientId);

    if (block) {
      const insertedBlock = createBlock("epea-theme/heroslide");
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
          marker.classList.remove("active");
          var marker_index = marker.getAttribute("data-index");

          if (marker_index == index) {
            marker.classList.add("active");
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

  render() {
    const { anchor } = this.props.attributes;
    const { setAttributes } = this.props;

    return (
      <>
        <InspectorControls>
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
        <div
          id={anchor ? anchor : null}
          className="slider-testimonial"
          ref={this.myRef}>
          <BlockControls>
            <ToolbarGroup>
              <ToolbarButton
                label={__("Add Hero Image Slide", "epea-theme")}
                onClick={this.addSlide}>
                {__("Add Hero Image Slide", "epea-theme")}
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
          <div className="splide splide--testimonial">
            <div className="splide__track">
              <div className="splide__list">
                <InnerBlocks
                  template={[["epea-theme/testimonialslide", {}]]}
                  allowedBlocks={["epea-theme/testimonialslide"]}
                  templateLock={false}
                  renderAppender={() => {
                    return "";
                  }}
                  orientation="horizontal"
                />
              </div>
              <div className="splide__arrows">
                <button
                  className="splide__arrow splide__arrow--prev"
                  disabled={this.state.activeSlideIndex === 0}
                  onClick={() => {
                    this.activateSlide(this.state.activeSlideIndex - 1);
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>
                </button>
                <button
                  className="splide__arrow splide__arrow--next"
                  disabled={
                    this.state.activeSlideIndex === this.state.slidesCount - 1
                  }
                  onClick={() => {
                    this.activateSlide(this.state.activeSlideIndex + 1);
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>
                </button>
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
