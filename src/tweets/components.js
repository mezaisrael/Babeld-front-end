import React, {useState, useEffect} from 'react';
import {apiTweetCrete, apiTweetList} from './lookup'
import {TweetList} from './List'
import {TweetCreate} from './TweetCreate'


export function TweetsComponent(){
  const [tweets, setTweets] = useState([])
  const textAreaRef = React.createRef()
  const root = document.getElementById('root')
  const username = root.dataset.username
  const canTweet = root.dataset.canTweet === 'true' ? true : false
  console.log('can twet', canTweet)

  useEffect(() => {
    const handleTweetListLookup = (res,status) => {
      if (status === 200) {
        if (res.length !== tweets.length) {
          setTweets(res)
        }
      } else {
        alert('There was an error')
      }
    }

    apiTweetList(username, handleTweetListLookup)
  }, [tweets, username, canTweet])

  const handleNewTweet = (newTweet) =>{
    let tempNewTweets = [...tweets]
    tempNewTweets.unshift(newTweet)
    setTweets(tempNewTweets)
  }


  return (
    <div>
      {canTweet && <TweetCreate didTweet={handleNewTweet}/>}
      <TweetList tweets={tweets} setTweets={setTweets}/>
    </div>
  )
}


