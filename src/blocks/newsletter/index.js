/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import { registerBlock } from "../../utils/helper";

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="b7e79009-edcb-4f81-96c6-8e2850cfed2f" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M23.65,5.4a1.07,1.07,0,0,0-1-.08L4.5,13.83a1.07,1.07,0,0,0,0,1.94l5.75,2.52v7.16L16.49,21l5.07,2.22a1.07,1.07,0,0,0,1.49-.91l1.06-16A1.06,1.06,0,0,0,23.65,5.4ZM21,20.67l-5.61-2.46,3.38-6.6-8.14,4.52L7.53,14.76,21.87,8Z" fill="#fff"/></svg>,
	edit: (props) => {
        const [bgResponsiveMode, setbgResponsiveMode] = useState("xs");
        props.bgResponsiveMode = bgResponsiveMode;
        props.setbgResponsiveMode = setbgResponsiveMode;
		return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
	},
	save: (props) => {
		return <Save {...props} />;
	},
};

registerBlock({ metadata, name, settings });