import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ItemDetailTableDataSource } from './item-detail-table-datasource';
import { item } from '../item/item';
import { ItemService } from '../item/item.service';

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
  displayedColumns = ['id', 'name','dealerId','cost','CurrentPrice'];

  constructor(private ids : ItemService) {

    this.anItem = new item();
    this.myItems = this.ids.getData();
    this.dataSource = new ItemDetailTableDataSource(this.myItems);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
