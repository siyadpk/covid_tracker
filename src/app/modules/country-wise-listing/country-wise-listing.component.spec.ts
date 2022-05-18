import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryWiseListingComponent } from './country-wise-listing.component';

describe('CountryWiseListingComponent', () => {
  let component: CountryWiseListingComponent;
  let fixture: ComponentFixture<CountryWiseListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryWiseListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryWiseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
