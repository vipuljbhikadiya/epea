/**
 * External dependencies
 */
import classnames from "classnames";
import { map } from "lodash";

/**
 * wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  RichText,
  InnerBlocks,
  InspectorControls,
  useInnerBlocksProps,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, Button, Tooltip } from "@wordpress/components";
import { withSelect, useSelect } from "@wordpress/data";
import { Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";

/**
 * Internal dependencies
 */
import { ArrowIcon } from "../../../utils/block-icons";
import Icons from "../../icon/icon.json";

class Edit extends Component {
  constructor(props) {
    super(...arguments);
    this.toggle = this.toggle.bind(this);

    this.state = {
      icons: Icons,
      isOpen: false,
      keyword: "",
    };
  }

  search(keyword) {
    let filtered = [];

    map(Icons, (icon) => {
      if (icon.toLowerCase().search(keyword.toLowerCase()) !== -1) {
        filtered.push(icon);
      }
    });

    this.setState({ keyword, icons: filtered });
  }

  toggle() {
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));

    this.setState({ keyword: "", icons: Icons });

    const selection = window.getSelection();
    anchorRange = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    //onChange( toggleFormat( value, { type: name } ) );
  }

  customResizeIcons() {
    var elements = document.getElementsByClassName("icon__visual");
    if (elements.length < 0) {
      return;
    }
    var _len = elements.length;
    for (var _i = 0; _i < _len; _i++) {
      var el = elements[_i];
      var elWidth = el.offsetWidth;
      var iconSize = elWidth * 0.9;
      var iconSizeRounded = Math.round(iconSize / 2) * 2;
      el.style.fontSize = iconSizeRounded + "px";
    }
  }

  render() {
    const { icons, keyword } = this.state;
    const {
      attributes: { iconClass, content },
      hasinnerBlocksProps,
      setAttributes,
      mergeBlocks, 
      onReplace,
    } = this.props;

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Icon", "epea-theme")} initialOpen={true}>
            <TextControl
              value={keyword}
              placeholder={__("Search", "epea-theme")}
              onChange={(newKeyword) => {
                this.search(newKeyword);
              }}
            />
            <div className="epea-theme-icon-panel">
              {icons.length > 0 ? (
                <ul className="epea-theme-icon-list">
                  {iconClass && (
                    <li data-key={iconClass} className="selectedicon">
                      <Tooltip text={iconClass}>
                        <Button
                          onClick={() => {
                            setAttributes({
                              iconClass: iconClass,
                            });
                          }}>
                          <i className={iconClass} aria-hidden="true"></i>
                        </Button>
                      </Tooltip>
                    </li>
                  )}

                  {map(icons, (icon) => {
                    return (
                      <li data-key={icon}>
                        <Tooltip text={icon}>
                          <Button
                            onClick={() => {
                              setAttributes({
                                iconClass: icon,
                              });
                            }}>
                            <i className={icon} aria-hidden="true"></i>
                          </Button>
                        </Tooltip>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>{__("No characters found.", "block-options")}</p>
              )}
            </div>
          </PanelBody>
        </InspectorControls>
        <>
          <button className="accordion-item__header">
            <div class="icon icon--bgcolor-six icon--color-two ">
              <div class="icon__helper"></div>
              <i className={classnames("icon__visual", "" !== iconClass ? iconClass : null)}></i>
            </div>
            <RichText
              tagName="span"
              className="headline headline--align-xs-left headline--style-seven headline--color-three"
              aria-label={__("Accordion title", "default-theme")}
              placeholder={__("Lorem ipsum dolor sit amet", "default-theme")}
              value={content}
              onChange={(value) => setAttributes({ content: value })}
              withoutInteractiveFormatting={false}
              allowedFormats={[]}
              onReplace={onReplace}
              onMerge={mergeBlocks}
              identifier="text"
            />
            <ArrowIcon />
          </button>
          <div className="accordion-item__content"> 
            <div {...hasinnerBlocksProps} />
          </div>
        </>
      </>
    );
  }
}
export default compose(
  withSelect((select, props) => {
    const { clientId } = props;

    const ALLOWED_BLOCKS = [
      "epea-theme/headline",
      "epea-theme/paragraph",
      "epea-theme/image",
      "epea-theme/list",
      "epea-theme/quote",
      "epea-theme/button",
      "epea-theme/icon",
    ];

    const { hasInnerBlocks } = useSelect(
      (select) => {
        const { getBlock } = select(blockEditorStore);
        const block = getBlock(clientId);
        return {
          hasInnerBlocks: block.innerBlocks.length,
        };
      },
      [clientId]
    );

    const renderappender = hasInnerBlocks
      ? undefined
      : () => <InnerBlocks.ButtonBlockAppender />;
    
      const innerBlocksProps = useInnerBlocksProps(
        { className: "accordion-item__content-helper" },
        { allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
      );

      return {
        hasinnerBlocksProps: innerBlocksProps,
      };
    })
)(Edit);