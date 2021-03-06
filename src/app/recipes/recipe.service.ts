import { Recipe } from './Recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from '../store/app.reducer'
@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    /* recipes: Recipe[] = [
        new Recipe('A Test Recipt', 'This is simply a test', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/classic-lasange.jpg?itok=aYJg59N3',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Another Test Recipt', 'This is simply a test', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/classic-lasange.jpg?itok=aYJg59N3',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
    ]; */

    constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) {}
    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
