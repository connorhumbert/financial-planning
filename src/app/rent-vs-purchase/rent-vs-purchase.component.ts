import { Component, OnInit } from '@angular/core';
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
export class RentVsPurchaseComponent implements OnInit {

  purchasePrice: number = 0;
  mortgagePayment: number = 0;
  downPayment: number = 0;
  rate: number = 6;
  incomeFromPledge: number = 0;
  pledgeAmount: number = 0;
  taxSavings: number = 0;
  realEstateTax: number = 1;
  homeOwnerIns: number = .0025;
  hoaFee: number = 0;

  rentPurchasePrice: number = 0;
  rentMonthlyPayment: number = 0;
  rentDownPayment: number = 0;

  taxBracket: number = 10; // Default selection
  incrementOptions: number[] = [];
  
  ngOnInit() {
    // Populate dropdown options dynamically
    this.incrementOptions = Array.from({ length: 9 }, (_, i) => (i + 2) * 5); // [10, 15, 20, ..., 50]
  }
  
  onIncrementChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    this.taxBracket = parseInt(selectElement.value, 10); // Update selected increment
    this.onRentMonthlyPaymentChange("");
  }


  onRentMonthlyPaymentChange(newValue: string): void {
    // This is how much home you can buy with the 100% finance program
    this.purchasePrice = 
      (this.rentMonthlyPayment * 12) / (
        (this.rate/100) + (this.realEstateTax/100) + (this.homeOwnerIns) - ((this.taxBracket/100) * (this.rate/100))
        );

    // this adds on the amount you'll make by keeping your down payment in the stock market
    this.purchasePrice = Math.round(
      ( 
        (this.purchasePrice * .20 * .05) / (this.rate/100)
      ) + this.purchasePrice 
    )

    this.pledgeAmount = Math.round(this.purchasePrice * 0.39);
    this.incomeFromPledge = Math.round(this.purchasePrice * .20 * .05);

    //purchase price is capped at a million dollars 
    this.taxSavings = Math.round(Math.min(this.purchasePrice, 1000000) * (this.rate / 100) * (this.taxBracket / 100));

    this.mortgagePayment = this.rentMonthlyPayment;
  }
  
  // Helper method to format numbers with commas
  formatNumber(value: number): string {
    return value.toLocaleString('en-US');
  }
  

}
