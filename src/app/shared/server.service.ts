import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs/Rx';

@Injectable()
export class ServerService {

  constructor(private http: Http,
                private shoppingListService: ShoppingListService,
                private recipeService: RecipeService) { }

  saveData() {
    const data = {
      recipes: this.recipeService.getRecipes(),
      shoppingList: this.shoppingListService.getIngredients()
    }
    return this.http.put('https://recipe-book-http-e7fbb.firebaseio.com/data.json', data);
  }

  getData() {
    return this.http.get('https://recipe-book-http-e7fbb.firebaseio.com/data.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
}
