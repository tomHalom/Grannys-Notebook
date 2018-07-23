import * as AuthActions from './../../auth/store/auth.actions';
import * as RecipeActions from './../../recipes/store/recipe.actions';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { Component, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core'
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    isIn = false;   // store state
    authState: Observable<fromAuth.State>;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.authState = this.store.select('auth');
    }

    toggleState() { // burger click handler
        this.isIn = !this.isIn;
        return this.isIn;
    }

    onSaveData() {
        // this.dataStorageService.storeRecipes()
        // .subscribe(
        //     (response:Response) => {
        //         console.log(response);
        //     }
        // )
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData() {
        //this.dataStorageService.getRecipes();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
        //this.authService.logout();
    }
}