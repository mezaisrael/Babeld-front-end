import React, {useState, useEffect} from 'react';
import {loadTweets} from '../lookup'


export function TweetList(prop){
  const [tweets, setTweets] = useState([])

  useEffect(() => {

    const myCallBack = (res,status) => {
      if (status === 200) {
        setTweets(res)
      } else {
        alert('There was an error')
      }
    }
    loadTweets(myCallBack)

  }, [])
  
  return(
    tweets.map((tweet, index) => {
      return<Tweet
      tweet={tweet}
      key={tweet.id}
      className='my-5 py-5 border bg-white text-dark'/>
    })
  )
}

export function ActionBtn(props) {
  const {tweet, action} = props
  const className = props.className ?  props.className : 'btn btn-primary'
  if (action.type === 'like') {
    return <button className={className}> {tweet.likes} Likes</button>
  } else{
    return null
  }
}

export function Tweet(props){
  const { tweet } = props
  const className = props.className ?  props.className : 'col-10 mx-auto col-md-6'

  return (
    <div>
      <p className={className}>{tweet.id} - {tweet.content}</p>
      <ActionBtn tweet={tweet} action={{type: 'like'}}/>
      <ActionBtn tweet={tweet} action={{type: 'unlike'}}/>
    </div>
  )
}


