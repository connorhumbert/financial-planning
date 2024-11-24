import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { CompoundInterestComponent } from './compound-interest/compound-interest.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompoundInterestComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'financial-planning';

  ngOnInit(): void {
    console.log("App loaded");
  }
}
