import {backendLookup} from '../lookup'

export function apiTweetCrete(newTweet, callBack){
  backendLookup('POST', '/tweets/create/', callBack, {content: newTweet})
}

export function apiTweetAction(tweetId, action, callBack){
  backendLookup(
    'POST',
    '/tweets/action/',
    callBack, {id: tweetId, action: action}
  )
}

export function apiTweetList(callBack) {
  backendLookup('GET', '/tweets/', callBack)
}

