/**
 * Return row Dynamic generated Classes
 */

function rowClasses(attributes) {
  const {
    xlAlignH,
    lgAlignH,
    mdAlignH,
    smAlignH,
    xsAlignH,
    xlAlignV,
    lgAlignV,
    mdAlignV,
    smAlignV,
    xsAlignV,
    xlReverseCol,
    lgReverseCol,
    mdReverseCol,
    smReverseCol,
    xsReverseCol,
    colheight,
    colgap,
  } = attributes;

  let rowClasses = "";

  // Horizontal
  if (
    xsAlignH == smAlignH &&
    smAlignH == mdAlignH &&
    mdAlignH == lgAlignH &&
    lgAlignH == xlAlignH
  ) {
    rowClasses += xsAlignH != "" ? " row--xs-" + xsAlignH : "";
  } else {
    if (xsAlignH) {
      rowClasses += xsAlignH != "" ? " row--xs-" + xsAlignH : "";
    }
    if (smAlignH) {
      if (smAlignH != xsAlignH) {
        rowClasses += smAlignH != "" ? " row--sm-" + smAlignH : "";
      }
    }
    if (mdAlignH) {
      if (mdAlignH != smAlignH) {
        rowClasses += mdAlignH != "" ? " row--md-" + mdAlignH : "";
      }
    }
    if (lgAlignH) {
      if (lgAlignH != mdAlignH) {
        rowClasses += lgAlignH != "" ? " row--lg-" + lgAlignH : "";
      }
    }
    if (xlAlignH) {
      if (xlAlignH != lgAlignH) {
        rowClasses += xlAlignH != "" ? " row--xl-" + xlAlignH : "";
      }
    }
  }

  // vertical
  if (
    xsAlignV == smAlignV &&
    smAlignV == mdAlignV &&
    mdAlignV == lgAlignV &&
    lgAlignV == xlAlignV
  ) {
    rowClasses += xsAlignV != "" ? " row--xs-" + xsAlignV : "";
  } else {
    if (xsAlignV) {
      rowClasses += xsAlignV != "" ? " row--xs-" + xsAlignV : "";
    }
    if (smAlignV) {
      if (smAlignV != xsAlignV) {
        rowClasses += smAlignV != "" ? " row--sm-" + smAlignV : "";
      }
    }
    if (mdAlignV) {
      if (mdAlignV != smAlignV) {
        rowClasses += mdAlignV != "" ? " row--md-" + mdAlignV : "";
      }
    }
    if (lgAlignV) {
      if (lgAlignV != mdAlignV) {
        rowClasses += lgAlignV != "" ? " row--lg-" + lgAlignV : "";
      }
    }
    if (xlAlignV) {
      if (xlAlignV != lgAlignV) {
        rowClasses += xlAlignV != "" ? " row--xl-" + xlAlignV : "";
      }
    }
  }

  rowClasses += xlReverseCol == true ? " row--xl-rv" : " row--xl-cr";
  rowClasses += lgReverseCol == true ? " row--lg-rv" : " row--lg-cr";
  rowClasses += mdReverseCol == true ? " row--md-rv" : " row--md-cr";
  rowClasses += smReverseCol == true ? " row--sm-rv" : " row--sm-cr";
  rowClasses += xsReverseCol == true ? " row--xs-rv" : " row--xs-cr";


  if (colheight == true) {
    rowClasses += " row--col-ht";
  }

  rowClasses += colgap ? ` row--gap-${colgap}` : "";

  return [rowClasses];
}
export default rowClasses;
