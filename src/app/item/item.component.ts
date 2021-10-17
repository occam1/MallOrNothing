import { Component, Injectable, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/Http';
import {item} from './item';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

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
  token : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRlc3QxIiwibmJmIjoxNjM0NDE5MjMzLCJleHAiOjE2MzQ0MjI4MzMsImlhdCI6MTYzNDQxOTIzM30.f5wMwlgiVVS9B1RN1mapOY8JVoU2LwVRGEm2FgSJ-y4';
  auth : string = 'Bearer ' + this.token;
  itemChanged : number = 0;
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": this.auth
   
    })
  }

  constructor(private fb: FormBuilder, private http:HttpClient, 
    private idc: ItemDetailComponent) { 
     console.log("in constructor of Item");
     console.log(this.auth); 
   }

  ngOnInit()
  { 
    this.initializeForm();
  }
  initializeForm(): void
  {
    this.itemForm = this.fb.group({
      dealerId: 57,
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
      //soldDate:  '',
      //soldPrice:  0
    })
  }
  onSubmit()
  {
    this.itemChanged += 1;
    this.postData = this.itemForm.value;
    console.log('adding item');
    console.log(this.itemForm);
    console.log(this.postData);
    console.log(this.headers);
    console.log('adding item1');
    this.http.post('http://localhost:4200/api/Item/InsertItem1/', this.postData,
     this.headers)
    .subscribe(data=>{console.log(data)},
    error => console.log(error));
    this.idc.getData();
    window.location.reload();
  }
    
    
   // 
}