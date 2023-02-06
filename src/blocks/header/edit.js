/**
 * WordPress dependencies
 */
 import { __ } from "@wordpress/i18n";
 import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
 import { useEffect, useRef } from "@wordpress/element";
 
 /**
  * Internal dependencies
  */
 import sitelogo from "../../assets/images/logo.svg";
 
 export default function edit({ attributes }) {
   const humberger = useRef();
   const TEMPLATE = [["epea-theme/navigation"],["epea-theme/headerlanguage"]];
   useEffect(() => {
     const { ownerDocument } = humberger.current;
     var element = ownerDocument.getElementById('header__nav-btn')
     var menu = ownerDocument.querySelector('.header__container');
     element.addEventListener("click", (event) => {
       menu.classList.toggle("is--active");
       element.classList.toggle("is--active");
     });
   }, []);
 
  return (
    <>
      <div className="header__backend-helper">
        <div className="header__container">
          <div class="header__logo">
            <a href={attributes.site_url}>
              <img
                src={sitelogo}
                alt="EPEA - Part of Dress &uuml; Sommer - Logo"
              />
            </a>
          </div>
          <div className="header__nav">
            <InnerBlocks template={TEMPLATE} />
            <span id="header__nav-btn" class="header__nav-btn" ref={humberger}>
              <span>Toggle menu</span>
            </span>
          </div>
        </div>
      </div>
    </>
	);
}
 