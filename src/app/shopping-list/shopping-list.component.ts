import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import{ Ingredient } from '../shared/ingredient.model'
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  //private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.shoppingListService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   )
  }

  onEditItem(index: number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    //this.shoppingListService.startedEditing.next(index);
  }


}
