import { Observable } from 'rxjs/Observable';
import * as RecipeActions from './../store/recipe.actions';
import { Store } from '@ngrx/store';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
import * as fromRecipe from './../store/recipe.reducers';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
               private router: Router,
               private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          this.id = +params['id'];
          //this.recipe = this.recipeService.getRecipe(this.id);
          this.recipeState = this.store.select('recipes');
        }
    )
  }

  onAddToShoppingList(){
    this.store.select('recipes')
      .take(1)
      .subscribe(
        (recipeState: fromRecipe.State) => {
            this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
        }
      );
    //this.recipeService.addIngredintsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    //this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

}
