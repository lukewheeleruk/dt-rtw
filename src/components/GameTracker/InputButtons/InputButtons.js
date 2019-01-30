import React from 'react'
import css from './InputButtons.module.css'

const inputButtons = (props) => {

    return (
    	<div className={css.InputButtons} >
            <button className={css.HitButton} onClick={() => props.shot(true)}><i className="fas fa-check"></i></button>
            <button className={css.MissButton} onClick={() => props.shot(false)}><i className="fas fa-times"></i></button>
            {/* <button className={css.UndoButton}>Undo</button>
            <button className={css.QuitButton}>Quit</button> */}
        </div>
    )
}

export default inputButtons