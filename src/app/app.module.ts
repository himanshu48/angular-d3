import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { BubbleMapComponent } from './bubble-map/bubble-map.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { IndiaMapComponent } from './india-map/india-map.component';

@NgModule({
  declarations: [
    AppComponent,
    BubbleMapComponent,
    BarChartComponent,
    PieChartComponent,
    ScatterPlotComponent,
    WorldMapComponent,
    IndiaMapComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
