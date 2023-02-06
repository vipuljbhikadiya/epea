/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="b630dcd7-0643-4cb1-bfab-a7374119089e" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M24.21,11.09a2.83,2.83,0,0,0-2.69-3C19.5,8,17.43,8,15.33,8h-.66c-2.1,0-4.16,0-6.18.13a2.85,2.85,0,0,0-2.7,3c-.09,1.3-.13,2.59-.13,3.89s0,2.6.13,3.9a2.84,2.84,0,0,0,2.69,3Q11.68,22,15,22c2.22,0,4.39,0,6.51-.14a2.85,2.85,0,0,0,2.7-3c.09-1.3.13-2.6.13-3.9S24.3,12.39,24.21,11.09Zm-11,7.48V11.4L18.5,15Z" fill="#fff"/></svg>,
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