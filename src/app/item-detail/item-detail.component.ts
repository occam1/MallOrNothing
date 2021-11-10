import { ItemService } from './../item/item.service';
import { Component, Injectable, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/Http';
import {item} from '../item/item';
import { Observable, Subject } from 'rxjs';
import {catchError, retry, map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
  providers:[]
})
@Injectable({
  providedIn: 'root',
})
export class ItemDetailComponent implements OnInit, OnChanges{
  itemString: string;
 myData :any =  [];
// @Input() itemChanged: number;
obItem : Observable<item[]>;
myItems : item[] = [];
  myItem: item;
  object_name = new Observable((observer) => {
    observer.next();
  })

  constructor(private http: HttpClient, private ids: ItemService) {
   // const headerDict = {'Content-Type':'application/json',
   //   'Accept':'application/json', 'Access-Control-Allow-Headers':'Content-Type',
   //   'Access-Control-Allow-Origin':'http://localhost:4200/*',};
    //console.log(headerDict);
    //  const aheaders = new HttpHeaders(headerDict);
      
    //get the items
    console.log('calling api');
    //this.stuff = this.http.get<item>( 'http://localhost:4200/api/Item/GetItems',   
    //{headers : aheaders}).subscribe((res)=>console.log(res.description));
    console.log('showing data');
    this.obItem = this.ids.getData();
  }

  ngOnInit(): void {
    this.obItem
    .subscribe((response : item[]) => {this.myItems = response;
     this.myItem = this.myItems[0];
     console.log("IDeatsC subscribe myItems",this.myItems, Date.now());
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change detected');
    console.log(changes);
    this.getData();
  }


  getData(){
    console.log('start of getData');
    this.http.get<item>( 'http://localhost:4200/api/Item/GetItemsByDealer',   
    ).toPromise().then( data => {  
        for (let key in data)
          {
           if (data.hasOwnProperty(key))  
           { 
            this.myData.push(data[key])
           }
          } 
          console.log("first item ",this.myItem[0]);
          this.itemString = JSON.stringify(this.myData[0]);
          this.myItem = JSON.parse(this.itemString);
        })
     }
}