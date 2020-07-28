import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap, pluck, debounceTime, distinctUntilChanged, takeUntil, } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  private onDestroy$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder, public service: DataService) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      searchCountry: [null, [Validators.required, Validators.minLength(3)]]
    });

    this.searchForm.valueChanges.pipe(
      pluck('searchCountry'),
      distinctUntilChanged(),
      debounceTime(300),
      tap((userInput: string) => this.service.changeCountryName(userInput)),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  changeCountryName(userInput: string): void {
    this.service.changeCountryName(userInput);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
