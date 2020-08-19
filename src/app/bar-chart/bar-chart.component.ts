import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  private data = [
    { "Framework": "Vue", "Stars": "166443" },
    { "Framework": "React", "Stars": "150793" },
    { "Framework": "Angular", "Stars": "62342" },
    { "Framework": "Backbone", "Stars": "27647" },
    { "Framework": "Ember", "Stars": "21471" },
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    this.drawLineChart();
  }

  private createSvg() {
    this.svg = d3.select("div#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data) {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.4);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Framework))
      .attr("y", d => y(d.Stars))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.Stars))
      .attr("fill", "#d04a35");
  }

  drawLineChart() { // copy css
    let data = [
      { year: 2010, value: 658 },
      { year: 2011, value: 758 },
      { year: 2012, value: 728 },
      { year: 2013, value: 800 },
      { year: 2014, value: 860 },
      { year: 2015, value: 900 },
      { year: 2016, value: 810 },
    ]
    let height = 400, width = 400;

    let n = data.length;
    let svg = d3.select("#lineChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,10)");


    let xScale = d3.scaleBand<any>()
    .range([0, width-20])
    .domain(data.map(d => d.year))
    .padding(0.4);

    let yScale = d3.scaleLinear()
      .domain([500, d3.max(data, d => d.value)])
      .range([height-40, 0]);

    let line = d3.line<any>()
      .x((d, i) => xScale(d.year))
      .y( d => yScale(d.value))
      .curve(d3.curveMonotoneX)
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height-40) + ")")
      .call(d3.axisBottom(xScale));
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale));

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#ffab00")
      .attr("stroke-width", "3")
      .attr("d", line);

    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("fill", "#ffab00")
      .attr("stroke", "#fff")
      .attr("cx", d => xScale(d.year) )
      .attr("cy", d => yScale(d.value) )
      .attr("r", 5)

  }

}
