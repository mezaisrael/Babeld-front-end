import React from 'react'
import {apiTweetAction} from './lookup'
import {Tweet} from './Detail'

export function TweetList(props) {
  // const [tweets, setTweets] = useState([])
  const {tweets, setTweets} = props

  const handleRetweetHelper = (tweet) => {
    let action = 'retweet'
    apiTweetAction(tweet.id, action, (response, status) => {
      console.log(response, status)
      if (status === 201) {
        let currTweets = [...tweets]
        currTweets.unshift(response)
        setTweets(currTweets)
        // console.log(response)
      }
    });
  }

  let tweetsComp = tweets.map(tweet =>
    <Tweet
      tweet={tweet}
      key={tweet.id}
      className=''
      retweetHelper={handleRetweetHelper}
    />
  )
  
  return <div>{tweetsComp}</div>
}
