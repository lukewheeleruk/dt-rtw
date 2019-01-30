import React from "react";
import { Link } from "react-router-dom";

import css from "./MainMenu.module.css";

const mainMenu = props => {


  return (
    <>
      <div className={css.Welcome}>
        <h1>Darts Tracker</h1>
        <h3>Round The World</h3>
      </div>

      <div className={css.MenuItems}>
        <Link to="/play">
          <button className={css.PlayButton}>Start</button>
        </Link>
        <Link to="/history">
          <button className={css.SecondaryButton}>Statistics</button>
        </Link>
        
      </div>
      <div className={css.CreatedBy}>
        <h3>Created by Luke Wheeler</h3>
        <p><a href='http://wheeler.cc'>wheeler.cc</a></p>
      </div>
      
    </>
  );
};

export default mainMenu;
