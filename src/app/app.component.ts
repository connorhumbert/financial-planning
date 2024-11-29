import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { CompoundInterestComponent } from './compound-interest/compound-interest.component';
import { RentVsPurchaseComponent } from './rent-vs-purchase/rent-vs-purchase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompoundInterestComponent, RentVsPurchaseComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'financial-planning';

  ngOnInit(): void {
    console.log("App loaded");
  }
}
