import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  view: any[] = [window.innerWidth, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  single = [
    {
      'name': 'Aberta',
      'value': 25
    },
    {
      'name': 'Resolvidas',
      'value': 34
    }
  ];

  constructor() { }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

}
