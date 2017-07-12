import { Recipe } from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'MOD Pizza',
      'This is a pizza',
      'http://media.bizj.us/view/img/4824031/mod-pizza*1200xx960-541-0-73.jpg',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Pepperoni', 2)
      ]
    ),
    new Recipe(
      'Burger King',
      'This is a burger',
      'http://mms.businesswire.com/media/20161011005389/en/549054/5/Bacon_King_Sandwich_highres.jpg',
      [
        new Ingredient('Bread', 1),
        new Ingredient('bacon', 2)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}


  getRecipes() {
    // slice가 없으면 배열에 직접 접근함
    // slice가 있으면 복사본에 접근할 수 있음
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, changedRecipe: Recipe) {
    this.recipes[id] = changedRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsFromRecipe(recipe: Recipe) {
    console.log(recipe + ' is in the recipe service!');
    this.shoppingListService.addIngredients(recipe.ingredients);
  }
}
