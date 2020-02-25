import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) { }
  editMode = false;
  editItem: Ingredient;
  @ViewChild('f', {static: false}) slForm: NgForm;
  ngOnInit() {
    this.subscription = this.store.select("shoppingList").subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      } else {
        this.editMode = false;
      }
    })
    // this.subscription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editItem = this.shoppingListService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editItem.name,
    //       amount: this.editItem.amount
    //     })
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      //this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({newIngredient: newIngredient}))
    } else {
      //this.shoppingListService.addIngredient(newIngredient)
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    //this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

}
