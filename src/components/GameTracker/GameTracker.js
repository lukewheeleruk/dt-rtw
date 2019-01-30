import React, { Component } from "react";
import css from "./GameTracker.module.css";
import { Link } from "react-router-dom";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import CurrentTarget from "./CurrentTarget/CurrentTarget";
import InputButtons from "./InputButtons/InputButtons";
import GameSummary from "./GameSummary/GameSummary";
import ShotHistoryWidget from "../ShotHistoryWidget/ShotHistoryWidget";
import getAverageAttemptsAtEachSegment from '../../functions/getAverageAttemptsAtEachSegment';


momentDurationFormatSetup(moment);

class GameTracker extends Component {
  state = {
    currentTarget: 1,
    shots: [],
    shotsTotal: 0,
    startTime: null,
    avgAttempts: null,
    elapsed: 0,
    avgAccuracy: 0,
    gameCompleted: false
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
    this.setState({ startTime: Date.now() });
    let prevGames = JSON.parse(localStorage.getItem("games"));
    let totalAccuracyValue = 0;
    if (prevGames) {
      prevGames.forEach(game => {
        totalAccuracyValue += game.accuracy;
      });

      let avgAccuracy = totalAccuracyValue / prevGames.length;
      this.setState({
        avgAccuracy: avgAccuracy,
        avgAttempts: getAverageAttemptsAtEachSegment(prevGames)
      });

    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  playAgain = () => {
    this.timer = setInterval(this.tick, 50);
    this.setState({
      currentTarget: 1,
      shots: [], // [x, x, x, x, 1, x, x, 2, 3...],
      shotsTotal: 0,
      gameCompleted: false,
      startTime: Date.now()
    });
  };

  tick = () => {
    this.setState({ elapsed: new Date() - this.state.startTime });
  };

  getShotsAtEachSegment = shotsArray => {
    const shotsAtEachSegment = []; // [2, 5, 1, 1, 1, 5, ...]
    let shotsAtCurrentTarget = 0;
    shotsArray.forEach(shot => {
      shotsAtCurrentTarget++;
      if (shot !== 0) {
        shotsAtEachSegment.push(shotsAtCurrentTarget);
        shotsAtCurrentTarget = 0;
      }
    });
    return shotsAtEachSegment;
  };

  shotHandler = hit => {
    const shotsArray = this.state.shots;
    let newShotsTotal = this.state.shotsTotal + 1;
    this.setState({ shotsTotal: newShotsTotal });
    if (hit) {
      shotsArray.push(this.state.currentTarget);
      if (this.state.currentTarget === 20) {
        clearInterval(this.timer);
        this.setState({ gameCompleted: true });
        const gameData = {
          time: this.state.startTime,
          shots: this.state.shots,
          segmentAttempts: this.getShotsAtEachSegment(this.state.shots),
          accuracy: Number(
            ((this.state.currentTarget - 1) / this.state.shotsTotal) * 100
          ),
          duration: this.state.elapsed
        };
        let prevGames = JSON.parse(localStorage.getItem("games"));
        let newGames = [];
        if (prevGames) {
          newGames = [...prevGames];
        }
        newGames.push(gameData);
        localStorage.setItem("games", JSON.stringify(newGames));
      }
      const newTarget = this.state.currentTarget + 1;
      this.setState({ currentTarget: newTarget, shots: shotsArray });
    } else {
      shotsArray.push(0);
      this.setState({ shots: shotsArray });
    }
  };

  showAccuracy = () => {
    if (this.state.shots.length > 0) {
      return (
        (
          ((this.state.currentTarget - 1) / this.state.shotsTotal) *
          100
        ).toFixed(0) + "%"
      );
    } else {
      return 0;
    }
  };

  render() {
    // Calculate elapsed to a second:
    var elapsed = Math.round(this.state.elapsed / 1000);

    // This will give a number with one digit after the decimal dot (xx.x):
    // var duration = moment.duration(elapsed, 'seconds')
    // var formatted = duration.format("hh:mm:ss");

    // Although we return an entire <p> element, react will smartly update
    // only the changed parts, which contain the seconds variable.

    return (
      <>
        <div className={css.GameTrackerContainer}>
          <div className={css.ExitButtonContainer}>
            <Link to="/">
              <i className="fa fa-times" />
            </Link>
          </div>
          <CurrentTarget
            value={this.state.currentTarget}
            finished={this.state.gameCompleted}
            avgAttemptsArray={this.state.avgAttempts}
          />
          <div className={css.ShotHistoryWidgetContainer}>
            <ShotHistoryWidget
              shotsArray={this.state.shots}
              gameIsInProgress={!this.state.gameCompleted}
            />
          </div>

          <div className={css.CurrentGameInfo}>
            <div className={css.AccuracyContainer}>
              <h3 className={css.GameInfoHeader}>Accuracy</h3>
              <h2>{this.showAccuracy()}</h2>
              <p>AVG {this.state.avgAccuracy.toFixed(2)}%</p>
            </div>
            <div className={css.DurationContainer}>
              <h3 className={css.GameInfoHeader}>Duration</h3>
              <h2>
                {moment
                  .duration(elapsed, "seconds")
                  .format("mm:ss", { trim: false })}
              </h2>
            </div>
          </div>
          {this.state.gameCompleted ? (
            <GameSummary playAgain={this.playAgain} />
          ) : (
            <InputButtons shot={this.shotHandler} />
          )}
        </div>
      </>
    );
  }
}

export default GameTracker;
