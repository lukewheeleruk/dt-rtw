import React from "react";
import css from "./CurrentTarget.module.css";

const currentTarget = props => {
  let targetIndicator = <h2>{props.value}</h2>;
  if (props.finished) {
    targetIndicator = <i className="fas fa-check" />;
  }
  return (
    <div className={css.CurrentTarget}>
      <div className={css.CurrentTargetInfoContainer}>
        <div className={css.CurrentTargetInfoTargetValueContainer}>
          {targetIndicator}
        </div>
        <div className={css.CurrentTargetInfoAverageAccuracyContainer}>
          {props.avgAttemptsArray && !props.finished ? <h5><i className="fas fa-bullseye" /> {props.avgAttemptsArray[props.value - 1].toFixed(2)}</h5> : null}
        </div>
      </div>
    </div>
  )
};

export default currentTarget;
