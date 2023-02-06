/**
 * WordPress dependencies
 */
import { postContent as icon } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import metadata from "./block.json";
import edit from "./edit";

/***
 * Styles
 */

import "./styles/editor.scss";

import { registerBlock } from "../../utils/helper";

const { name, title } = metadata;

const settings = {
  title,
  icon,
  edit,
};

registerBlock({ metadata, name, settings });
