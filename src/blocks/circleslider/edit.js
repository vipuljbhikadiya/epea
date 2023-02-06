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
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import {
  BlockControls,
  InnerBlocks,
  InspectorControls,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { withSelect, withDispatch, subscribe } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

/**
 * External dependencies
 */
import classnames from "classnames";
import { isEqual } from "lodash";

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
      const insertedBlock = createBlock("epea-theme/circleslideritem");
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
          const { headline, description } = item.attributes;

          const InnerBlocksProps = {
            attributes: {
              headline,
              description,
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
      attributes: { innerItem, anchor, style },
      hasinnerBlocksProps,
      setAttributes,
      hasInnerBlocksLength,
    } = this.props;

    var isaddItem = true;
    if (style == "big" && hasInnerBlocksLength >= 8) {
      isaddItem = false;
    } else {
      if (style == "small" && hasInnerBlocksLength >= 6) {
        isaddItem = false;
      }
    }

    var loopIndex = 0;
    if (style == "big") {
      if (hasInnerBlocksLength <= 6) {
        loopIndex = 3;
      } else {
        loopIndex = 4;
      }
    } else {
      loopIndex = 4;
    }

    const innerBlocksAttributes = this.state.innerBlocksAttributes;

    if (
      innerBlocksAttributes.length > 0 &&
      !isEqual(innerItem, innerBlocksAttributes)
    ) {
      setAttributes({ innerItem: [...innerBlocksAttributes] });
    }

    const tabsContent = (index, item) => {
      return (
        <div class="slider-circle__item" role="presentation">
          <a
            href={
              "#" +
              item.attributes.headline
                .replace(/[^a-zA-Z ]/g, "")
                .split(" ")
                .join("")
            }
            class={classnames(
              "slider-circle__link",
              index === this.state.activeItemIndex
                ? " slider-circle__link--active"
                : ""
            )}
            id={
              item.attributes.headline
                .replace(/[^a-zA-Z ]/g, "")
                .split(" ")
                .join("") + "-tab"
            }
            data-index={index}
            onClick={(e) => {
              e.preventDefault();
              this.activateSlide(index);
            }}>
            <h4 class="headline headline--style-three">
              {item.attributes.headline}
            </h4>
            <span className="slider-circle__separator"></span>
            <p class="text text--style-three">{item.attributes.description}</p>
          </a>
        </div>
      );
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Style", "epea-theme")} initialOpen={true}>
            <ToggleGroupControl
              label={__("Slider size", "epea-theme")}
              className="block-togglegroup"
              value={style}
              isBlock
              onChange={(value) => {
                setAttributes({
                  style: value,
                });
              }}>
              <ToggleGroupControlOption
                value="big"
                label={__("Big", "epea-theme")}
                showTooltip={true}
                aria-label={__("Big", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="small"
                label={__("Small", "epea-theme")}
                showTooltip={true}
                aria-label={__("Small", "epea-theme")}
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

        <div
          id={anchor ? anchor : null}
          className={classnames(
            `slider-circle`,
            "" != style ? `slider-circle--${style}` : null
          )}
          ref={this.myRef}>
          <div className="row-wrapper">
            {isaddItem == true && (
              <BlockControls>
                <ToolbarGroup>
                  <ToolbarButton
                    label={__("Add Item", "epea-theme")}
                    onClick={this.addSlide}>
                    {__("Add Item", "epea-theme")}
                  </ToolbarButton>
                </ToolbarGroup>
              </BlockControls>
            )}
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

            <div class="row">
              <div class="slider-circle__tabs">
                {innerItem && (
                  <>
                    {innerItem.map((item, index) => {
                      if (index >= loopIndex) {
                        return false;
                      }
                      return tabsContent(index, item);
                    })}
                  </>
                )}
              </div>
              {((style == "big" && innerItem.length > loopIndex) ||
                (style == "small" && innerItem.length > loopIndex)) && (
                <div class="slider-circle__tabs">
                  {innerItem.map((item, index) => {
                    if (style == "big" && index >= loopIndex) {
                      return tabsContent(index, item);
                    }
                    if (style == "small" && index >= loopIndex) {
                      return tabsContent(index, item);
                    }
                  })}
                </div>
              )}
              <div className="slider-circle__content">
                <InnerBlocks
                  template={[["epea-theme/circleslideritem", {}]]}
                  allowedBlocks={["epea-theme/circleslideritem"]}
                  templateLock={false}
                  renderAppender={() => {
                    return "";
                  }}
                  orientation="horizontal"
                />
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
    const block = getBlock(props.clientId);
    const hasInnerBlocks = block.innerBlocks.length;

    const innerBlocksProps = useInnerBlocksProps(
      { className: "slider-circle__content" },
      {
        allowedBlocks: ["epea-theme/circleslideritem"],
        renderAppender: false,
      }
    );

    return {
      getBlock,
      getBlockIndex,
      getBlockOrder,
      hasSelectedInnerBlock,
      getSelectedBlockClientId,
      getSelectedBlock,
      hasInnerBlocksLength: hasInnerBlocks,
      hasinnerBlocksProps: innerBlocksProps,
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
