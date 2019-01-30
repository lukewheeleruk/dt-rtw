import React, { Component } from "react";
import css from "./GamesLog.module.css";
import { Link } from "react-router-dom";
import moment from "moment";
import ShotHistoryWidget from "../ShotHistoryWidget/ShotHistoryWidget";

import getAverageAttemptsAtEachSegment from "../../functions/getAverageAttemptsAtEachSegment"

class GamesLog extends Component {
  state = {
    history: JSON.parse(localStorage.getItem("games"))
  }

  deleteData = () => {
    localStorage.clear();
    this.setState({history: JSON.parse(localStorage.getItem("games"))})
  };

  componentWillUnmount() {
    this.setState({history: JSON.parse(localStorage.getItem("games"))})
  }

  render() {

    let reversedArrayOfGames = null;
    if (this.state.history) {
      reversedArrayOfGames = [...this.state.history].reverse()
    }

    let averageAttemptsArray = null
    if (this.state.history) {
      averageAttemptsArray = getAverageAttemptsAtEachSegment(this.state.history)
    }

    // getAverageAttemptsAtEachSegment returns an array with 20 integers representing 1-20 segments.
    // each value will be the average attempts at that segment.
    // Example: [2.365, 5.312, 5.342...]
    // to retrieve attempts for 15 on the dartboard: returnedArray[14]
    // to retrieve attempts for 1 on the dartboard: returnedArray[0]


    return (
      <>
      <div className={css.Container}>
        <div className={css.ExitButtonContainer}>
          <Link to="/">
            <i className="fas fa-chevron-left" />
          </Link>
        </div>
        {averageAttemptsArray ? <><div className={css.SegmentInfoContainer}>
          <div className={css.WorstSegmentContainer}>
            <h3>Worst Segment</h3>
              <h2>{averageAttemptsArray.indexOf(Math.max(...averageAttemptsArray)) + 1}</h2>
            <p><i className="fas fa-bullseye"></i> {Math.max(...averageAttemptsArray).toFixed(2)}</p>
          </div>
          <div className={css.BestSegmentContainer}>
          <h3>Best Segment</h3>
          <h2>{averageAttemptsArray.indexOf(Math.min(...averageAttemptsArray)) + 1}</h2>
            <p><i className="fas fa-bullseye"></i> {Math.min(...averageAttemptsArray).toFixed(2)}</p>
          </div>
        </div>
        
        <div style={{'clear': 'both'}}></div></> : null}
        
        
          
        {reversedArrayOfGames ? (
          reversedArrayOfGames.map((game, index) => {
            return (
              
                <div key={index} className={css.GameEntry}>
                  <h4>
                    <i className="far fa-clock" />{" "}
                    {moment.unix((game.time / 1000).toFixed(0)).fromNow()}
                  </h4>
                  <ShotHistoryWidget
                    shotsArray={game.shots}
                    gameIsInProgress={false}
                  />
                  <div className={css.GameEntryInfoContainer}>
                    <div className={css.AccuracyContainer}>
                      <h3 className={css.GameInfoHeader}>Accuracy</h3>
                      <h2>{game.accuracy.toFixed(2)}%</h2>
                    </div>
                    <div className={css.DurationContainer}>
                      <h3 className={css.GameInfoHeader}>Duration</h3>
                      <h2>{moment
                        .duration(Math.floor(game.duration / 1000), "seconds")
                        .format("mm:ss", { trim: false })}</h2>
                    </div>
                  </div>
                  
                  
                  
                </div>
              
            );
          })
        ) : (
          <>
            <h1 className={css.NoDataHeading}>No data to display</h1>
          </>
        )}
        {this.state.history ? <button
          onClick={this.deleteData}
          className={css.SecondaryButton + " " + css.Danger}
        >
          Erase all data
        </button> : null}
      </div>
    </>
    )
  }
}

export default GamesLog;
