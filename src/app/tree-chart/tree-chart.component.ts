import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-tree-chart',
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.scss']
})
export class TreeChartComponent implements OnInit {

  value = "tree"

  ngOnInit(): void {
    this.drawTree();
  }

  drawTree(){
    let height = 2400, width = 960
    let svg = d3.select("#treeChart")
              .append('svg')
              .attr('width',width)
              .attr('height',height)
    let g = svg.append("g").attr("transform", "translate(40,0)");
    let tree = d3.tree().size([height - 400, width - 160]);
    let cluster = d3.cluster().size([height, width - 160]);
    let stratify = d3.stratify<any>()
                  .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

    d3.csv<any>("assets/data/flare.csv", function(error, data) {
      if (error) throw error;
    
      var root = stratify([data])
          .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });
    
      cluster(root);
    
      var link = g.selectAll(".link")
          .data(root.descendants().slice(1))
        .enter().append("path")
          .attr("class", "link")
          .attr("d", diagonal);
    
      var node = g.selectAll(".node")
          .data<any>(root.descendants())
        .enter().append("g")
          .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
    
      node.append("circle")
          .attr("r", 2.5);
    
      node.append("text")
          .attr("dy", 3)
          .attr("x", function(d) { return d.children ? -8 : 8; })
          .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
    
      d3.selectAll("input")
          .on("change", changed);
    
      var timeout = setTimeout(function() {
        d3.select("input[value=\"tree\"]")
            .property("checked", true)
            .dispatch("change");
      }, 1000);
    
      function changed() {
        clearTimeout(timeout);
        (this.value === "tree" ? tree : cluster)(root);
        var t = d3.transition().duration(750);
        node.transition(t)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
        link.transition(t).attr("d", diagonal);
      }
    });

    function diagonal(d) {
      return "M" + d.y + "," + d.x
          + "C" + (d.parent.y + 100) + "," + d.x
          + " " + (d.parent.y + 100) + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
    }

  }

}
