/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="e5edfce9-7991-4c7b-8d5a-711ddea6c807" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.25" y="3.25" width="23.51" height="23.51" rx="3.29" fill="#3c3c3b"/><g id="bc106296-eac6-4f89-8e0d-e6a67ec8ac18" data-name="icons"><g id="b844828e-3bd6-4faa-ba92-94ce6c45cc7f" data-name="save"><path d="M14.44,19.05a.74.74,0,0,0,1.16,0L20,14.49c.36-.36,0-.94-.58-.94h-2.9s.15-3.33,0-5.07a1.45,1.45,0,0,0-2.89,0c-.15,1.67,0,5.07,0,5.07h-2.9a.64.64,0,0,0-.58,1Z" fill="#fff"/><path d="M20.09,20.79H10a1.45,1.45,0,0,0-1.45,1.45h0a.68.68,0,0,0,.72.72H20.81a.69.69,0,0,0,.73-.72h0A1.45,1.45,0,0,0,20.09,20.79Z" fill="#fff"/></g></g><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><rect x="3.13" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="3.13" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/></svg>,
	edit,
	save: (props) => {
		return null;
	},
};

registerBlock({ metadata, name, settings });
