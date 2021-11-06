import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { item } from '../item/item';

// TODO: Replace this with your own data model type
export interface ItemDetailTableItem {
  id: number;
  dealerId: number;
  name: string;
  description: string;
  keywords: string;
  manufacturer: string;
  manufacturingLine: string;
  cost: number;
  currentPrice: number;
  minimumPrice: number;
  pricingPlanId: number;
  isAvailable: boolean;
  isShippable: boolean;
  quantity: number;
  
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ItemDetailTableItem[] = [
  {id: 1, dealerId: 57, name: 'Hydrogen',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1  },
  {id: 2, dealerId: 57, name: 'Helium',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1 },
  {id: 3,dealerId: 57,  name: 'Lithium',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1 },
  {id: 4,dealerId: 57,  name: 'Beryllium',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1 },
  {id: 5,dealerId: 57,  name: 'Boron',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1 },
  {id: 6,dealerId: 57,  name: 'Carbon',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1 },
];


/**
 * Data source for the ItemDetailTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ItemDetailTableDataSource extends DataSource<ItemDetailTableItem> {
  data: ItemDetailTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  myItems: item [] = [];
   ;

  constructor() {
    super();
    
    EXAMPLE_DATA.forEach(aRow => 
      {
        console.log('aRow');
        console.log(aRow);
        console.log(aRow.id);
        console.log('after aRow');

      });
      console.log('my items - populated');
      console.log(this.myItems);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ItemDetailTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ItemDetailTableItem[]): ItemDetailTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ItemDetailTableItem[]): ItemDetailTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
