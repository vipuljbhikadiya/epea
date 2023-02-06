/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  InnerBlocks,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useState } from "@wordpress/element";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import "./styles/editor.scss";
import metadata from "./block.json";
import rowClasses from "./rowClasses";
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="b6ae3bff-8808-4476-a8ee-2257f767a6ee" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="8.03" y="8.79" width="5.81" height="12.43" fill="#fff"/><rect x="16.16" y="8.79" width="5.81" height="12.43" fill="#fff"/><path d="M26.41,25.28H3.59V4.72H26.41Zm-20.82-2H24.41V6.72H5.59Z" fill="#037cbb"/></svg>,
  /**
   * @see ./edit.js
   */
  edit: (props) => {
    const rowclass = classnames(`row`, ...rowClasses(props.attributes));

    const { getBlockOrder } = useSelect((select) => {
      return select("core/block-editor") || select("core/editor");
    });

    props.hasChildBlocks = getBlockOrder(props.clientId).length;

    const renderappender = props.hasChildBlocks
      ? undefined
      : () => <InnerBlocks.ButtonBlockAppender />;

    const innerBlocksProps = useInnerBlocksProps(
      { className: rowclass },
      {
        allowedBlocks: ["epea-theme/column"],
        renderAppender: renderappender,
      }
    );

    const [rowResponsiveMode, setrowResponsiveMode] = useState("xs");
    props.rowResponsiveMode = rowResponsiveMode;
    props.setrowResponsiveMode = setrowResponsiveMode;

    return (
      <div
        id={props.attributes.anchor ? `${props.attributes.anchor}` : null}
        {...useBlockProps({
          className: classnames(
            `row-wrapper`,
            `${props.attributes.rowExtraClass}`,
            props.attributes.contentwidth == true ? " row-wrapper--ct-wd" : "",
            `${props.attributes.extraclass}`
          ),
        })}>
        <Edit {...props} />

        <div {...innerBlocksProps} />
      </div>
    );
  },
  save: (props) => {
    return <Save {...props} />;
  },
};
registerBlock({ metadata, name, settings });
