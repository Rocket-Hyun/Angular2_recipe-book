import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  itemIndex: number;
  editingItem: Ingredient;
  editSubscription: Subscription;
  editMode = false;

  // Viewchild를 쓸수도 있고 click에서 바로 파라미터로 보낼 수 있음
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.itemEditStart.subscribe(
      (index: number) => {
        this.itemIndex = index;
        this.editMode = true;
        this.editingItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.itemIndex, {
        name: this.slForm.value.name,
        amount: this.slForm.value.amount
      });
    } else {
      this.shoppingListService.addIngredient({
        // name: nameInput.value,
        // amount: amountInput.value
        name: form.value.name,
        amount: form.value.amount
      });
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    console.log(this.itemIndex);
    this.shoppingListService.deleteIngredient(this.itemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

}
