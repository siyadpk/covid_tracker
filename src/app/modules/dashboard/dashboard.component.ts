import { Component, OnInit } from '@angular/core';
import { basicCovidInfo } from 'src/app/core/models/covid';
import { CovidService } from 'src/app/core/services/covid.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  covidBasicInfo: basicCovidInfo;
  isLoading:boolean = false;

  constructor(private _covidService: CovidService) { }

  ngOnInit(): void {
    this.getCovidData()
  }

  getCovidData(){
    this.isLoading = true;
    this._covidService.getCovidData().subscribe((res:any)=> {
      // A timeout here will improve UX.
      setTimeout(() => {
        this.covidBasicInfo = res;
        this.isLoading = false;
      }, 800);
    })
  }

}
