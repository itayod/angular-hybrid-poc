import { ANGULAR_URL, MessageIds, IMessageEvent, INavigationEvent, AngularJsRoutes } from '../common.config';

class PostMessage {
  static $inject = ['$state'];

  readonly ANGULAR_ID = MessageIds.Angular;
  readonly ANGULAR_JS_ID = MessageIds.AngularJs;

  constructor(private $state) {
    console.log($state)
  }

  init() {
    window.onmessage = (e: MessageEvent) => {
      if (e.data.id !== this.ANGULAR_ID) { return; }
      if (!Object.values(AngularJsRoutes).includes(e.data.route)) { return; }
      console.log(e.data.route);
      this.$state.go(e.data.route);
    }
  }

  send(data: Partial<INavigationEvent>) {
    console.log('sending message to angular');
    window.parent.postMessage({...data, id: this.ANGULAR_JS_ID}, ANGULAR_URL)
  }
}

export default PostMessage
