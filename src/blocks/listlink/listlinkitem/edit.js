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
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
 import { ArrowIcon } from "../../../utils/block-icons";

export default function edit({ clientId, attributes, setAttributes }) {
	 
   const { itemLink } = attributes;
 
   const BLOCK_TEMPLATE = [
		['epea-theme/icon', {
      iconColor: "#FFFFFF",
      iconColorClass: "two",
      iconbgColor: "#8ABD7D",
			iconbgColorClass: "six"
    }],
    ['epea-theme/headline', { 
      level: "span",
			headStyle: "seven",
			headColor: "#575756",
			headColorClass: "three",
    }],
  ];

   const blockProps = useBlockProps();
 
   const ALLOWED_BLOCKS = ["epea-theme/headline", "epea-theme/icon"];
 
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
      className: `list-link__helper`
     },
     {
        allowedBlocks: ALLOWED_BLOCKS,
        template: BLOCK_TEMPLATE,
        templateLock: 'all',
        renderAppender: renderappender
      }
   );

  const unlink = () => {
    setAttributes({
      itemLink: undefined
    });
  };
 
   return (
     <div {...blockProps}>
        <InspectorControls>
          <PanelBody
            title={__("Link", "epea-theme")}
            initialOpen={true}>
            <div className="gb--link-control">
              <LinkControl
                searchInputPlaceholder="Search here..."
                value={itemLink}
                settings={[
                  {
                    id: "opensInNewTab",
                    title: "Open in new Tab",
                  },
                ]}
                onChange={(newLink) => setAttributes({ itemLink: newLink })}
								onRemove={() => {
									unlink();
								}}
                withCreateSuggestion={true}
                createSuggestion={(inputValue) =>
                  setAttributes({
                    post: {
                      ...itemLink,
                      title: inputValue,
                      type: "custom-url",
                      id: Date.now(),
                      url: inputValue,
                    },
                  })
                }></LinkControl>
              </div>
            </PanelBody>
        </InspectorControls>

        {undefined == itemLink ? (
          <div className="list-link__item">
            <div {...innerBlocksProps} />
          </div>
        ) : (
          <a
            onClick={(e) => e.preventDefault()}
            href={itemLink.url}
            target={itemLink.opensInNewTab == true ? `_blank` : null}
            rel={itemLink.opensInNewTab ? "noopener" : null}
            className="list-link__item"
          >
            <div {...innerBlocksProps} />
            <ArrowIcon />
          </a>
        )}

     </div>
   );
 }
 