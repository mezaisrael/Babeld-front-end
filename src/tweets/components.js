import React, {useState, useEffect} from 'react';
import {apiTweetAction, apiTweetCrete, apiTweetList} from './lookup'


export function TweetsComponent(){
  const [tweets, setTweets] = useState([])
  const textAreaRef = React.createRef()

  useEffect(() => {
    const handleTweetListLookup = (res,status) => {
      console.log('loading tweets')
      if (status === 200) {
        if (res.length !== tweets.length) {
          setTweets(res)
        }
      } else {
        alert('There was an error')
      }
    }

    apiTweetList(handleTweetListLookup)
  }, [tweets])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value

    // backend api request
    apiTweetCrete(newVal, (response,status) => {
      console.log('response', response)
      if (status === 201) {
        let tempTweets = [...tweets]
        tempTweets.unshift(response)
        console.log('tempTweets', tempTweets)
        setTweets(tempTweets)
      } else {
        console.log(response)
        alert('An error occured')

      }
    })

    textAreaRef.current.value = ""
  }

  return (
    <div>
      <div className='col-12 mb-3 mt-4'>
        <form onSubmit={handleSubmit}>
          <textarea id="" name="" ref={textAreaRef} required={true}></textarea>
          <button type='submit' className='btn btn-primary my-3'>tweet</button>
        </form>
      </div>
      <TweetList tweets={tweets}/>
    </div>
  )
}


export function TweetList(props) {
  // const [tweets, setTweets] = useState([])
  const {tweets} = props


  let tweetsComp = tweets.map(tweet =>
    <Tweet
      tweet={tweet}
      key={tweet.id}
      className=''
    />
  )
  
  return <div>{tweetsComp}</div>
}

export function ActionBtn(props) {

  const {display, onClick} = props

  const className = props.className ?  props.className : 'btn btn-primary'

  return <button className={className} onClick={onClick}>{display}</button>
}

export function ParentTweet(props) {
  const {tweet} = props
  console.log(tweet)
  return tweet.parent ?
    <div className='row'>
      <div className='col-11 mx-auto p-3 border rounded'>
        <p className='mb-0 text-muted small'>Retweet</p>
        <Tweet
          tweet={tweet.parent}
          className={' '}/>
      </div>
    </div>
    : null
}

export function Tweet(props){
  const { tweet } = props
  // how many likes this tweets has
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
  // lets us know if the the user liked this particular tweet
  const [likeBtnIsClicked, setLikeBtnIsCliked] = useState(tweet.userLiked)


  // callback to handle liking tweet
  const handleToogleLikeBtn = (event) => {
    let action = likeBtnIsClicked ? 'unlike' : 'like'
    event.preventDefault()
    apiTweetAction(tweet.id, action, (response, status) => {
      console.log(response, status)
      if (status === 200) {
        setLikes(response.likes)
        setLikeBtnIsCliked(!likeBtnIsClicked)
      }
    });
  }

  // callback to handle sharing tweet
  const handleRetweetBtn = () => {
    console.log('retweet')
  }

  const className = props.className ?  props.className : 'col-10 mx-auto col-md-6'

  return (
    <div className={className}>
      <div>
        <p>{tweet.content}</p>
        <ParentTweet tweet={tweet}/>
      </div>
      <div className='btn btn-group'>
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
          onClick={handleRetweetBtn}
        />
      </div>
    </div>
  )
}


