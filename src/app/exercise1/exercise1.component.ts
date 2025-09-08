import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CountryService } from './country.service';
import { Country } from './types';
// import {ngTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})
export class Exercise1Component implements OnInit {
  countries$ = new BehaviorSubject<Country[]>([]);
  currCountry = '';
  value = '';

  mySelectControl = new FormControl<Country['id']>('');
  constructor(private service: CountryService) { }

  ngOnInit() {
    this.countries$ = this.service.getCountries() as BehaviorSubject<Country[]>;
  }

  getSelectedCountry(countries: Country[]): string | undefined {
    return countries.find(c => c.id === this.mySelectControl.value)?.id || null;
  }
}
