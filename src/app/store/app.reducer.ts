import * as fromShoppingLists from '../shopping-list/store/shopping-list.reducer'; 
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipes from '../recipes/store/recipe.reducer';

export interface AppState {
    shoppingList: fromShoppingLists.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingLists.ShoppingListReducer,
    auth: fromAuth.AuthReducer,
    recipes: fromRecipes.recipeReducer    
};