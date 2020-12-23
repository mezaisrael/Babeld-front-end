import React from 'react';
import {apiTweetCreate} from './lookup'

export function TweetCreate(props){
  const textAreaRef = React.createRef()
  const {didTweet} = props

  const handleBackendUpdate = (response, status) =>{
    if (status === 201){
      //send twets back up to caller
      didTweet(response)
    } else {
      console.log(response)
      alert("An error occured please try again")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    // backend api request
    apiTweetCreate(newVal, handleBackendUpdate)
    textAreaRef.current.value = ''
  }

  return (
    <div className='col-12 mb-3 mt-4'>
      <form onSubmit={handleSubmit}>
        <textarea id="" name="" ref={textAreaRef} required={true}></textarea>
        <button type='submit' className='btn btn-primary my-3'>tweet</button>
      </form>
    </div>

  )
}
