import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subject} from 'rxjs/Subject';
import {Ingredient} from '../../shared/ingredient.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  newIngredients: Ingredient[] = [];
  @ViewChild('form') recipeForm;
  selectedRecipe: Recipe;
  addedIngredientInput = new Subject<Ingredient>();
  ingredientInputSubscription: Subscription;
  id: number;
  editMode = false;
  constructor(private route: ActivatedRoute,
                private  router: Router,
                private recipesService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          if (params['id'] != null) {
            this.id = +params['id'];
            this.selectedRecipe = this.recipesService.getRecipe(this.id);
            this.editMode = params['id'] != null;
            // this.recipeForm.form.setValue({
            //   name: this.selectedRecipe.name,
            //   desc: this.selectedRecipe.description,
            //   imgPath: this.selectedRecipe.imagePath,
            //   ingredients: this.selectedRecipe.ingredients
            // });
            console.log(this.editMode);
          } else {
            console.log(this.editMode);
            this.selectedRecipe = {
              name: '',
              description: '',
              imagePath: '',
              ingredients: []
            };
          }
        }
    );

    this.ingredientInputSubscription = this.addedIngredientInput.subscribe(
      () => {
        this.selectedRecipe.ingredients = this.selectedRecipe.ingredients;
      }
    );
  }

  onSubmit() {
    for (const key in this.recipeForm.value.ingredients) {
      if (this.recipeForm.value.ingredients.hasOwnProperty(key)) {
        this.newIngredients.push(this.recipeForm.value.ingredients[key]);
      }
    }

    if (this.editMode) {
      this.recipesService.updateRecipe(this.id, {
        name: this.recipeForm.value.name,
        description: this.recipeForm.value.desc,
        imagePath: this.recipeForm.value.imgPath,
        ingredients: this.newIngredients
      });
    } else {
      this.recipesService.addRecipe({
        name: this.recipeForm.value.name,
        description: this.recipeForm.value.desc,
        imagePath: this.recipeForm.value.imgPath,
        ingredients: this.newIngredients
      });
    }
    console.log(this.recipeForm.value);
  }

  onAddIngredient() {
    this.selectedRecipe.ingredients.push({name: '', amount: 0});
    console.log(this.selectedRecipe.ingredients);
    this.addedIngredientInput.next();
  }

  onDeleteIngredient(index: number) {
    this.selectedRecipe.ingredients.splice(index, 1);
  }

  onCancel() {
    if (this.editMode) {
      this.router.navigate(
        ['/recipes', this.id]
      );
    } else {
      this.router.navigate(
        ['/recipes']
      );
    }
  }

  ngOnDestroy() {
    this.ingredientInputSubscription.unsubscribe();
  }

}
