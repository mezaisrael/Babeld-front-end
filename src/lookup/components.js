
export function loadTweets(callBack) {
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = 'http://localhost:8000/api/tweets/'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)

  xhr.onload = function() {
    callBack(xhr.response, xhr.status)
  }
  xhr.onerror = function(e) {
    console.log(e)
    callBack({'message': 'the request was an error'}, 400)
  }
  xhr.send()
}
