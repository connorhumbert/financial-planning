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
  downPayment: number = 0;
  rate: number = 6;
  incomeFromPledge: number = 0;
  pledgeAmount: number = 0;
  taxSavings: number = 0;
  realEstateTax: number = 1;
  homeOwnerIns: number = .0025;

  rentPurchasePrice: number = 0;
  rentMonthlyPayment: number = 0;

  downPaymentPurchasePrice: number = 0;
  downPaymentTaxSavings: number = 0;
  mortgageAmountDownPayment: number = 0;

  showAdvanced = false;

  taxBracket: number = 30; // Default selection
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
    // Base Purchase Price without tax savings
    this.purchasePrice = 
      (this.rentMonthlyPayment * 12) / (
        (this.rate/100) + (this.realEstateTax/100) + (this.homeOwnerIns)
        );
    console.log("base purchase price:" + this.purchasePrice);
    let taxCap: number = 1000000 *  (this.rate/100) * (this.taxBracket/100);
    console.log("tax cap:" + taxCap);
    //Compute Tax Savings
    let taxSavings: number = this.purchasePrice * (this.rate/100) * (this.taxBracket/100);
    console.log("tax savings:" + taxCap);
    if (taxSavings > taxCap) taxSavings = taxCap;
    console.log("tax savings after capping :" + taxCap);
    this.purchasePrice = 
    ((this.rentMonthlyPayment * 12) + taxSavings) / (
      (this.rate/100) + (this.realEstateTax/100) + (this.homeOwnerIns)
      );
    console.log("purchase price before pledge" + this.purchasePrice);


    let purchasePriceBeforePledgeCalculations = this.purchasePrice;
    // this.downPaymentPurchasePrice = Math.round(this.purchasePrice); 


    this.downPaymentPurchasePrice = this.calculateAmortizedMaxPurchasePrice({
      monthlyBudget: this.rentMonthlyPayment,
      interestRateAnnual: this.rate,
      loanTermYears: 30,
      downPaymentPercent: 20,
      propertyTaxRateAnnual: this.realEstateTax,
      insuranceRateAnnual: this.homeOwnerIns,
      taxBracket: this.taxBracket
    });
    this.mortgageAmountDownPayment = Math.round(this.downPaymentPurchasePrice * .80);  // set .8 to a const
    this.downPayment = Math.round(this.downPaymentPurchasePrice * .20);

    //this adds on the amount you'll make by keeping your down payment in the stock market
    for (let i = 0; i < 25; i++){
      this.purchasePrice =
        ( 
          (this.purchasePrice * .20 * .04) / (this.rate/100)
        ) + purchasePriceBeforePledgeCalculations
      }
      this.purchasePrice = Math.round(this.purchasePrice);


    this.pledgeAmount = Math.round(this.purchasePrice * 0.39);
    this.incomeFromPledge = Math.round(this.purchasePrice * .20 * .04);

    //purchase price is capped at a million dollars 
    this.taxSavings = Math.round(Math.min(this.purchasePrice, 1000000) * (this.rate / 100) * (this.taxBracket / 100)); // TODO set 1 mil to a const
    this.downPaymentTaxSavings = Math.round(Math.min(this.mortgageAmountDownPayment, 1000000) * (this.rate / 100) * (this.taxBracket / 100));
  }

  calculateAmortizedMaxPurchasePrice({
    monthlyBudget,
    interestRateAnnual,
    loanTermYears,
    downPaymentPercent,
    propertyTaxRateAnnual,
    insuranceRateAnnual,
    taxBracket
  }: {
    monthlyBudget: number;
    interestRateAnnual: number;
    loanTermYears: number;
    downPaymentPercent: number;
    propertyTaxRateAnnual: number;
    insuranceRateAnnual: number;
    taxBracket: number;
  }): number {
    const maxIterations = 100;
    const tolerance = 1; // allow $1 difference
    let lower = 0;
    let upper = 10_000_000;
    let guess = 0;
  
    for (let i = 0; i < maxIterations; i++) {
      guess = (lower + upper) / 2;
      const loanAmount = guess * (1 - downPaymentPercent / 100);
      const monthlyInterestRate = (interestRateAnnual * (1 - taxBracket / 100)) / 100 / 12;
      const totalMonths = loanTermYears * 12;
  
      const monthlyLoanPayment =
        loanAmount *
        (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths)));
  
      const monthlyPropertyTax = (propertyTaxRateAnnual / 100 / 12) * guess;
      const monthlyInsurance = (insuranceRateAnnual / 100 / 12) * guess;
  
      const totalMonthlyPayment = monthlyLoanPayment + monthlyPropertyTax + monthlyInsurance;
  
      if (Math.abs(totalMonthlyPayment - monthlyBudget) < tolerance) {
        break;
      }
  
      if (totalMonthlyPayment > monthlyBudget) {
        upper = guess;
      } else {
        lower = guess;
      }
    }
  
    return Math.round(guess);
  }
  
}
