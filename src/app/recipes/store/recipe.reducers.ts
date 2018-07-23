import { AppState } from './../../store/app.reducers';
import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

export interface FeatureState extends AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Plof',
             'Rice with chicken',
             'https://www.bbcgoodfood.com/sites/default/files/styles/bbcgf_recipe/public/user-recipe/ready_4.jpg?itok=31AcAeKB',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Rice', 2)
        ]),
        new Recipe('Plof2',
            'Rice with chicken2',
            'https://www.bbcgoodfood.com/sites/default/files/styles/bbcgf_recipe/public/user-recipe/ready_4.jpg?itok=31AcAeKB',
        [
            new Ingredient('Chicken', 2),
            new Ingredient('Rice', 3)
        ])
    ]
};

export function recipeReducers(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case (RecipeActions.ADD_RECIPE):
            return{
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return{
                ...state,
                recipes: recipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return{
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
}
