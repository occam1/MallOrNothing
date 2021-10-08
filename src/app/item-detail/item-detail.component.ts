import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/Http';
import {item} from '../item/item';
import { Observable } from 'rxjs';
import {catchError, retry, map} from 'rxjs/operators';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
  providers:[]
})
@Injectable({
  providedIn: 'root',
})
export class ItemDetailComponent implements OnInit {
  itemString: string;
 myData :any =  [];
  stuff: Object;
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
          console.log('before stringify');
          this.itemString = JSON.stringify(this.myData[0]);
          
          console.log('after stringify');
          this.myItem = JSON.parse(this.itemString);
          console.log('after parse');
          console.log('myData ends');
        })
     }
}