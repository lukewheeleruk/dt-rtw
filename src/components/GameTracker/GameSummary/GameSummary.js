import React from 'react'
import css from './GameSummary.module.css'
import { Link } from 'react-router-dom'

const gameSummary = (props) => {
    return (
        <div>
        <h1 className={css.Heading}>Game stats saved</h1>
        <button className={css.PlayAgainButton} onClick={props.playAgain}>Play again</button>
        <Link to='/' ><button className={css.MainMenuButton}>Go to main menu</button></Link>
        </div>
    	
        
    )
}

export default gameSummary