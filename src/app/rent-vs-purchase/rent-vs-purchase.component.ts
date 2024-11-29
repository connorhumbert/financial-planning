import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-rent-vs-purchase',
  standalone: true,
  templateUrl: './rent-vs-purchase.component.html',
  styleUrl: './rent-vs-purchase.component.scss',
  imports: [CommonModule, FormsModule, NgxEchartsDirective],
  providers: [
    provideEcharts(), 
  ],
})
export class RentVsPurchaseComponent {

  purchasePrice: number = 0;
  monthlyPayment: number = 0;
  downPayment: number = 0;
  rate: number = 0;

  rentPurchasePrice: number = 0;
  rentMonthlyPayment: number = 0;


  calculateCompoundInterest() {}

}
