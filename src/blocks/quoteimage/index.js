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

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="aa4893fb-b9a2-46f0-8684-0ec2e38c7f75" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><circle cx="9.35" cy="9.05" r="4.16" fill="#3c3c3b"/><path d="M30,26.71v-.16L21.93,10.39,11.22,23.58,6.85,17.16l-6.8,10A3.28,3.28,0,0,0,3.29,30H26.71A3.29,3.29,0,0,0,30,26.71Z" fill="#3c3c3b"/><path d="M14.91,10.74a.54.54,0,0,1,0,.53l-2.66,7.66a.73.73,0,0,1-.79.55H8.6a.58.58,0,0,1-.51-.2A.59.59,0,0,1,8,18.73l1.66-7.62a.67.67,0,0,1,.72-.59h4A.59.59,0,0,1,14.91,10.74Zm7,0a.54.54,0,0,1,0,.53l-2.7,7.66a.73.73,0,0,1-.79.55H15.54a.58.58,0,0,1-.51-.22.6.6,0,0,1-.08-.53l1.74-7.62a.67.67,0,0,1,.72-.59h4A.59.59,0,0,1,21.93,10.74Z" fill="#fff"/></svg>,
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
