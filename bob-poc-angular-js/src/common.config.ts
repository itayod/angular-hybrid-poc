export const ANGULAR_URL = 'http://localhost:4200';
export const ANGULAR_JS_URL = 'http://localhost:3000';

export enum MessageIds {
  Angular = 'ANGULAR_ID',
  AngularJs = 'ANGULAR_JS_ID'
}

export enum AngularRoutes {
  Feature1 = 'feature1'
}

export enum AngularJsRoutes {
  Home = 'home',
  TodoList = 'todolist'
}

export interface IMessageEvent {
  id: MessageIds
}

export interface INavigationEvent extends IMessageEvent {
  route: AngularJsRoutes | AngularRoutes;
}
