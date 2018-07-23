import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log('interceptttttt!');
        return this.store.select('auth')
            .take(1)
            .switchMap(
            authState => {
                const copiedRequest = req.clone({headers: req.headers.append('auth', authState.token)});
                return next.handle(copiedRequest);
            }
        );
    }
}