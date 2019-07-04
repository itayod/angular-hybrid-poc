import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AngularJsRoutes} from '../../common.config';
import {PostMessageService} from '../post-message.service';

const ROUTE_URL_MAPPER = {
  '/home': AngularJsRoutes.Home,
  '/todo': AngularJsRoutes.TodoList,
};

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements OnInit {
  public src;
  @ViewChild('iframe', {static: true}) iframeRef: ElementRef<HTMLIFrameElement>;

  constructor(private router: Router, private postMessage: PostMessageService, private sanitizer: DomSanitizer) {
    // this.src = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000');
  }

  ngOnInit() {
    this.postMessage.setIframe(this.iframeRef.nativeElement);
    this.router.events.pipe(filter(e => e instanceof NavigationStart))
    .subscribe((e: NavigationStart) => {
      this.postMessage.send({route: ROUTE_URL_MAPPER[e.url]});
      // this.src = this.sanitizer.bypassSecurityTrustResourceUrl(data.url
    });
  }

}
