import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/Http';
import {item} from './items';
import { Observable } from 'rxjs';
import {catchError, retry} from 'rxjs/operators';


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
  itemString: string;
  stuff: Object;
  myItems: item[];

  constructor(private http: HttpClient) { 
    const headerDict = {'Content-Type':'application/json',
      'Accept':'application/json', 'Access-Control-Allow-Headers':'Content-Type',
      'Access-Control-Allow-Origin':'http://localhost:5000/*',};
    console.log(headerDict);
      const aheaders = new HttpHeaders(headerDict);
      
    //get the items
    console.log('calling api');
    this.stuff = this.http.get<item>( 'http://localhost:4200/api/Item/GetItems',   
    {headers : aheaders}).subscribe(res=>console.log(res.description));
    console.log('called api')
    
    console.log(this.stuff);
    this.itemString = this.stuff.toString();
    console.log(this.itemString);

  }

  ngOnInit(): void {

  }

}
