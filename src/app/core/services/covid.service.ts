import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { basicCovidInfo, CovidByCountry } from '../models/covid';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  covidByCountry: CovidByCountry[] = [];
  covidByCountryBackup: CovidByCountry[] = [];
  sortFilter: string = '';
  searchFilter: string = '';

  constructor(private _http: HttpClient) { }

  /**
   * @returns HttpObservable - all the covid by country data  
   */
  getCovidList(): Observable<CovidByCountry[]> {
    return this._http.get<CovidByCountry[]>('https://disease.sh/v3/covid-19/countries').pipe(map((res: CovidByCountry[]) => {
      this.covidByCountryBackup = res;
      this.covidByCountry = this.covidByCountryBackup;
      return res;
    }))
  }

  /**
  * @returns HttpObservable - basic covid info
  */
  getCovidData(): Observable<basicCovidInfo> {
    return this._http.get<basicCovidInfo>('https://disease.sh/v3/covid-19/all').pipe(map((res:basicCovidInfo) => {
      return res
    }))
  }

  /**
   * @description
   * This method transform search input to lowercase without spaces infront and back
   * and assign the processed search value to searchFilter variable. then, filters the data 
   * based on search value from the covid by country backup data.
   * 
   * @param search user searched country value in the template
   */
  searchByCountry(search: string): void {
    search.toLowerCase().trim();
    this.setSearchFilter(search)
    this.covidByCountry = this.covidByCountryBackup.filter(x => x?.country.toLocaleLowerCase().includes(search));
  }

  /**
   * @description
   * This method sets the sortFilter variable recieved as argument type and sort the
   * country list based on the sort filter type
   * @param type user selected country sort type
   */
  sort(type: string): void {
    this.setSortFilter(type);
    if (type == 'name') this.covidByCountry.sort((a, b) => a.country > b.country ? 1 : -1);
    if (type == 'cases') this.covidByCountry.sort((a, b) => b.cases - a.cases)
    if (type == 'deaths') this.covidByCountry.sort((a, b) => b.deaths - a.deaths)
    if (type == 'recovered') this.covidByCountry.sort((a, b) => b.recovered - a.recovered)
  }

  /**
   * @returns covid data to be displayed in the country wise listing page
   */
  get covidDetails(): CovidByCountry[] {
    return this.covidByCountry
  }

  /**
   * @description
   * This method updates the values such as cases, deaths, recovered,
   * tests of a country
   * @param id id of the country
   * @param param1 cases, deaths, recovered and tests
   */
  updateDetails(id: number, { cases, deaths, recovered, tests }: any): void {
    if (cases >= 0) this.covidByCountry.find(x => x.countryInfo._id == id).cases = cases;
    if (deaths >= 0) this.covidByCountry.find(x => x.countryInfo._id == id).deaths = deaths;
    if (recovered >= 0) this.covidByCountry.find(x => x.countryInfo._id == id).recovered = recovered;
    if (tests >= 0) this.covidByCountry.find(x => x.countryInfo._id == id).tests = tests;
  }

  /**
   * @description This method clears the search input value and fetch the data from
   * backup. then, sort is done inorder to keep the state of sort.
   * 
   */
  clearSearch(): void {
    this.setSearchFilter('');
    this.covidByCountry = this.covidByCountryBackup;
    this.sort(this.sortFilter);
  }

  /**
   * @description method is to set search filter value
   * @param res search filter value
   */
  setSearchFilter(res: string): void {
    this.searchFilter = res;
  }

  /**
   * @description method is to set sort filter value
   * @param res sort filter value
   */
  setSortFilter(res: string): void {
    this.sortFilter = res;
  }

  /**
   * @returns search filter value
   */
  get getSearchFilter(): string {
    return this.searchFilter;
  }

  /**
   * @returns sort filter value
   */
  get getSortFilter(): string {
    return this.sortFilter;
  }
}
