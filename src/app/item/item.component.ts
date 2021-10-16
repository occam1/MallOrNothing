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

  constructor(private fb: FormBuilder, private http:HttpClient, 
    private idc: ItemDetailComponent) { 
     console.log("in constructor of Item")
   }

  ngOnInit()
  { 
    this.initializeForm();
  }
  initializeForm(): void
  {
    this.itemForm = this.fb.group({
      dealerId: 57,
      Name: '',
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
      quantity:  0,
      //soldDate:  '',
      //soldPrice:  0
    })
  }
  onSubmit()
  {
    this.postData = this.itemForm.value;
    console.log('adding item')
    console.log(this.itemForm);
    console.log(this.postData);
    console.log('adding item1')
    this.http.post('http://localhost:4200/api/Item/InsertItem1/', this.postData)
    .toPromise().then(data=>{console.log(data)});
    this.idc.getData();
  }
    
    
   // 
}