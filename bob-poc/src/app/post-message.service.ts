import {Injectable, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, fromEvent} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostMessageService {

  onMessage$: Observable<any>;
  private iframe: HTMLIFrameElement;

  constructor(private router: Router) {
    this.onMessage$ = fromEvent(window, 'message');
    this.onMessage$.subscribe(e => {
      this.router.navigateByUrl(e.data.url);
      console.log('message from angular js', e)
    });
  }

  public send(data) {
    if (this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(data, 'http://localhost:3000');
    }
    // if (this.iframe) {
    //   try {
    //   } catch (e) {
    //
    //   }
    // }
  }

  public setIframe(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
  }
}
