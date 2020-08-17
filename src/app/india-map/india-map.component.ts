import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as topojson from "topojson-client";

@Component({
  selector: 'app-india-map',
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.scss']
})
export class IndiaMapComponent implements OnInit {

  constructor() { }
  private svg;

  ngOnInit(): void {
  }

}
