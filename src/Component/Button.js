import React from 'react'

function Button({ children, style, type, click }) {
    return (
        <button className={style} type={type} onClick={click} >
            {children}
        </button>
    )
}

export default Button