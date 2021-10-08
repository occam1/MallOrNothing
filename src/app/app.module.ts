import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';
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
    FurnitureItemComponent
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
        {path:"Store",component:StoreComponent}
        
  ])
    /* AppRoutingModule */
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
