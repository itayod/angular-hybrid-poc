import PostMessage from '../../services/post-message'

export default class AppCtrl {
  static $inject = ['postMessage', '$rootScope'];

  constructor(private postMessage: PostMessage, private $rootScope) {
    this.postMessage.init();
    this.$rootScope.$on('$stateChangeStart', () => {
      console.log('aaaa')
    })
  }
}
