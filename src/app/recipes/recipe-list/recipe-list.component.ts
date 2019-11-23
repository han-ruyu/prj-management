import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A Test Recipt', 'This is simply a test', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/classic-lasange.jpg?itok=aYJg59N3')
  ];
  constructor() { }

  ngOnInit() {
  }

} 
 