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
 @Input() itemChanged: number;
 token : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1hcmtfYV9oYWxsQHlhaG9vLmNvbSIsInJvbGUiOiIxLDEiLCJuYmYiOjE2MzQ0ODc1NjEsImV4cCI6MTYzNDU3Mzk2MSwiaWF0IjoxNjM0NDg3NTYxfQ.HkOu0vHJNKeZTeQ2jObVyb9NkoxgHYndHbOzIEcOIU';
 auth : string = 'Bearer ' + this.token;
 headers={
   headers: new HttpHeaders({
       'Content-Type': 'application/json',
       "Authorization": this.auth})
   };
  myItem: item;
  object_name = new Observable((observer) => {
    observer.next();
  })

  constructor(private http: HttpClient) {
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
    this.getData();
  }

  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change detected');
    console.log(changes);
    this.getData();
  }


  getData(){
    console.log('start of getData');
    this.http.get<item>( 'http://localhost:4200/api/Item/GetItems',   
    ).toPromise().then( data => {  
        for (let key in data)
          {
           if (data.hasOwnProperty(key))  
           { 
            this.myData.push(data[key])
           }
          } 
          this.itemString = JSON.stringify(this.myData[0]);
          this.myItem = JSON.parse(this.itemString);
        })
     }
}