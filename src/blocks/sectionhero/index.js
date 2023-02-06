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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="a71a21db-02b3-48dd-af86-3a4a1c2c169b" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><polygon points="25.78 25.22 18.78 25.22 18.78 23.22 23.78 23.22 23.78 18.22 25.78 18.22 25.78 25.22" fill="#fff"/><polygon points="11.23 25.22 4.23 25.22 4.23 18.22 6.23 18.22 6.23 23.22 11.23 23.22 11.23 25.22" fill="#fff"/><polygon points="6.23 12.22 4.23 12.22 4.23 5.22 11.23 5.22 11.23 7.22 6.23 7.22 6.23 12.22" fill="#fff"/><polygon points="25.78 12.22 23.78 12.22 23.78 7.22 18.78 7.22 18.78 5.22 25.78 5.22 25.78 12.22" fill="#fff"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><g id="b5f76881-a557-45e1-a768-21f676e1e12a" data-name="Layer 2"><path d="M6.84,19.37c-3,0-4.51,2.9-4.57,3l-.11.2.1.21c.07.12,1.56,3,4.58,3s4.5-2.9,4.56-3l.1-.21-.1-.2C11.34,22.27,9.86,19.37,6.84,19.37Zm0,5.54A4.58,4.58,0,0,1,3.21,22.6a4.58,4.58,0,0,1,3.63-2.31,4.57,4.57,0,0,1,3.62,2.31A4.57,4.57,0,0,1,6.84,24.91Z" fill="#fff"/><path d="M6.84,21.07A1.54,1.54,0,1,0,8.37,22.6,1.53,1.53,0,0,0,6.84,21.07Z" fill="#fff"/></g></svg>,
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