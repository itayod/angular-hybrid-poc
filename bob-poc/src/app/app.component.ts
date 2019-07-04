import { Component } from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {share, filter} from 'rxjs/operators';
import {ROUTE_URL_MAPPER} from '../../../bob-poc-angular-js/src/common.config';
import {PostMessageService} from './post-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bob-poc';
  public isAngularRoute$: Observable<boolean>;
  private isAngularRoute: boolean;

  constructor(private post: PostMessageService, router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationStart) ).subscribe((e: NavigationStart) => {
      this.isAngularRoute = !!ROUTE_URL_MAPPER[e.url];
    })
    this.isAngularRoute$ = post.isAngularRoute$.asObservable().pipe(share());
  }
}
