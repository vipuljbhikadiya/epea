/**
 * Return Jnext Timeline Block Dynamic generated Classes
 */

function colClasses(attributes) {
  const {
    xlwidth,
    lgwidth,
    mdwidth,
    smwidth,
    xswidth,
    xloffset,
    lgoffset,
    mdoffset,
    smoffset,
    xsoffset,
    colPadding,
    xlalignV,
    lgalignV,
    mdalignV,
    smalignV,
    xsalignV,
    hideLG,
    hideMD,
    hideXS,
  } = attributes;

  let colClasses = "";

  // col width
  //IF XS is set ---------------------------------------------------------
  if (xswidth != 0) {
    colClasses += " col--xs-" + xswidth;
  } else {
    colClasses += " col--xs-12";
  }

  //IF SM is set ---------------------------------------------------------
  if (smwidth != 0) {
    //IF XS is set
    if (xswidth != 0) {
      //IF SM is unequal XS
      if (smwidth != xswidth) {
        colClasses += " col--sm-" + smwidth;
      }
    }

    //IF XS is notset
    else {
      // IF SM is unequal 12
      if (smwidth != 12) {
        colClasses += " col--sm-" + smwidth;
      }
    }
  }

  //IF MD is set ---------------------------------------------------------
  if (mdwidth != 0) {
    //IF SM is set
    if (smwidth != 0) {
      //IF MD is unequal SM
      if (mdwidth != smwidth) {
        colClasses += " col--md-" + mdwidth;
      }
    }

    //IF SM is notset
    else {
      //IF XS is set
      if (xswidth != 0) {
        //IF MD is unequal XS
        if (mdwidth != xswidth) {
          colClasses += " col--md-" + mdwidth;
        }

        //IF XS is default
      } else {
        // IF MD is unequal 12
        if (mdwidth != 12) {
          colClasses += " col--md-" + mdwidth;
        }
      }
    }
  }

  //IF LG is set ---------------------------------------------------------
  if (lgwidth != 0) {
    //IF MD is set
    if (mdwidth != 0) {
      //IF LG is unequal MD
      if (lgwidth != mdwidth) {
        colClasses += " col--lg-" + lgwidth;
      }
    }

    //IF MD is notset
    else {
      //IF SM is set
      if (smwidth != 0) {
        //IF LG is unequal SM
        if (lgwidth != smwidth) {
          colClasses += " col--lg-" + lgwidth;
        }

        //IF SM is notset
      } else {
        //IF XS is set
        if (xswidth != 0) {
          //IF LG is unequal XS
          if (lgwidth != xswidth) {
            colClasses += " col--lg-" + lgwidth;
          }

          //IF XS is default
        } else {
          // IF LG is unequal 12
          if (lgwidth != 12) {
            colClasses += " col--lg-" + lgwidth;
          }
        }
      }
    }
  }

  //IF XL is set ---------------------------------------------------------
  if (xlwidth != 0) {
    //IF LG is set
    if (lgwidth != 0) {
      //IF XL is unequal LG
      if (xlwidth != lgwidth) {
        colClasses += " col--xl-" + xlwidth;
      }
    }

    //IF LG is notset
    else {
      //IF MD is set
      if (mdwidth != 0) {
        //IF XL is unequal MD
        if (xlwidth != mdwidth) {
          colClasses += " col--xl-" + xlwidth;
        }
      }

      //IF MD is notset
      else {
        //IF SM is set
        if (smwidth != 0) {
          //IF XL is unequal SM
          if (xlwidth != smwidth) {
            colClasses += " col--xl-" + xlwidth;
          }

          //IF SM is notset
        } else {
          //IF XS is set
          if (xswidth != 0) {
            //IF XL is unequal XS
            if (xlwidth != xswidth) {
              colClasses += " col--xl-" + xlwidth;
            }

            //IF XS is default
          } else {
            // IF XL is unequal 12
            if (xlwidth != 12) {
              colClasses += " col--xl-" + xlwidth;
            }
          }
        }
      }
    }
  }
  // ---------------------------------------------------------------------

  // col offset
  //IF XS is set ---------------------------------------------------------
  if (xsoffset != -1) {
    colClasses += " col--xs-os-" + xsoffset;
  }

  //IF SM is set ---------------------------------------------------------
  if (smoffset != -1) {
    //IF XS is set
    if (xsoffset != -1) {
      //IF SM is unequal XS
      if (smoffset != xsoffset) {
        colClasses += " col--sm-os-" + smoffset;
      }
    }

    //IF XS is notset
    else {
      // IF SM is unequal 12
      if (smoffset != -1) {
        colClasses += " col--sm-os-" + smoffset;
      }
    }
  }

  //IF MD is set ---------------------------------------------------------
  if (mdoffset != -1) {
    //IF SM is set
    if (smoffset != -1) {
      //IF MD is unequal SM
      if (mdoffset != smoffset) {
        colClasses += " col--md-os-" + mdoffset;
      }
    }

    //IF SM is notset
    else {
      //IF XS is set
      if (xsoffset != -1) {
        //IF MD is unequal XS
        if (mdoffset != xsoffset) {
          colClasses += " col--md-os-" + mdoffset;
        }

        //IF XS is default
      } else {
        // IF MD is unequal 12
        if (mdoffset != -1) {
          colClasses += " col--md-os-" + mdoffset;
        }
      }
    }
  }

  //IF LG is set ---------------------------------------------------------
  if (lgoffset != -1) {
    //IF MD is set
    if (mdoffset != -1) {
      //IF LG is unequal MD
      if (lgoffset != mdoffset) {
        colClasses += " col--lg-os-" + lgoffset;
      }
    }

    //IF MD is notset
    else {
      //IF SM is set
      if (smoffset != -1) {
        //IF LG is unequal SM
        if (lgoffset != smoffset) {
          colClasses += " col--lg-os-" + lgoffset;
        }

        //IF SM is notset
      } else {
        //IF XS is set
        if (xsoffset != -1) {
          //IF LG is unequal XS
          if (lgoffset != xsoffset) {
            colClasses += " col--lg-os-" + lgoffset;
          }

          //IF XS is default
        } else {
          // IF LG is unequal 12
          if (lgoffset != -1) {
            colClasses += " col--lg-os-" + lgoffset;
          }
        }
      }
    }
  }

  //IF XL is set ---------------------------------------------------------
  if (xloffset != -1) {
    //IF LG is set
    if (lgoffset != -1) {
      //IF XL is unequal LG
      if (xloffset != lgoffset) {
        colClasses += " col--xl-os-" + xloffset;
      }
    }

    //IF LG is notset
    else {
      //IF MD is set
      if (mdoffset != -1) {
        //IF XL is unequal MD
        if (xloffset != mdoffset) {
          colClasses += " col--xl-os-" + xloffset;
        }
      }

      //IF MD is notset
      else {
        //IF SM is set
        if (smoffset != -1) {
          //IF XL is unequal SM
          if (xloffset != smoffset) {
            colClasses += " col--xl-os-" + xloffset;
          }

          //IF SM is notset
        } else {
          //IF XS is set
          if (xsoffset != -1) {
            //IF XL is unequal XS
            if (xloffset != xsoffset) {
              colClasses += " col--xl-os-" + xloffset;
            }

            //IF XS is default
          } else {
            // IF XL is unequal 12
            if (xloffset != -1) {
              colClasses += " col--xl-os-" + xloffset;
            }
          }
        }
      }
    }
  }

  // col Vertical align
  if (
    xsalignV == smalignV &&
    smalignV == mdalignV &&
    mdalignV == lgalignV &&
    lgalignV == xlalignV
  ) {
    colClasses += xsalignV != "" ? " col--xs-" + xsalignV : "";
  } else {
    if (xsalignV) {
      colClasses += xsalignV != "" ? " col--xs-" + xsalignV : "";
    }
    if (smalignV) {
      if (smalignV != xsalignV) {
        colClasses += smalignV != "" ? " col--sm-" + smalignV : "";
      }
    }
    if (mdalignV) {
      if (mdalignV != smalignV) {
        colClasses += mdalignV != "" ? " col--md-" + mdalignV : "";
      }
    }
    if (lgalignV) {
      if (lgalignV != mdalignV) {
        colClasses += lgalignV != "" ? " col--lg-" + lgalignV : "";
      }
    }
    if (xlalignV) {
      if (xlalignV != lgalignV) {
        colClasses += xlalignV != "" ? " col--xl-" + xlalignV : "";
      }
    }
  }

  colClasses += " col--pd-" + colPadding;

  if (hideLG == true) {
    colClasses += " col--lg-hide";
  }
  if (hideMD == true) {
    colClasses += " col--md-hide";
  }
  if (hideXS == true) {
    colClasses += " col--xs-hide";
  }

  return [colClasses];
}
export default colClasses;
