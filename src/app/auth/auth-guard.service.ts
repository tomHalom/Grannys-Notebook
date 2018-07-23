import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Route } from '@angular/compiler/src/core';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth.reducers';
import * as  fromApp from '../store/app.reducers';

@Injectable()
export class AuthGuard implements CanActivate,CanLoad {

  constructor(private store: Store<fromApp.AppState>) { }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    //return this.authService.isAuthenticated();
    console.log('asdsdsfsf')
    return this.store.select('auth').map(
      (authState: fromAuth.State) => {
        return authState.authenticated;
      }
    )
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    //return this.authService.isAuthenticated();
    return this.store.select('auth')
      .take(1)
      .map(
      (authState: fromAuth.State) => {
        return authState.authenticated;
      }
    )
  }  

}
