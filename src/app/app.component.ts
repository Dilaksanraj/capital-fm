import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'capital-fm';


  constructor(
    
    private _router: Router,
  ){

  }

  ngOnInit(): void {
      
  }

  openChampionPage(e: MouseEvent): void
  {
      e.preventDefault();

      this._router.navigate(['/champion'])
  }
  openChampionPage2(e: MouseEvent): void
  {
      e.preventDefault();

      this._router.navigate(['/champion_2'])
  }

  gotoHome(e: MouseEvent): void
  {
      e.preventDefault();

      this._router.navigate(['/'])
  }
}
