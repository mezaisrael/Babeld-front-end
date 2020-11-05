function lookup(method, endpoint, callBack, data){
  let jsonData
  if (data) {
    jsonData = JSON.stringify(data)
  }
  
  const xhr = new XMLHttpRequest()
  const url = `http://localhost:8000/api${endpoint}/`

  xhr.responseType = 'json'
  xhr.open(method, url)

  xhr.onload = function() {
    callBack(xhr.response, xhr.status)
  }
  xhr.onerror = function(e) {
    console.log(e)
    callBack({'message': 'the request was an error'}, 400)
  }
  xhr.send(jsonData)
}

export function loadTweets(callBack) {
  lookup('GET', '/tweets', callBack)
}
