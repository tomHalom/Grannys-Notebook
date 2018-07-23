import * as fromRecipe from './recipe.reducers';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap(
            (action: RecipeActions.FetchRecipes) => {
                return this.httpClient.get<Recipe[]>(environment.firebase.databaseURL + '/recipes.json');
            }
        ).map(
            (recipes) => {
                for (const recipe of recipes){
                    if (!recipe['ingredients']) {
                        console.log(recipe);
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };
            }
        );

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(
            ([action, state]) => {
                return this.httpClient.put(environment.firebase.databaseURL + '/recipes.json', state.recipes);
            }
        );

    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) {}
}
