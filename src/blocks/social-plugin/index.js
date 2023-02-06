/**
 * WordPress dependencies
 */
import { registerPlugin } from "@wordpress/plugins";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import edit from "./edit";
import "./styles/editor.scss";

registerPlugin("social-postmeta-fields", {
  render: edit,
});
