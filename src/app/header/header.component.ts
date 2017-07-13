import { Component } from '@angular/core';
import { Response } from '@angular/http';

import {ServerService} from '../shared/server.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {RecipeService} from '../recipes/recipe.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor (private serverService: ServerService,
                private shoppingListService: ShoppingListService,
                private recipeService: RecipeService) {}

  onSaveData() {
    this.serverService.saveData()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onGetData() {
    this.serverService.getData()
      .subscribe(
        (data) => {
          this.shoppingListService.initIngredients(data.shoppingList);
          this.recipeService.initRecipes(data.recipes);
        },
        (error) => {
          console.log('something went wrong!');
        }
      );
  }
}
