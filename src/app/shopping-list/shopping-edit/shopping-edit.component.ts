import { DeleteIngredient } from './../store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('f') slForm:NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1){
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.slForm.setValue(this.editedItem);
          }
          else{
            this.editMode = false;            
          }
        }
      )
    // this.subscription = this.shoppingListService.startedEditing
    //   .subscribe(
    //     (index:number) => {
    //       this.editedItemIndex= index;
    //       this.editMode = true;     
    //       this.editedItem = this.shoppingListService.getIngredient(index);
    //       this.slForm.setValue(this.editedItem);
    //     }
    //   );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));      
      //this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      //this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    //this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());  
    this.onClear();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

}
