import React, { Component } from "react";
import css from "./ShotHistoryWidget.module.css";
import Spinner from "./Spinner/Spinner"
import { TransitionGroup, CSSTransition } from "react-transition-group";

import '@kennethormandy/react-flipcard/dist/Flipcard.css'

class ShotHistoryWidget extends Component {

  render() {
    return (
      <>
        <TransitionGroup className={css.ShotHistoryWidget}>
          {this.props.shotsArray.map((shot, i) => {
            if (shot === 0) {
              return (
                <CSSTransition key={i} classNames="pop" timeout={1000}>
                  <div className={css.ShotHistoryMiss}>
                    <i className="fas fa-times" />
                  </div>
                </CSSTransition>
              );
            } else {
              return (
                <CSSTransition key={i} classNames="pop" timeout={1000}>
                  <div className={css.ShotHistoryHit}>{shot}</div>
                </CSSTransition>
              );
            }
          })}
          <Spinner active={this.props.gameIsInProgress} />
        </TransitionGroup>
        <div ref={el => { this.el = el; }} />
        </>
    )
  }
}

export default ShotHistoryWidget;
