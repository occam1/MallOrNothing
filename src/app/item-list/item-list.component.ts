import { ItemService } from './../item/item.service';
import { Router, ActivatedRoute, ParamMap, NavigationExtras} from '@angular/router';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ItemListDataSource } from './item-list-datasource';
import { item } from '../item/item';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<item>;
  dataSource: ItemListDataSource ;
  obItem : Observable<item[]>;
  myItems : item[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','dealerId'
  ,'inventoryNumber' ,'description',
  'keywords','cost','manufacturer','manufacturingLine','currentPrice','minimumPrice','pricingPlanId'];
  //'manufacturingLine','cost','isAvailable','isShippable',
  //'quantity'];
 done : boolean = false;

  constructor(private ids : ItemService,private router: Router) {
    this.obItem = this.ids.getData();
   


    }
    ngOnInit(){
      this.obItem
      .subscribe((response : item[]) => {this.myItems = response;
        this.dataSource = new ItemListDataSource(this.myItems);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
       console.log("ILC subscribe myItems",this.myItems, Date.now());
      });
     // (error) => {console.log('getData error', error)}
     // ) ;
       console.log("ILC ngo myItems",this.myItems,Date.now());

  
    }
    onItemSelected(itemId : number): void {
      console.log("itemSelected as is", itemId);
      this.ids.selectItem(itemId, this.myItems);
      this.router.navigate(['/Item']);
      
    }

  ngAfterViewInit(): void {
 //   this.obItem
 //   .subscribe((response : item[]) => {this.myItems1 = response;
 //     this.dataSource = new ItemListDataSource(this.myItems1);
 //     this.dataSource.sort = this.sort;
 //     this.dataSource.paginator = this.paginator;
 //     this.table.dataSource = this.dataSource;
 //    console.log("ILC subscribe myItems1",this.myItems1, Date.now());
 //   },
 //   (error) => {console.log('getData error', error)}
 //   ) ;
  //   console.log("ILC ngo myItems1",this.myItems1,Date.now());
  }
}
