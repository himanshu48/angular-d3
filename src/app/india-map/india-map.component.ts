import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as topojson from "topojson-client";

declare var require:any;
const india = require('../../assets/map/india.json');

@Component({
  selector: 'app-india-map',
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.scss']
})
export class IndiaMapComponent implements OnInit {

  constructor() { }
  private svg;

  ngOnInit(): void {
    console.log(india);
    this.createSvg();
    this.drawChart();
    
  }

  createSvg() {
    d3.selectAll("div#indiamap > *").remove();
    this.svg = d3.select("div#indiamap")
      .append("svg")
      .attr("viewBox", "0, 0, 430, 480")
      // .attr("transform", "translate(0,10)");
  }

  drawChart(){
    
    let projection = d3.geoMercator()
                        .center([102, 22 ])
                        .scale(800)
    let path = d3.geoPath().projection(projection);

    this.svg.append("path")
          .datum(topojson.feature(india, india.objects.polygons))
          .attr("fill", "grey")
          .attr("stroke", "white")
          .attr("stroke-width", "0.25px")
          .attr("d", path);

this.fillColor(path)

    this.svg.selectAll(".state-label")
    .data(topojson.feature(india, india.objects.polygons).features)
    .enter().append("text")
    .attr("class", "state-label")
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("font-size", ".4em")
    .style("text-shadow", "0px 0px 2px #fff")
    .style("text-transform", "uppercase")
    .text(function(d) { return d.properties.st_nm; });

    this.svg.append("path")
    .datum(topojson.mesh(india, india.objects.polygons, function(a, b) { return a === b; }))
    .attr("d", path)
    .attr("class", "india-boundary")
    .attr("fill", "none")
    .attr("stroke", "#3a403d");
  }

  fillColor(path) {
    let c = d3.scaleOrdinal(d3.schemeCategory10);
    let states = this.svg.selectAll(".subunit")
    .data(topojson.feature(india, india.objects.polygons).features)
    .enter().append("path")
    .attr("class", "subunit")
    .attr("d", path)
    .style("stroke", "#fff")
    .style("stroke-width", "1px");
        
    states.style("fill", function(d,i){ return c(i); })
    .style("opacity", ".4");
  }

}
