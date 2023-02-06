/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import metadata from "./block.json";
import { registerBlock } from "../../utils/helper";

import "./styles/editor.scss";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="a9fef07d-302f-4746-9166-5ec09138f52e" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><polygon points="20.31 9.66 12.2 19.65 8.89 14.78 2.27 24.51 8.89 24.51 15.51 24.51 27.73 24.51 20.31 9.66" fill="#fff"/><circle cx="10.78" cy="8.64" r="3.15" fill="#fff"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><path d="M11,21.8v1.68a.29.29,0,0,1-.33.33H8.11c-.08,0-.11,0-.11.12v2.49a.29.29,0,0,1-.33.33H6a.29.29,0,0,1-.33-.33V23.93c0-.08,0-.12-.11-.12H3a.29.29,0,0,1-.33-.33V21.8A.29.29,0,0,1,3,21.47H5.56c.07,0,.11,0,.11-.12V18.79A.29.29,0,0,1,6,18.46H7.67a.29.29,0,0,1,.33.33v2.56c0,.08,0,.12.11.12h2.54A.29.29,0,0,1,11,21.8Z" fill="#fff"/></svg>,
  /**
   * @see ./edit.js
   */
  edit: (props) => {
    return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
  },
  save: (props) => {
    return <Save {...props} />;
  },
};
registerBlock({ metadata, name, settings });
