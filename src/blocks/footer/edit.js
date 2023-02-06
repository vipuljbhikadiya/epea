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

  const BLOCK_TEMPLATE = [
		['epea-theme/footersection', { 
      extraClass: 'footer-section--main'
    }, [
			
      ['epea-theme/footercolumn', { 
        extraClass: 'footer-column--one'
      }, [

        ['epea-theme/footerlogo'],
        
        ['epea-theme/paragraph', {
          textColor: '#575756',
          textColorClass: 'three',
          textStyle: 'three'
        }, ],

      ], ],

      ['epea-theme/footercolumn', { 
        extraClass: 'footer-column--two'
      }, [

        ['epea-theme/headline', {
          level: 'span',
					headColor: '#49725B',
          headColorClass: 'five',
          headStyle: 'six'
        }, ],

        ['epea-theme/navigation'],

      ], ],

      ['epea-theme/footercolumn', { 
        extraClass: 'footer-column--three'
      }, [

        ['epea-theme/headline', {
          level: 'span',
					headColor: '#49725B',
          headColorClass: 'five',
          headStyle: 'six'
        }, ],

        ['epea-theme/navigation'],

      ], ],

      ['epea-theme/footercolumn', { 
        extraClass: 'footer-column--four'
      }, [

        ['epea-theme/headline', {
          level: 'span',
					headColor: '#49725B',
          headColorClass: 'five',
          headStyle: 'six'
        }, ],

        ['epea-theme/navigation'],

      ], ],

      ['epea-theme/footercolumn', { 
        extraClass: 'footer-column--five'
      }, [

        ['epea-theme/headline', {
          level: 'span',
					headColor: '#49725B',
          headColorClass: 'five',
          headStyle: 'six'
        }, ],

        ['epea-theme/navigation'],

      ], ],
    
    ],],

    ['epea-theme/footersection', { 
      extraClass: 'footer-section--meta'
    }, [

      ['epea-theme/button', {
        style: 'two',
        bgcolorClass: 'five',
        bgcolor: '#49725B'
      }, ],

      ['epea-theme/divider', {
        dividerColor: '575756',
        dividerColorClass: 'three',
        paddingTop: '',
        paddingBottom: ''
      }, ],

      ['epea-theme/footercolumn', { 
        extraClass: 'footer-column--one'
      }, [

        ['epea-theme/icon', {
          iconColor: '#49725B',
          iconColorClass: 'five',
          iconbgColor: '',
          iconbgColorClass: '',
          iconClass: 'icon-01-visual'
        }, ],

        ['epea-theme/icon', {
          iconColor: '#49725B',
          iconColorClass: 'five',
          iconbgColor: '',
          iconbgColorClass: '',
          iconClass: 'icon-01-visual'
        }, ],

        ['epea-theme/icon', {
          iconColor: '#49725B',
          iconColorClass: 'five',
          iconbgColor: '',
          iconbgColorClass: '',
          iconClass: 'icon-01-visual'
        }, ],

        ['epea-theme/icon', {
          iconColor: '#49725B',
          iconColorClass: 'five',
          iconbgColor: '',
          iconbgColorClass: '',
          iconClass: 'icon-01-visual'
        }, ],

        ['epea-theme/icon', {
          iconColor: '#49725B',
          iconColorClass: 'five',
          iconbgColor: '',
          iconbgColorClass: '',
          iconClass: 'icon-01-visual'
        }, ],

        ['epea-theme/icon', {
          iconColor: '#49725B',
          iconColorClass: 'five',
          iconbgColor: '',
          iconbgColorClass: '',
          iconClass: 'icon-01-visual'
        }, ],

        ['epea-theme/icon', {
          iconColor: '#49725B',
          iconColorClass: 'five',
          iconbgColor: '',
          iconbgColorClass: '',
          iconClass: 'icon-01-visual'
        }, ],

      ], ],
      
    ],],

    ['epea-theme/footersection', { 
      extraClass: 'footer-section--bottom'
    }, [
    
      ['epea-theme/paragraph', {
        textColor: '#575756',
        textColorClass: 'three',
        textStyle: 'three'
      }, ],

      ['epea-theme/navigation'],

    ],],

  ];

 
   const blockProps = useBlockProps();
 
   const ALLOWED_BLOCKS = ["epea-theme/footersection"];
 
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
 
   const innerBlocksProps = useInnerBlocksProps(
     {
       className: "footer__helper",
     },
     {
        allowedBlocks: ALLOWED_BLOCKS,
        template: BLOCK_TEMPLATE,
        templateLock: 'all',
      }
   );
 
   return (
     <div {...blockProps}>
       <div {...innerBlocksProps} />
     </div>
   );
 }
 