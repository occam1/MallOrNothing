import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/Http';
import {item} from './item';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
stuff : any;
aHeader : HttpHeaders;
selectedItem: item;
itemSelectedEvent = new EventEmitter<item>();
 

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

 getData() : Observable<item []>  {
    console.log('start of getData');
    return this.http.get<item[]>( 'http://localhost:4200/api/Item/GetItemsByDealer', 
                         {headers : this.aHeader});
  

    //).toPromise().then( data => {  
    //        for (let key in data)
    //      {
    //        console.log(key.toString());
    //       if (data.hasOwnProperty(key))  
    //       { 
    //         
    //        this.myItems.push(data[key]);
    //        console.log(this.myItems[key].inventoryNumber);
    //        console.log('retrieved items - count in loop');
    //        console.log(this.myItems.length.toString());
    //       }
    //      } 
    //      console.log('retrieved items - count - outside loop');
    //      console.log(this.myItems.length.toString());
    //      console.log("first inv# " );
    //      console.log(this.myItems[0].inventoryNumber);
     //     return this.myItems;
      //  })

  
      }
      selectItem(id: number, myItems: item[]){
      console.log("in itemService selectItem", id);  
      this.selectedItem = myItems.find(i => i.id == id);
      console.log("in itemService selectedItem",this.selectedItem);
      this.itemSelectedEvent.emit(this.selectedItem);
        
      }
      insertItem(newItem){
        this.http.post('http://localhost:4200/api/Item/InsertItem/', newItem)
        .subscribe(data=>{console.log(data)},
        error => console.log(error));

      }
      updateItem(newItem){
        this.http.post('http://localhost:4200/api/Item/UpdateItem/', newItem)
        .subscribe(data=>{console.log(data)},
        error => console.log(error));

      }
}
