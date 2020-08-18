import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as topojson from "topojson-client";

declare var require:any;
const worldMap = require('../../assets/countries-10m.json');

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  private svg;

  ngOnInit(): void {
    this.createSvg();
    this.drawChart();
  }

  private createSvg() {
    d3.selectAll("div#worldmap > *").remove();
    this.svg = d3.select("div#worldmap")
      .append("svg")
      .attr("viewBox", "0, 0, 960, 410")
      // .attr("transform", "translate(0,10)");
  }

  drawChart(){
    let format = d3.format(",.0f");
    let features = new Map(topojson.feature(worldMap, worldMap.objects.countries).features.map(d => [d.id, d]));
    
    let countries = topojson.feature(worldMap, worldMap.objects.countries)
    
    let projection = d3.geoMercator()
                        .center([0, 25 ])
                        .scale(100)
    let path = d3.geoPath().projection(projection);

    this.svg.append("path")
          .datum(topojson.feature(worldMap, worldMap.objects.countries))
          .attr("fill", "grey")
          .attr("stroke", "white")
          .attr("stroke-width", "0.25px")
          // .attr("stroke-linejoin", "round")
          .attr("d", path);

    const legend = this.svg.append("g")
          .attr("fill", "#777")
          .attr("transform", "translate(915,608)")
          .attr("text-anchor", "middle")
          .style("font", "10px sans-serif")
        .selectAll("g")
          .data(44) // data
        .join("g");
  }

  // private createSvg() {
  //   let margin = {
  //     top: 50,
  //     left: 50,
  //     right: 50,
  //     bottom: 50,
  //   }
  //   let height = 400;
  //   let width = 800;

  //   this.svg = d3.select("div#worldmap")
  //     .append("svg")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .append("g")
  //     .attr("transform", `translate(${margin.left},${margin.top})`);
  // }

  // private drawChart(){
  //   let countries = topojson.feature(worldMap, worldMap.objects.countries);

  //   let projection = d3.geoMercator()
  //                       .translate([400,200]) // width/2 , height/2

  //   let path = d3.geoPath().projection(projection);

  //   this.svg.selectAll(".country")
  //           .data(countries)
  //           .enter().append("path")
  //           .attr("class","country")
  //           .attr("d",path)
  // }

}
