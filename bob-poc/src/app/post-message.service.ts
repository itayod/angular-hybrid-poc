import {Injectable, HostListener} from '@angular/core';
import {Observable, fromEvent} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostMessageService {

  onMessage$: Observable<any>;
  private iframe: HTMLIFrameElement;

  constructor() {
    this.onMessage$ = fromEvent(window, 'message');
    this.onMessage$.subscribe(e => console.log('message from angular js', e));
  }

  public send(data) {
    console.log('sss')
    this.iframe.contentWindow.postMessage(data, 'http://localhost:3000' + data.url);
  }

  public setIframe(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
  }
}
