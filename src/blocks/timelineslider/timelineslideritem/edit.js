/**
 * WordPress dependencies
 */
 import { __ } from "@wordpress/i18n";
 import { compose } from "@wordpress/compose";
 import { Component } from "@wordpress/element";
 import {
   PanelBody,
   TextControl,
   ToolbarGroup,
   ToolbarButton,
 } from "@wordpress/components";
 import {
   BlockControls,
   InspectorControls,
   InnerBlocks,
 } from "@wordpress/block-editor";
 import { withSelect, withDispatch, subscribe } from "@wordpress/data";
 import { createBlock } from "@wordpress/blocks";
 
 /**
  * Internal dependencies
  */
 import Placeholder from "./placeholder";
 
 /**
  * Create an Component
  */
 const ALLOWED_BLOCKS = [ "epea-theme/icon", "epea-theme/headline", "epea-theme/paragraph" ];
 
 const BLOCK_TEMPLATE = [
	[
		'epea-theme/icon',
		{
			iconColor: '#49725B',
			iconColorClass: 'five',
			iconbgColor: '#ffffff',
			iconbgColorClass: 'two',
		},
	],
	[
		'epea-theme/headline',
		{
			level: 'span',
			headColor: '#575756',
			headColorClass: 'three',
			headStyle: 'four',
			placeholder: __('Add Title', 'epea-theme'),
		},
	],
	[
		'epea-theme/paragraph',
		{
			tag: 'span',
			textColor: '#575756',
			textColorClass: 'three',
			textStyle: 'two',
			placeholder: __('Add Description', 'epea-theme'),
		},
	],
];

 class Edit extends Component {
   constructor() {
     super(...arguments);
 
     this.state = {
       hasContent: true,
     };
 
     this.hasContent = this.hasContent.bind(this);
     this.addSlide = this.addSlide.bind(this);
     this.listenSlideContentChange = this.listenSlideContentChange.bind(this);
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
       const insertedBlock = createBlock("epea-theme/timelineslideritem");
 
       insertBlock(insertedBlock, index, rootId);
     }
   }
 
   renderBlockControls() {
     return (
       <BlockControls>
         <ToolbarGroup>
           <ToolbarButton
             label={__("Add Slide Before", "epea-theme")}
             onClick={() => {
               this.addSlide("before");
             }}>
             {__("Add Slide Before", "epea-theme")}
           </ToolbarButton>
           <ToolbarButton
             label={__("Add Slide After", "epea-theme")}
             onClick={() => {
               this.addSlide();
             }}>
             {__("Add Slide After", "epea-theme")}
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
     const { year } = this.props.attributes;
     const { setAttributes } = this.props;
 
    return (
      <div className="slider-timeline__item splide__slide">
        {this.renderBlockControls()}
        <InspectorControls>
          <PanelBody title={__("Settings", "epea-theme")} initialOpen={true}>
            <TextControl
              className="block-mt"
              label={__("Year", "epea-theme")}
              type="text"
              placeholder="1987"
              value={year}
              onChange={(value) => setAttributes({ year: value })}
            />
          </PanelBody>
        </InspectorControls>

        <div className="slider-timeline__detail">
					<InnerBlocks
						template={BLOCK_TEMPLATE}
						templateLock={true}
						templateInsertUpdatesSelection={true}
						allowedBlocks={ALLOWED_BLOCKS}
					/>
				</div>
			</div>
    );
  }
}
 
export default compose([
  withSelect((select, props) => {
    const { getBlock, getBlockRootClientId, getBlockIndex, getBlockOrder } =
      select("core/block-editor");
    const { getMedia } = select("core");
    const { imageId } = props.attributes;

    return {
      getBlock,
      getBlockRootClientId,
      getBlockIndex,
      getBlockOrder,
      Image: imageId ? getMedia(imageId) : null,
    };
  }),
  withDispatch((dispatch, props) => {
    const { insertBlock } = dispatch("core/block-editor");
    return {
      insertBlock,
    };
  }),
])(Edit);
 