import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { GeoPermissibleObjects } from 'd3';

declare var require:any;
const worldMap = require('../../assets/map/countries-10m.json');
const worldData = require('../../assets/data/worldHeatMapData.json');

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
    // d3.selectAll("div#worldmap > *").remove();
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

    // data
    let data = worldData.map(e=>{
      const feature = <GeoPermissibleObjects>features.get(e.id);
      return {
        ...e,
        position: feature && path.centroid(feature),
      };
    })

    let radius = d3.scaleSqrt<any>()
    .domain([0, d3.max(data, d => Number(d['value']))])
    .range([0, 10]);

    // const legend = this.svg.append("g")
    //       .attr("fill", "#777")
    //       .attr("transform", "translate(915,608)")
    //       .attr("text-anchor", "middle")
    //       .style("font", "10px sans-serif")
    //     .selectAll("g")
    //       .data(radius.ticks(4).slice(1))
    //     .join("g");

    //     legend.append("circle")
    //     .attr("fill", "none")
    //     .attr("stroke", "#ccc")
    //     .attr("cy", d => -radius(d))
    //     .attr("r", radius);

    //     legend.append("text")
    //       .attr("y", d => -2 * radius(d))
    //       .attr("dy", "1.3em")
    //       .text(radius.tickFormat(4, "s"));

          this.svg.append("g")
          .attr("fill", "brown")
          .attr("fill-opacity", 0.5)
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5)
        .selectAll("circle")
        .data(data)
        .join("circle")
          .attr("transform", d => `translate(${d.position})`)
          .attr("r", d => radius(d.value))
        .append("title")
          .text(d => `${d.country}
    ${format(d.value)}`);


    // this.svg.append("g").selectAll(".centroid").data(data)
    // .enter().append("circle")
    //   .attr("class", "centroid")
    //   .attr("fill", "brown")
    //   .attr("stroke", "#fff")
    //   .attr("stroke-width", 0.5)
    //   .attr("r", radius)
    //   .attr("cx", function (d){ return d[0]; })
    //   .attr("cy", function (d){ return d[1]; });

// code for zoom
//     var zoom = d3.behavior.zoom()
//   .scaleExtent([1, 20])
//   .on("zoom", zoomed);

// var rect = svg.append("rect")
//   .attr("width", width)
//   .attr("height", height)
//   .style("fill", "none")
//   .style("pointer-events", "all")
//   .call(zoom);
// function zoomed(){
//   g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
// }

  }



}
