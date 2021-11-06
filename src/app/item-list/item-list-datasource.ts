import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { item } from '../item/item';

// TODO: Replace this with your own data model type


// TODO: replace this with real data from your application
const EXAMPLE_DATA: item[] = [
  {id: 1, dealerId: 57, inventoryNumber: 'S0000',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1,soldDate:null,soldPrice:1,collectionName:null  },
  {id: 2, dealerId: 57, inventoryNumber: 'Helium',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1,soldDate:null,soldPrice:1,collectionName:null },
  {id: 3,dealerId: 57,  inventoryNumber: 'Lithium',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1,soldDate:null,soldPrice:1,collectionName:null },
  {id: 4,dealerId: 57,  inventoryNumber: 'Beryllium',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1 ,soldDate:null,soldPrice:1,collectionName:null},
  {id: 5,dealerId: 57,  inventoryNumber: 'Boron',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1,soldDate:null,soldPrice:1, collectionName:null },
  {id: 6,dealerId: 57,  inventoryNumber: 'Carbon',description:'gas',keywords:'',manufacturer:'',manufacturingLine:'',cost:1,currentPrice:1,minimumPrice:1, pricingPlanId:1,isAvailable:true,isShippable:true,quantity:1 ,soldDate:null,soldPrice:1,collectionName:null},
];
/**
 * Data source for the ItemList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ItemListDataSource extends DataSource<item> {
  data: item[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private myItems: item[]) {
    super();
    console.log("ILDS",this.myItems)
    this.data = this.myItems;
    console.log("ILDS data",this.data)
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<item[]> {
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
  private getPagedData(data: item[]): item[] {
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
  private getSortedData(data: item[]): item[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'description' : return compare(a.description, b.description, isAsc);
        case 'inventoryNumber': return compare(a.inventoryNumber, b.inventoryNumber, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'cost': return compare(+a.cost, +b.cost, isAsc);
        case 'currentPrice': return compare(+a.currentPrice, +b.currentPrice, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
