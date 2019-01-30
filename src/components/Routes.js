import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch, withRouter } from "react-router-dom";
import MainMenu from "./MainMenu/MainMenu";
import GameTracker from "./GameTracker/GameTracker";
import GamesLog from "./GamesLog/GamesLog";

const routes = ({ location }) => {

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.key} classNames={"fade"} timeout={300}>
        <section className="route-section">
          <Switch location={location}>
            <Route path="/" exact component={MainMenu} />
            <Route path="/play" exact component={GameTracker} />
            <Route path="/history" exact component={GamesLog} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  );

};

export default withRouter(routes);
