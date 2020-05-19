import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet, Color } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  constructor() { }
  
  ngOnInit() {
  }
  
  public barChartColors: any[] = [
    { 
      backgroundColor:["#58A5BE", "#d64161", "#feb236", "#58A5BE", "#B9E8E0"] 
    }];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Mobile', 'Tv', 'Head Phones', 'Laptop', 'Camera'];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [60, 55, 65, 80, 46], label: 'Eloctronics' }
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Iphone'], ['Vivo'], 'Samsung'];
  public pieChartData: SingleDataSet = [100, 200, 400];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


}
