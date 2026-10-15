import { Component, inject, signal } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  ActivatedRouteSnapshot
} from '@angular/router';
import { filter } from 'rxjs';
import { NavBar } from './components/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public router = inject(Router);
  public showNavBar = signal(true);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        let route: ActivatedRouteSnapshot =
          this.router.routerState.snapshot.root;

        while (route.firstChild) {
          route = route.firstChild;
        }

        this.showNavBar.set(
          route.routeConfig?.path !== '**'
        );
      });
  }
}
