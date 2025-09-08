import { Component, OnInit } from '@angular/core';
import { CountriesService, Country } from './countries.service';
import { FormControl, Validators } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css'],
})
export class Exercise1Component implements OnInit {
  countries$ = this.countriesService.getCountries();
  countriesControl = new FormControl<Country['id']>('select coutry',
    {validators: Validators.required,
      nonNullable: true,
    }
  )

  currentCountry$ = combineLatest([
    this.countries$,
    this.countriesControl.valueChanges.pipe(startWith(this.countriesControl.value))
  ]).pipe(
    map(([counties,countryID]) => counties.find((c) => c.id === countryID)?.id)
  ) ;

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {}

  trackByCountryId(index: number, country: Country) {
    return country.id;
  }

}
