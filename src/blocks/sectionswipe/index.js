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
import "./styles/editor.scss";
import metadata from "./block.json";
import { registerBlock } from "../../utils/helper";
 
const { name } = metadata;

export { metadata, name };
 
export const settings = {
 icon: <svg xmlns="http://www.w3.org/2000/svg" id="f9d0f3cb-4db3-4724-b8fb-efeb779cee1e" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><polygon points="25.78 25.22 18.78 25.22 18.78 23.22 23.78 23.22 23.78 18.22 25.78 18.22 25.78 25.22" fill="#fff"/><polygon points="11.23 25.22 4.23 25.22 4.23 18.22 6.23 18.22 6.23 23.22 11.23 23.22 11.23 25.22" fill="#fff"/><polygon points="6.23 12.22 4.23 12.22 4.23 5.22 11.23 5.22 11.23 7.22 6.23 7.22 6.23 12.22" fill="#fff"/><polygon points="25.78 12.22 23.78 12.22 23.78 7.22 18.78 7.22 18.78 5.22 25.78 5.22 25.78 12.22" fill="#fff"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><path d="M10,25.38c-3.53.26-4.2-3.48-4.2-3.48a5.52,5.52,0,0,0-3.05-3.33,5.76,5.76,0,1,0,8.8,7.36A1.76,1.76,0,0,0,10,25.38Z" fill="#fff"/></svg>,
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