/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks, RichText } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { ArrowIcon } from "../../../utils/block-icons";

export default class Save extends Component {
  render() {
    const {
      attributes: { iconClass, content },
    } = this.props;
    return (
      <div className="accordion-item">
        <button className="accordion-item__header">
          <div className="icon icon--bgcolor-six icon--color-two ">
            <div className="icon__helper"></div>
            <i className={classnames("icon__visual", "" !== iconClass ? iconClass : null)}></i>
          </div>
          <RichText.Content
            tagName="span"
            className="headline headline--align-xs-left headline--style-seven headline--color-three"
            value={content}
          />
          <ArrowIcon />
        </button>
        <div className={`accordion-item__content`}>
          <div className="accordion-item__content-helper">  
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    );
  }
}
