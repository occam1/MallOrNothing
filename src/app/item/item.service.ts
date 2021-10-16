import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/Http';
import {item} from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
myItems : item [] = [];
aHeader : HttpHeaders;
 

  constructor(private http: HttpClient) {
    const headerDict = {
      'Content-Type':'application/json',
      'Accept':'*/*', 
      'Access-Control-Allow-Headers':'Content-Type',
      'Access-Control-Allow-Origin':'http://localhost:4200/*',};

     
    console.log(headerDict);
    this.aHeader  = new HttpHeaders(headerDict);
   }
 
   
    //{headers : aheaders}).subscribe((res)=>console.log(res.description));

  getData() {
    console.log('start of getData');
    this.http.get<item>( 'http://localhost:4200/api/Item/GetItems', 
                         {headers : this.aHeader}  
    ).toPromise().then( data => {  
        for (let key in data)
          {
           if (data.hasOwnProperty(key))  
           { 
            this.myItems.push(data[key])
           }
          } 
        
        })
    return this.myItems;
      }
}
