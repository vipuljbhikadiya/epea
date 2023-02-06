/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
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
import colClasses from "./colClasses";
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="e5594fba-959c-4e5d-8699-2c8819162145" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="8.03" y="8.79" width="5.81" height="12.43" fill="#037cbb"/><rect x="16.16" y="8.79" width="5.81" height="12.43" fill="#fff"/><path d="M26.41,25.28H3.59V4.72H26.41Zm-20.82-2H24.41V6.72H5.59Z" fill="#fff"/></svg>,
  /**
   * @see ./edit.js
   */
  edit: (props) => {
    const ALLOWED_BLOCKS = [
      "epea-theme/headline",
      "epea-theme/paragraph",
      "epea-theme/button",
      "epea-theme/list",
      "epea-theme/image",
      "epea-theme/quote",
      "epea-theme/divider",
      "epea-theme/icon",
      "epea-theme/box",
    ];

    const bgclass = props.attributes.colbgClass
      ? `col--bg-${props.attributes.colbgClass}`
      : "";

    const { getBlockOrder } = useSelect((select) => {
      return select("core/block-editor") || select("core/editor");
    });

    props.hasChildBlocks = getBlockOrder(props.clientId).length;

    const renderappender = props.hasChildBlocks
      ? undefined
      : () => <InnerBlocks.ButtonBlockAppender />;
    const innerBlocksProps = useInnerBlocksProps(
      {
        className: "col__content",
      },
      { allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
    );

    const blockProps = useBlockProps({
      className: classnames(
        `col`,
        ...colClasses(props.attributes),
        "" !== props.attributes.colExtraClass
          ? props.attributes.colExtraClass
          : null,
        "" !== bgclass ? `${bgclass}` : null
      ),
    });

    const [colResponsiveMode, setcolResponsiveMode] = useState("xs");
    props.colResponsiveMode = colResponsiveMode;
    props.setcolResponsiveMode = setcolResponsiveMode;

    return (
      <div
        id={props.attributes.anchor ? `${props.attributes.anchor}` : null}
        {...blockProps}>
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
