import { Observable } from 'rxjs/Observable';
import * as RecipeActions from './../store/recipe.actions';
import * as fromRecipe from './../store/recipe.reducers';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipesState: Observable<fromRecipe.State>;

  constructor(private router: Router,
      private route: ActivatedRoute,
      private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
