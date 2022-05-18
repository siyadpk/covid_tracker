import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryWiseListingEditComponent } from './country-wise-listing-edit.component';

describe('CountryWiseListingEditComponent', () => {
  let component: CountryWiseListingEditComponent;
  let fixture: ComponentFixture<CountryWiseListingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryWiseListingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryWiseListingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
