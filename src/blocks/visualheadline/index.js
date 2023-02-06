/**
 * WordPress dependencies
 */
 import { __ } from "@wordpress/i18n";

 /**
  * Internal dependencies
  */
 import edit from "./edit";
 import save from "./save";
 import metadata from "./block.json";
 import { registerBlock } from "../../utils/helper";
 
 const { name } = metadata;
 
 const settings = {
	 icon: <svg xmlns="http://www.w3.org/2000/svg" id="f3bb16bc-8150-4104-bae0-c151d120dea7" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M16.05,5.48H19a.41.41,0,0,1,.46.47v18.1a.41.41,0,0,1-.46.47H16.05a.41.41,0,0,1-.46-.47V16.71a.14.14,0,0,0-.16-.16h-6a.14.14,0,0,0-.16.16v7.34a.42.42,0,0,1-.46.47H5.94a.41.41,0,0,1-.46-.47V6a.41.41,0,0,1,.46-.47H8.85A.42.42,0,0,1,9.31,6V13.1a.14.14,0,0,0,.16.16h6a.14.14,0,0,0,.16-.16V6A.41.41,0,0,1,16.05,5.48Z" fill="#fff"/><path d="M22.86,15.56h1.45c.14,0,.21.07.21.22V24.3a.19.19,0,0,1-.21.22H22.94a.2.2,0,0,1-.22-.22v-7a.09.09,0,0,0,0-.07s0,0-.06,0l-1.13.23h-.05a.17.17,0,0,1-.19-.19v-1a.24.24,0,0,1,.17-.24l1.16-.46A.76.76,0,0,1,22.86,15.56Z" fill="#fff"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><path d="M11,21.8v1.68a.29.29,0,0,1-.33.33H8.11c-.08,0-.11,0-.11.12v2.49a.29.29,0,0,1-.33.33H6a.29.29,0,0,1-.33-.33V23.93c0-.08,0-.12-.11-.12H3a.29.29,0,0,1-.33-.33V21.8A.29.29,0,0,1,3,21.47H5.56c.07,0,.11,0,.11-.12V18.79A.29.29,0,0,1,6,18.46H7.67a.29.29,0,0,1,.33.33v2.56c0,.08,0,.12.11.12h2.54A.29.29,0,0,1,11,21.8Z" fill="#fff"/></svg>,
   edit,
   save,
 };
 registerBlock({ metadata, name, settings });
 