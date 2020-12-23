import React, {useEffect, useState} from 'react'
import {apiTweetAction} from './lookup'
import {ActionBtn} from './Buttons'

export function ParentTweet(props) {
  const {tweet} = props
  return tweet.parent ?
    <div className='row pl-5 pt-5 pb-5'>
      <div className='col-11 mx-auto p-3 border rounded'>
        <p className='mb-0 text-muted small'>Retweet</p>
        <Tweet
          hideActions
          tweet={tweet.parent}
          className={' '}/>
      </div>
    </div>
    : null
}

export function Tweet(props){
  const { tweet, retweetHelper, hideActions } = props
  // how many likes this tweets has
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
  // lets us know if the the user liked this particular tweet
  const [likeBtnIsClicked, setLikeBtnIsCliked] = useState(tweet.userLiked)

  // callback to handle liking tweet
  const handleToogleLikeBtn = (event) => {
    event.preventDefault()
    let action = likeBtnIsClicked ? 'unlike' : 'like'
    apiTweetAction(tweet.id, action, (response, status) => {
      console.log(response, status)
      if (status === 200) {
        setLikes(response.likes)
        setLikeBtnIsCliked(!likeBtnIsClicked)
      }
    });
  }

  // callback to handle sharing tweet
  const handleRetweet = (event) => {
    event.preventDefault()
    // console.log(retweetHelper)
    retweetHelper(tweet)
  }

  // const className = props.className ?  props.className : 'col-10 mx-auto col-md-6'

  return (
    <div className='card bg-dark'>
      <div className='mt-4'>
        <p>{tweet.content}</p>
        <ParentTweet tweet={tweet}/>
      </div>
      { !hideActions &&
      <div className='btn btn-group mb-4'>
        <ActionBtn
          tweet={tweet}
          type='like'
          display={`${likes} Likes`}
          onClick={handleToogleLikeBtn}
        />
        <ActionBtn
          tweet={tweet}
          type='retweet'
          display='Retweet'
          onClick={handleRetweet}
        />
      </div>
      }
    </div>
  )
}
