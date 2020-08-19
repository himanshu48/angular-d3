import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BubbleMapComponent } from './bubble-map/bubble-map.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { IndiaMapComponent } from './india-map/india-map.component';
import { TreeChartComponent } from './tree-chart/tree-chart.component';


const routes: Routes = [
  {path:'bar', component:BarChartComponent},
  {path:'pie', component:PieChartComponent},
  {path:'scatter', component:ScatterPlotComponent},
  {path:'bubble', component:BubbleMapComponent},
  {path:'indiamap', component:IndiaMapComponent},
  {path:'worldmap', component:WorldMapComponent},
  {path:'tree', component:TreeChartComponent},
  {path:'**', component:BarChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
