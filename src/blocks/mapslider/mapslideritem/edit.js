/**
 * WordPress dependencies
 */

import { __ } from "@wordpress/i18n";
import { compose } from "@wordpress/compose";
import { Component, Platform } from "@wordpress/element";
import {
  ToolbarGroup,
  ToolbarButton,
  PanelBody,
  TextControl,
  SelectControl,
  RangeControl,
} from "@wordpress/components";
import {
  BlockControls,
  InspectorControls,
  RichText,
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
      hasContent: true,
    };

    this.hasContent = this.hasContent.bind(this);
    this.addSlide = this.addSlide.bind(this);
    this.listenSlideContentChange = 
      this.listenSlideContentChange.bind(this);
  }

  hasContent() {
    const { getBlock, clientId } = this.props;

    const innerBlocks = getBlock(clientId).innerBlocks;

    return innerBlocks.length > 0;
  }

  addSlide(position = "after") {
    const {
      insertBlock,
      getBlock,
      clientId,
      getBlockIndex,
      getBlockRootClientId,
    } = this.props;

    const rootId = getBlockRootClientId(clientId);
    const index =
      getBlockIndex(clientId, rootId) + (position === "before" ? 0 : 1);
    const block = getBlock(clientId);

    if (block) {
      const insertedBlock = createBlock("epea-theme/mapslideritem");

      insertBlock(insertedBlock, index, rootId);
    }
  }

  renderBlockControls() {
    return (
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            label={__("Add Item Before", "epea-theme")}
            onClick={() => {
              this.addSlide("before");
            }}
          >
            {__("Add Item Before", "epea-theme")}
          </ToolbarButton>
          <ToolbarButton
            label={__("Add Item After", "epea-theme")}
            onClick={() => {
              this.addSlide();
            }}
          >
            {__("Add Item After", "epea-theme")}
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
    );
  }

  listenSlideContentChange() {
    const slideContent = this.props.getBlockOrder(this.props.clientId);

    if (!this.state.hasContent && slideContent.length > 0) {
      this.setState({
        hasContent: true,
      });
    }

    if (this.state.hasContent && slideContent.length <= 0) {
      this.setState({
        hasContent: false,
      });
    }
  }

  componentDidMount() {
    this.listenSlideContentChange();

    subscribe(this.listenSlideContentChange);
  }

  render() {
    const { hasContent } = this.state;
    const { markerXPosition, markerYPosition, adress, contact, flag, ButtonLink } = 
      this.props.attributes;
    const { setAttributes } = this.props;

    const onAdressChange = (value) => {
      setAttributes({ adress: value });
    };

    const onContactChange = (value) => {
      setAttributes({ contact: value });
    };

    return (
      <div className="splide__slide">
				{this.renderBlockControls()}
        <InspectorControls>
          <PanelBody 
            title={__("Settings", "epea-theme")} 
            initialOpen={true}
          >
            <SelectControl
              label={__(
                "Pin Flag",
                "epea-theme"
              )}
              options={[
                {
                  value: "germany",
                  label: __("Germany", "epea-theme"),
                },
                {
                  value: "austria",
                  label: __("Austria", "epea-theme"),
                },
                {
                  value: "belgium",
                  label: __("Belgium", "epea-theme"),
                },
                {
                  value: "england",
                  label: __("England", "epea-theme"),
                },
                {
                  value: "luxembourg",
                  label: __("Luxembourg", "epea-theme"),
                },
                {
                  value: "netherlands",
                  label: __("Netherlands", "epea-theme"),
                },
                {
                  value: "switzerland",
                  label: __("Switzerland", "epea-theme"),
                },
              ]}
              value={flag}
              onChange={(value) =>
                setAttributes({ flag: value })
              }
            >
            </SelectControl>
            <TextControl
              label={__('Direction Link', 'epea-theme')}
              value={ButtonLink}
              onChange={(value) =>
                setAttributes({ ButtonLink: value })
              }
            />
						<RangeControl
							label={__('Marker X Position', 'gbblocks')}
							value={markerXPosition}
							onChange={(value) =>
								setAttributes({ markerXPosition: value })
							}
							min={0}
							max={100}
							initialPosition={0}
						/>
						<RangeControl
							label={__('Marker Y Position', 'gbblocks')}
							value={markerYPosition}
							onChange={(value) =>
								setAttributes({ markerYPosition: value })
							}
							min={0}
							max={100}
							initialPosition={0}
						/>
					</PanelBody>
        </InspectorControls>

        <RichText
          identifier="adress"
          tagName="span"
          className="slider-map__adress text text--align-xs-left text--color-three text--style-two"
          value={adress}
          onChange={onAdressChange}
          aria-label={__("Adress", "epea-theme")}
          placeholder={__("Lorem ipsum dolor", "epea-theme")}
          {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
          allowedFormats={["core/bold", "core/italic", "core/link"]}
        />

        <RichText
          identifier="contact"
          tagName="span"
          className="slider-map__contact text text--align-xs-left text--color-three text--style-two"
          value={contact}
          onChange={onContactChange}
          aria-label={__("Contact", "epea-theme")}
          placeholder={__("Lorem ipsum dolor", "epea-theme")}
          {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
          allowedFormats={["core/bold", "core/italic", "core/link"]}
        />

				{ButtonLink == '' ? (
          ""
        ) : (          
          <a
					href={ButtonLink}
					target="_blank"
					rel="noopener"
					class="button-default button--style-one button--width-inline button--color-six button--align-xs-left"
          >
            {__("Directions", "epea-theme")} 
          </a>
        )}
			</div>
    );
  }
}

export default compose([
  withSelect((select, props) => {
    const { getBlock, getBlockRootClientId, getBlockIndex, getBlockOrder } =
      select("core/block-editor");

    return {
      getBlock,
      getBlockRootClientId,
      getBlockIndex,
      getBlockOrder,
    };
  }),
  withDispatch((dispatch, props) => {
    const { insertBlock } = dispatch("core/block-editor");
    return {
      insertBlock,
    };
  }),
])(Edit);
