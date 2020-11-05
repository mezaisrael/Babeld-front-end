import React, {useState, useEffect} from 'react';
import {loadTweets} from '../lookup'


export function TweetsComponent(){
  const [tweets, setTweets] = useState([])
  const textAreaRef = React.createRef()

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    console.log(newVal)

    // make post reqeus to create new tweet
    // fetch('http://localhost:8000/api/tweets/')
    //   .then(res => {res.json()})
    //   .then((json) => {
    //     console.log(json)
    //     const newTweetObj = {id: json.id, content: json.content, likes: 0}
    //     // TODO send post
    //     fetch('http://localhost:8000/api/tweets/create/')
    //       .then((res) => {console.log(res.json())})

    //     // setTweets(newTweet)
    //   })

    // reload tweets
    fetch('http://localhost:8000/api/tweets/')
      .then(res => res.json())
      .then(json => setTweets(json))

    textAreaRef.current.value = ''
  }

  return (
    <div>
      <div className='col-12 mb-3 mt-4'>
        <form onSubmit={handleSubmit} required={true} >
          <textarea id="" name="" ref={textAreaRef}></textarea>
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
  //TODO
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
  const [likeBtcIsClicked, setLikeBtnIsCliked] = useState(tweet.userLiked)

  const className = props.className ?  props.className : 'col-10 mx-auto col-md-6'

  const handleToogleLikeBtn = () => {
    setLikeBtnIsCliked(!likeBtcIsClicked)

    let options = {
      method: 'POST',
      body: {'action': likeBtcIsClicked ? 'like' : 'unlike'}
    }

    fetch('http://localhost:8000/api/tweets/action/', options)
      .then(res => res.json())
      .then(json => console.log(json))
  }

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


