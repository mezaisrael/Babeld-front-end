import {backendLookup} from '../lookup'

export function apiTweetCreate(newTweet, callBack){
  backendLookup('POST', '/tweets/create/', callBack, {content: newTweet})
}

export function apiTweetAction(tweetId, action, callBack){
  backendLookup(
    'POST',
    '/tweets/action/',
    callBack, {id: tweetId, action: action}
  )
}

export function apiTweetDetail(tweetId, callBack) {
  backendLookup('GET', `/tweets/?tweetid=${tweetId}`, callBack)
}

export function apiTweetList(username, callBack) {
  let endpoint = "/tweets/"
  if (username) {
    endpoint = `/tweets/?username=${username}`
  }
  console.log('loading tweets for user', username)
  backendLookup('GET',endpoint, callBack)
}

