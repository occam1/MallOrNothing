import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { DealerComponent } from './dealer/dealer.component';
import { BoothComponent } from './booth/booth.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { FurnitureDetailComponent } from './furniture-detail/furniture-detail.component';
import { FurnitureSurfaceComponent } from './furniture-surface/furniture-surface.component';
import { SurfaceAreaComponent } from './surface-area/surface-area.component';
import { ItemComponent } from './item/item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { FurnitureItemComponent } from './furniture-item/furniture-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemDetailTableComponent } from './item-detail-table/item-detail-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { AddAuthHeader } from 'src/addAuthHeader';
import { ItemPictureComponent } from './item/item-picture/item-picture.component';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    DealerComponent,
    BoothComponent,
    FurnitureComponent,
    FurnitureDetailComponent,
    FurnitureSurfaceComponent,
    SurfaceAreaComponent,
    ItemComponent,
    ItemDetailComponent,
    FurnitureItemComponent,
    ItemDetailTableComponent,
    ItemPictureComponent,
    AuthenticateComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([{path:"Dealer",component:DealerComponent},
        {path:"Furniture",component:FurnitureComponent},
        {path:"Booth",component:BoothComponent},
        {path:"Item",component:ItemComponent},
        {path:"ItemDetail",component:ItemDetailComponent},
        {path:"ItemDetailTable",component:ItemDetailTableComponent},
        {path:"ItemPicture", component:ItemPictureComponent},
        {path:"Store",component:StoreComponent},
        {path:"ItemList",component:ItemListComponent}
        
  ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
    /* AppRoutingModule */
  ],
  providers: [HttpClient,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AddAuthHeader,
    multi: true  
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
