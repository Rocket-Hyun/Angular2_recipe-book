import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRecipeClicked:boolean = true;

  onMenuClicked(isRecipe) {
    console.log(this.isRecipeClicked);
    this.isRecipeClicked = isRecipe;
    console.log(this.isRecipeClicked);
  }
}
