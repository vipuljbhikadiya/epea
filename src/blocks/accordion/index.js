/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
/**
 * Internal dependencies
 */
import "./styles/editor.scss";
import edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="ab68d431-18d3-4d43-b4ec-28a8115a1d3e" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.98" y="7.67" width="22.03" height="5.76" fill="#fff"/><path d="M19.51,9.32l0,0,2.36,2.71a.45.45,0,0,0,.34.15.45.45,0,0,0,.33-.15l2.36-2.71,0,0A.3.3,0,0,0,25,9.16a.28.28,0,0,0-.29-.27h-5a.28.28,0,0,0-.29.27A.28.28,0,0,0,19.51,9.32Z" fill="#037cbb"/><rect x="3.98" y="16.56" width="22.03" height="5.76" fill="#fff"/><path d="M19.51,18.21l0,0L21.9,21a.45.45,0,0,0,.34.15.45.45,0,0,0,.33-.15l2.36-2.71,0-.05a.25.25,0,0,0,.05-.15.28.28,0,0,0-.29-.27h-5a.28.28,0,0,0-.29.27A.3.3,0,0,0,19.51,18.21Z" fill="#037cbb"/></svg>,
  edit,
  save,
};

registerBlock({ metadata, name, settings });