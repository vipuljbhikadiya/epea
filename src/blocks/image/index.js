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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="baad9677-7cce-4fc1-b389-ec0d88614ec2" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><polygon points="20.31 9.66 12.2 19.65 8.89 14.78 2.27 24.51 8.89 24.51 15.51 24.51 27.73 24.51 20.31 9.66" fill="#fff"/><circle cx="10.78" cy="8.64" r="3.15" fill="#fff"/></svg>,
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
