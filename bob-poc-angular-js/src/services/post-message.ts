class PostMessage {

  constructor() {
    window.onmessage = function(e) {
      console.log('message from angular', e);
    }
  }

  send(data) {
    window.parent.postMessage(data, 'http://localhost:4200')
  }
}

export default PostMessage
