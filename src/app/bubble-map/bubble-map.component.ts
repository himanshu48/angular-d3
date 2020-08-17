import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
// import {select, selectAll} from "d3-selection";
import {geoPath, GeoPermissibleObjects} from "d3-geo";
// import * as d3GeoProjection from "d3-geo-projection";
import * as topojson from "topojson-client";

declare var require:any;
const us = require('../../assets/us.json');
const population = require('../../assets/us-population.json');

@Component({
  selector: 'app-bubble-map',
  templateUrl: './bubble-map.component.html',
  styleUrls: ['./bubble-map.component.scss']
})
export class BubbleMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.chart()
  }

  chart(){

    let format = d3.format(",.0f");
    let path = d3.geoPath();
    let features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]));
    let tempPopulation = <Array<any>>population
    let data = tempPopulation.slice(1).map(([population, state, county]) => {
      const id = state + county;
      const feature = <GeoPermissibleObjects>features.get(id);
      
      return {
        id,
        position: feature && path.centroid(feature),
        title: feature && feature['properties'].name,
        value: +population
      };
    })

    let radius = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.value)])
    .range([0, 40]);

      let svg = d3.select("div#bubble").append("svg")
          .attr("viewBox", "0, 0, 975, 610");
    
      svg.append("path")
          .datum(topojson.feature(us, us.objects.nation))
          .attr("fill", "#ddd")
          .attr("d", path);
    
      svg.append("path")
          .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-linejoin", "round")
          .attr("d", path);
    
      const legend = svg.append("g")
          .attr("fill", "#777")
          .attr("transform", "translate(915,608)")
          .attr("text-anchor", "middle")
          .style("font", "10px sans-serif")
        .selectAll("g")
          .data(radius.ticks(4).slice(1))
        .join("g");
    
      legend.append("circle")
          .attr("fill", "none")
          .attr("stroke", "#ccc")
          .attr("cy", d => -radius(d))
          .attr("r", radius);
    
      legend.append("text")
          .attr("y", d => -2 * radius(d))
          .attr("dy", "1.3em")
          .text(radius.tickFormat(4, "s"));
    
      svg.append("g")
          .attr("fill", "brown")
          .attr("fill-opacity", 0.5)
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5)
        .selectAll("circle")
        .data(data
            .filter(d => d.position)
            .sort((a, b) => d3.descending(a.value, b.value)))
        .join("circle")
          .attr("transform", d => `translate(${d.position})`)
          .attr("r", d => radius(d.value))
        .append("title")
          .text(d => `${d.title}
    ${format(d.value)}`);
    
      return svg.node();

  }

}
