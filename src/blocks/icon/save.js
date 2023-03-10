/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";

export default class Save extends Component {
  render() {
    const {
      attributes: { iconColorClass, iconClass, iconbgColorClass, iconbgClass, iconLink, anchor },
    } = this.props;

    const iconcolorclass = iconColorClass
      ? ` icon--color-${iconColorClass}`
      : "";

    const iconbgcolorclass = iconbgColorClass
      ? ` icon--bgcolor-${iconbgColorClass}`
      : "";

    const iconClasses = `${iconbgcolorclass}${iconcolorclass}`;

    return (
      <>
        {undefined == iconLink ? (
          <div
            id={anchor ? `${anchor}` : null}
            class={`icon ${iconClasses}`}>
            <div class="icon__helper"></div>
            <i class={`icon__visual ${iconClass}`}></i>
          </div>
        ) : (
          <a
            href={iconLink.url}
            target={iconLink.opensInNewTab == true ? `_blank` : null}
            rel={iconLink.opensInNewTab ? "noopener" : null}
            className={`icon icon--link ${iconClasses}`}
            id={anchor ? `${anchor}` : null}>
            <div class="icon__helper"></div>
            <i class={`icon__visual ${iconClass}`}></i>
          </a>
        )}
      </>
    );
  }
}
