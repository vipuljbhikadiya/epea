/**
 * External dependencies
 */

 import classnames from "classnames";

 /**
  * Wordpress dependencies
  */
 
 import { __ } from "@wordpress/i18n";
 import {
   InnerBlocks,
   useBlockProps,
   useInnerBlocksProps,
   store as blockEditorStore,
   InspectorControls,
 } from "@wordpress/block-editor";
 import { PanelBody, TextControl } from "@wordpress/components";
 import { useSelect } from "@wordpress/data";
 
 export default function edit({ clientId, attributes, setAttributes }) {
	 
   const { extraClass } = attributes;
 
   const blockProps = useBlockProps();
 
   const ALLOWED_BLOCKS = ["epea-theme/footercolumn"];
 
   const { hasInnerBlocks } = useSelect(
     (select) => {
       const { getBlock } = select(blockEditorStore);
       const block = getBlock(clientId);
       return {
         hasInnerBlocks: !!(block && block.innerBlocks.length),
       };
     },
     [clientId]
   );
 
   const renderappender = hasInnerBlocks
     ? undefined
     : () => <InnerBlocks.ButtonBlockAppender />;
 
   const innerBlocksProps = useInnerBlocksProps(
     {
      className: `footer-section ${extraClass}`
     },
     { allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
   );
 
   return (
     <div {...blockProps}>
       <div {...innerBlocksProps} />
     </div>
   );
 }
 