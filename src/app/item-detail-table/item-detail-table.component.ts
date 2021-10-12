import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ItemDetailTableDataSource } from './item-detail-table-datasource';
import { item } from '../item/item';
@Component({
  selector: 'app-item-detail-table', 
  templateUrl: './item-detail-table.component.html',
  styleUrls: ['./item-detail-table.component.css']
})
export class ItemDetailTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<item>;
  dataSource: ItemDetailTableDataSource;
  myItems : item [] = [];
  anItem : item;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','dealerId','cost'];

  constructor() {

    this.anItem = new item();
    this.anItem ={id: 7, dealerId: 57, name: 'thulium',description:'metalhydride',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1 ,isAvailable:true,soldDate: '12/25/1998',soldPrice:1,isShippable:true,quantity:2};
    this.myItems.push(this.anItem)
    this.dataSource = new ItemDetailTableDataSource(this.myItems);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
