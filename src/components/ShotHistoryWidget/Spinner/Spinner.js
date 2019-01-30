import React from "react";
import css from "./Spinner.module.css"

const spinner = props => {
  let spinner = (
    <div className={css.Container}>
      <div className={css.spinner}>
        <div className={css.doublebounce1} />
        <div className={css.doublebounce2} />
      </div>
    </div>
  );

  if (!props.active) {
    spinner = null;
  }
  return spinner;
};

export default spinner;
