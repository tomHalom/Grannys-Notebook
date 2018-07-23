import * as RecipeActions from './../store/recipe.actions';
import * as fromRecipe from './../store/recipe.reducers';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { trigger, state, transition, style, animate } from '@angular/animations';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  animations: [
    trigger('ingredientState', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px) rotate(10deg)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px) rotate(-10deg)',
          opacity: 0
        }))
      ]),
    ])
  ]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  //ingredientState = 'normal'

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, updatedRecipe: this.recipeForm.value}));
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }
    else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
      //this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(''),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9+[0-9]*$/)]),
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .take(1)
        .subscribe(
          (recipState: fromRecipe.State) => {
              const recipe = recipState.recipes[this.id];
              recipeName = recipe.name;
              recipeImagePath = recipe.imagePath;
              recipeDesc = recipe.description;
              if (recipe.ingredients){
                for (const ingredient of recipe.ingredients){
                  recipeIngredients.push(
                    new FormGroup({
                      'name': new FormControl(ingredient.name, Validators.required),
                      'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9+[0-9]*$/)]),
                    })
                  );
                }
              }
          }
        )
    }

    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDesc, Validators.required),
        'ingredients': recipeIngredients,
      }
    );
  }

}
