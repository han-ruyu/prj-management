import { Recipe } from './Recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipes: Recipe[] = [
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
    ];

    constructor(private shoppingListService: ShoppingListService) {}
    recipeSelected = new EventEmitter<Recipe>();
    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}