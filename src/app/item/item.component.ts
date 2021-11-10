import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/Http';
import {item} from './item';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers:[]
})
@Injectable({
  providedIn: 'root',
})
export class ItemComponent implements OnInit {
  itemForm: FormGroup;
  postData: object;
  itemChanged : number = 0;
  selectedItem: item;
  btnFunction: string = "Add item";
  isUpdate: boolean = false;
 
  

  constructor(private fb: FormBuilder, private http:HttpClient, 
    private idc: ItemDetailComponent, private itemService: ItemService) { 
     console.log("in constructor of Item");
   }

  ngOnInit()
  { 
    
    this.btnFunction = "Add item"; 
    console.log("itemComponent ngOnInit");
    this.initializeForm();
    console.log("ic is ",this.itemService.selectedItem);
    this.itemService.itemSelectedEvent.subscribe((selection: item)=>{ 
      this.selectedItem = selection;
      console.log("ngo itemcomponent selectedItem ", this.selectedItem);
      this.updateItem(this.selectedItem);
    },
    error => {console.log("ic event subscribe error ", error)}
    );
    if (this.itemService.selectedItem == null)
    {  console.log("going to initialize form");
      this.initializeForm()}
    else{
      console.log("going to update form");
    this.updateItem(this.itemService.selectedItem);
    }
    console.log("leaving ngo ic");
    
  }
  initializeForm(): void
  {
     this.isUpdate = false;
    console.log("initializing ic");
    this.itemForm = this.fb.group({
      id : 0,
      dealerId: 1,
      inventoryNumber: '',
      description: '',
      keywords:  '',
      manufacturer:  '',
      manufacturingLine: '',
      cost:  0,
      currentPrice:  0,
      minimumPrice:  0,
      pricingPlanId:  0,
      isAvailable: true,
      isShippable: true,
      collectionName: '',
      quantity:  0,
      boughtFrom: ' '
      //soldDate:  '',
      //soldPrice:  0
    })
    console.log("done initializing ic form");
  }
  
  updateItem(updItem : item)
  { 
    this.isUpdate = true;
this.btnFunction = "Update item"; 

console.log("ic updateItem id = ", updItem.id);
 console.log("ic updateItem ", updItem);
    this.itemForm = this.fb.group({
      id: updItem.id,
      dealerId: updItem.dealerId,
      inventoryNumber: updItem.inventoryNumber,
      description: updItem.description,
      keywords:  updItem.keywords,
      manufacturer: updItem.manufacturer,
      manufacturingLine: updItem.manufacturingLine,
      cost:  updItem.cost,
      currentPrice:  updItem.currentPrice,
      minimumPrice:  updItem.minimumPrice,
      pricingPlanId:  updItem.pricingPlanId,
      isAvailable: updItem.isAvailable,
      isShippable: updItem.isShippable,
      collectionName: updItem.collectionName,
      quantity:  updItem.quantity,
      boughtFrom: updItem.boughtFrom
      //soldDate:  '',
      //soldPrice:  0
      }
      )
       
   console.log("ic updatedItem ", updItem);
    
  }

  onSubmit()
  {
    console.log('adding item');
    //this.itemChanged += 1;
    this.postData = this.itemForm.value;
  
    console.log(this.itemForm);
    console.log(this.postData);
    if (this.isUpdate == false) {
    console.log('adding item1', this.postData);
    this.itemService.insertItem(this.postData)
    }
    else
    {
      console.log('updating item1', this.postData);
      this.itemService.updateItem(this.postData)
    }
    //this.http.post('http://localhost:4200/api/Item/InsertItem/', this.postData)
    //.subscribe(data=>{console.log(data)},
    //error => console.log(error));
    //this.itemService.getData();
    //window.location.reload();
  }
    
    
   // 
}