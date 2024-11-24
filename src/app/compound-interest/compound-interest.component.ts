import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-compound-interest',
  templateUrl: './compound-interest.component.html',
  styleUrls: ['./compound-interest.component.scss'],
  imports: [CommonModule, FormsModule, NgxEchartsDirective],
  providers: [
    provideEcharts(), 
  ],
})
export class CompoundInterestComponent implements OnInit{

  principal: number = 0;
  rate: number = 0;
  time: number = 0;

  chartOptions: any = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
      },
    ],
  };

  ngOnInit(): void {
    console.log("Compound Interest Component Loaded");
  }

  calculateCompoundInterest() {
    const years: string[] = [];
    const values: number[] = [];

    if (this.principal <= 0 || this.rate <= 0 || this.time <= 0) {
      alert('Please enter valid numbers for Principal, Rate, and Time.');
      return;
    }

    for (let t = 0; t <= this.time; t++) {
      years.push(`Year ${t}`);
      const amount = this.principal * Math.pow(1 + this.rate / 100, t); // Compound Interest Formula
      values.push(parseFloat(amount.toFixed(2))); // Round to 2 decimal places
    }

    // Reassign chartOptions to trigger update
    this.chartOptions = {
      xAxis: {
        type: 'category',
        data: years,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: values,
          type: 'line',
          smooth: true,
        },
      ],
    };
  }
}
