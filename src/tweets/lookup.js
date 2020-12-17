import {backendLookup} from '../lookup'

export function apiTweetCrete(newTweet, callBack){
  backendLookup('POST', '/tweets/create/', callBack, {content: newTweet})
}

export function apiTweetList(callBack) {
  backendLookup('GET', '/tweets/', callBack)
}

