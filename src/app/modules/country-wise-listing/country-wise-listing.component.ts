import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CovidService } from 'src/app/core/services/covid.service';

@Component({
  selector: 'app-country-wise-listing',
  templateUrl: './country-wise-listing.component.html',
  styleUrls: ['./country-wise-listing.component.scss']
})
export class CountryWiseListingComponent implements OnInit {
  currentPage = 1;
  covidByCountry = this._covidService.covidDetails;
  isLoading:boolean = false;
  searchText: string = this._covidService.getSearchFilter || '';
  sortValue: string = this._covidService.getSortFilter || '';
  constructor(private _covidService: CovidService, private _router:Router) { }

  ngOnInit(): void {
    if (this.covidByCountry.length == 0) {
      this.isLoading = true;
      this._covidService.getCovidList().subscribe(()=> {
        this.covidByCountry = this._covidService.covidDetails;
        //Timeout here is to provide a better user experience
        setTimeout(() => {
          this.isLoading = false;
        }, 800);
      });
    }
  }

  searchByCountry() {
    this.currentPage = 1;
    this._covidService.searchByCountry(this.searchText);
    this.covidByCountry = this._covidService.covidDetails;
  }

  clearSearch(){
    this.searchText = '';
    this._covidService.clearSearch();
    this.covidByCountry = this._covidService.covidDetails;
  }

  sort(event: any) {
    this.currentPage = 1;
    this._covidService.sort(event);
    this.covidByCountry = this._covidService.covidDetails;
  }

  pagination(type: string) {
    if (type == 'next') this.currentPage++
    if (type == 'previous') this.currentPage--
  }

  goToEdit(id:any){
    this._router.navigateByUrl(`/country-wise-list/${id}`)
  }

}
