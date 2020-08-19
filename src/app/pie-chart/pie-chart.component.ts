import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  private data = [
    { "Framework": "Vue", "Stars": "166443" },
    { "Framework": "React", "Stars": "150793" },
    { "Framework": "Angular", "Stars": "62342" },
    { "Framework": "Backbone", "Stars": "27647" },
    { "Framework": "Ember", "Stars": "21471" },
  ];
  private svg;
  private margin = 50;
  private width = 450;
  private height = 400;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  ngOnInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
    this.drawDoughnut();
  }

  private createSvg() {
    this.svg = d3.select("div#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }
  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.Stars.toString()))
      .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    let pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d, i) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(30)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text(d => d.data.Framework)
      .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }




// doughnutChart
  drawDoughnut(){
    let data = [{name:'a',value:2},{name:'b',value:4},{name:'c',value:6},{name:'d',value:8}]
    // var data = [2, 4, 8, 10];
    let radius = 100;

    let svg = d3.select("#doughnutChart")
                .append("svg")
                .attr('height',200)
                .attr('width',200)
    let g = svg.append("g").attr("transform", "translate(" + radius + "," + radius + ")");

    var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    // Generate the pie
    var pie = d3.pie<any>()
                .startAngle(-0.5 * Math.PI)
                .endAngle(0.5 * Math.PI)
                .sort(null)
                .value((d) => d.value);

    // Generate the arcs
    var arc = d3.arc<any>()
                .innerRadius(60)
                .outerRadius(radius);

    //Generate groups
    var arcs = g.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc")

    //Draw arc paths
    arcs.append("path")
        .attr("fill", (d, i) => color(i.toString()) )
        .attr("d", arc);

     let titleLabel = svg
        .append('text')
        .text('title text')
        .attr('id', 'title')
        .attr('x', 100)
        .attr('y', 80)
        .style('font-size', '10px')
        .style('text-anchor', 'middle');

    let labels = g
    .selectAll('allLabels')
    .data(pie(data))
    .enter()
    .append('text')
    .text((d, i) => 'label '+i )
    .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')' )
    .style('font-size', '8px')
    .style('text-anchor', 'middle');
      this.createNeedle(g, radius,50)
  }

  createNeedle(g, radius, p){ // p => percentage or scale
    let pp = p - 50;
    let a = pp * Math.PI / (radius)
    let x = radius * Math.sin(a)
    let y = radius * Math.cos(a)
    let needleLen = radius-20
    let needleRadius = 5
    let r1 = needleRadius * Math.sin(a)
    let r2 = needleRadius * Math.cos(a)
    let centerX = 0
    let centerY = 0

    let topX = centerX +x
    let topY = centerY -y
    
    let leftX = centerX - r2
    let leftY = centerY - r1

    let rightX = centerX - -(r2)
    let rightY = centerY - -(r1)

    g.append('path')
      .attr('d', `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`)

  }

  createColor(){
    // this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    // Below is an example of using custom colors
    // this.colorScale = d3.scaleOrdinal().domain([0,1,2,3]).range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']);
  }

}
