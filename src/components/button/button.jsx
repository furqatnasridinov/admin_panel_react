import React from 'react'
import './button.css'

export default function CustomButton({title,onclick}) {
  return (
    <button className="custom_button" onclick={onclick}>
                <p>{title}</p>
            </button>
  )
}
