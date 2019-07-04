import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, fromEvent, BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MessageIds, INavigationEvent} from '../../../bob-poc-angular-js/src/common.config';
import {AngularRoutes} from '../common.config';


@Injectable({
  providedIn: 'root'
})
export class PostMessageService {

  readonly ANGULAR_ID = MessageIds.Angular;
  readonly ANGULAR_JS_ID = MessageIds.AngularJs;

  onMessage$: Observable<any>;
  private iframe: HTMLIFrameElement;

  public isAngularRoute$ = new BehaviorSubject(true);

  constructor(private router: Router) {
    this.onMessage$ = fromEvent(window, 'message');
    this.onMessage$.pipe(
      filter(e => e.data.id === this.ANGULAR_JS_ID),
      filter(e => Object.values(AngularRoutes).includes(e.data.route))
    ).subscribe(e => {
      console.log('message from angular js', e);
      this.router.navigateByUrl(e.data.route);
      this.isAngularRoute$.next(true);
    });
  }

  public send(data: Partial<INavigationEvent>) {
    if (this.iframe.contentWindow) {
      this.isAngularRoute$.next(!Object.values(AngularRoutes).includes(data.route));
      this.iframe.contentWindow.postMessage({...data, id: this.ANGULAR_ID}, 'http://localhost:3000');
    }
  }

  public setIframe(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
  }
}
