import * as fromShoppingLists from '../shopping-list/store/shopping-list.reducer'; 
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingLists.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingLists.ShoppingListReducer,
    auth: fromAuth.AuthReducer
};