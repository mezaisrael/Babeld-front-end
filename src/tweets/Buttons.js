import React from 'react'


export function ActionBtn(props) {

  const {display, onClick} = props

  const className = props.className ?  props.className : 'btn btn-primary'

  return <button className={className} onClick={onClick}>{display}</button>
}
