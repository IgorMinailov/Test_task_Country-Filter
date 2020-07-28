import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private countryNameSource = new BehaviorSubject<string>('');
  currentCountryName = this.countryNameSource.asObservable();

  constructor() { }


  changeCountryName(country: string): void {
    console.log(country);
    // complete this function to notify components
    return this.countryNameSource.next(country);
  }
}
