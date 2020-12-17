import React, {useState, useEffect} from 'react';
import {apiTweetCrete, apiTweetList} from './lookup'


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
      className='my-5 py-5 border bg-white text-dark'
    />
  )
  
  return <div>{tweetsComp}</div>
}

export function ActionBtn(props) {

  const {display, onClick} = props

  const className = props.className ?  props.className : 'btn btn-primary'

  return <button className={className} onClick={onClick}>{display}</button>
}


export function Tweet(props){
  const { tweet } = props
  // how many likes this tweets has
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
  // lets us know if the the user liked this particular tweet
  const [likeBtnIsClicked, setLikeBtnIsCliked] = useState(tweet.userLiked)

  const className = props.className ?  props.className : 'col-10 mx-auto col-md-6'

  // callback to handle liking tweet
  const handleToogleLikeBtn = () => {
    setLikeBtnIsCliked(!likeBtnIsClicked)

    let options = {
      method: 'POST',
      body: {'action': likeBtnIsClicked ? 'like' : 'unlike'}
    }
    // console.log(options)

    fetch('http://localhost:8000/api/tweets/action/', options)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  // callback to handle sharing tweet
  const handleRetweetBtn = () => {
    console.log('retweet')
  }

  return (
    <div>
      <p className={className}>{tweet.id} - {tweet.content}</p>
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
  )
}


