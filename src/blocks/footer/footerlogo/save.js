/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal Dependencies
 */
import Logo from "../../../assets/images/logo.svg";

export default function Save({}) {

  return (
    <div className="image">
      <picture>
        <img src={Logo} alt="EPEA - Part of Dress &uuml; Sommer - Logo" />
      </picture>
    </div>
  );
}