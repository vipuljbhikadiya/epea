/**
 * external dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { registerBlockCollection, getCategories } from "@wordpress/blocks";
import { Inserter } from "@wordpress/block-editor";
import { Icon, plus } from "@wordpress/icons";
import { Button } from "@wordpress/components";

/**
 * Determine if the block attributes are empty.
 *
 * @param {Object} attributes The block attributes to check.
 * @return {boolean} The empty state of the attributes passed.
 */
export const hasEmptyAttributes = (attributes) => {
  return !Object.entries(attributes)
    .map(([, value]) => {
      if (typeof value === "string") {
        value = value.trim();
      }

      if (value instanceof Array) {
        value = value.length;
      }

      if (value instanceof Object) {
        value = Object.entries(value).length;
      }

      return !!value;
    })
    .filter((value) => value === true).length;
};

/**
 * Return bool depending on registerBlockCollection compatibility.
 *
 * @return {boolean} Value to indicate function support.
 */
export const supportsCollections = () => {
  if (typeof registerBlockCollection === "function") {
    return true;
  }
  return false;
};

/**
 * Check for which category to assign.
 *
 * @return {boolean} Value to indicate function support.
 */
export const hasFormattingCategory = getCategories().some(function (category) {
  return category.slug === "formatting";
});

export const theme_colors = [
  {
    name: "Black",
    slug: "one",
    color: "#000",
  },
  {
    name: "White",
    slug: "two",
    color: "#fff",
  },
  {
    name: "Dark Grey",
    slug: "three",
    color: "#575756",
  },
  {
    name: "Light Grey",
    slug: "four",
    color: "#E3E3E3",
  },
  {
    name: "Dark Green",
    slug: "five",
    color: "#49725B",
  },
  {
    name: "Light Green",
    slug: "six",
    color: "#8ABD7D",
  },
  {
    name: "Blue",
    slug: "seven",
    color: "#169DB8",
  },
];

export const ButtonBlockAppender = ({ rootClientId, label }, ref) => {
  return (
    <Inserter
      rootClientId={rootClientId}
      buttonText="Add Block"
      renderToggle={({ onToggle, disabled, hasSingleBlockType }) => {
        const isToggleButton = !hasSingleBlockType;
        let inserterButton = (
          <Button
            ref={ref}
            className={classnames("my-button-block-appender")}
            onClick={onToggle}
            disabled={disabled}
            label={label}>
            <Icon icon={plus} />
            {label}
          </Button>
        );
        return inserterButton;
      }}
      isAppender
    />
  );
};
