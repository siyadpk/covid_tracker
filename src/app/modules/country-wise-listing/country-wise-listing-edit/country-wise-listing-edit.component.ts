import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidByCountry } from 'src/app/core/models/covid';
import { CovidService } from 'src/app/core/services/covid.service';

@Component({
  selector: 'app-country-wise-listing-edit',
  templateUrl: './country-wise-listing-edit.component.html',
  styleUrls: ['./country-wise-listing-edit.component.scss']
})
export class CountryWiseListingEditComponent implements OnInit {
  currentCountryID: number;
  currentCountry: CovidByCountry | undefined;
  editForm: FormGroup;
  constructor(
    private _route: ActivatedRoute,
    private _covidService: CovidService,
    private _fb: FormBuilder,
    private _router: Router) {
    this._route.params.subscribe(res => {
      this.currentCountryID = res['id'];
      this.currentCountry = this._covidService.covidDetails.find(x => x.countryInfo._id == this.currentCountryID);
    })
  }

  ngOnInit(): void {
    if (this._covidService.covidByCountryBackup.length == 0) {
      this._router.navigateByUrl('country-wise-list')
    }
    this.initEditForm();
  }

  initEditForm() {
    this.editForm = this._fb.group({
      cases: [this.currentCountry?.cases, [Validators.required]],
      deaths: [this.currentCountry?.deaths, [Validators.required]],
      recovered: [this.currentCountry?.recovered, [Validators.required]],
      tests: [this.currentCountry?.tests, [Validators.required]],
    })
  }

  updateItem() {
    if (this.editForm.valid) {
      this._covidService.updateDetails(this.currentCountryID, this.editForm.value)
      alert(`Details of ${this.currentCountry.country} has been updated`)
      this._router.navigateByUrl('/country-wise-list')
    } else {
      this.editForm.markAllAsTouched();
    }
  }





}
