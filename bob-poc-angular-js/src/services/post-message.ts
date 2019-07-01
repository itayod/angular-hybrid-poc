class PostMessage {
  static $inject = ['$state'];

  constructor(private $state) {
    console.log($state)
  }

  init() {
    window.onmessage = (e) => {
      this.$state.go(e.data.url);
    }
  }

  send(data) {
    window.parent.postMessage(data, 'http://localhost:4200')
  }
}

export default PostMessage
