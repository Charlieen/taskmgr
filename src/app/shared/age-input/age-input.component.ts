import { Component, OnInit, Input , forwardRef , OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  subDays,
  subMonths,
  parse,
  subYears,
  format,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  isDate,
  isValid,
  isFuture

} from 'date-fns';
import { Observable, Subscription} from 'rxjs/Rx';
import{combineLatest}from 'rxjs/operator/combineLatest';
import {isValidDate} from '../../utils/date.util'
export enum AgeUnit{
  Year = 0,
  Month = 1,
  Day= 2
}
export interface Age {
  age: number;
  unit: number;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent ) ,
      multi: true,

    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent ) ,
      multi: true,

    }]
})
export class AgeInputComponent implements OnInit , OnDestroy, ControlValueAccessor {

  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsTop = 150;
  @Input() yearsBottom = 1;
  @Input() format = 'YYYY-MM-DD';
  private propagateChange = (_ : any) => {};

  selectedUnit = AgeUnit.Year;

  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];

  sub: Subscription;
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.propagateChange('');

    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')}),
    });



   let birthday$ ;
   let age_ageNum$ ;
   let age_ageUnit$ ;
   let ageForm: FormGroup;

   let birthday: FormControl;
   let ageNumf:  FormControl;
   let ageUnitf: FormControl;

    birthday = this.form.controls['birthday'] as FormControl;
    ageForm = this.form.controls['age'] as FormGroup;

    ageNumf = ageForm.controls['ageNum'] as FormControl;
    ageUnitf = ageForm.controls['ageUnit']as FormControl;



    birthday$ = birthday.valueChanges;
    age_ageNum$ = ageNumf.valueChanges.
     startWith(ageNumf.value).
     debounceTime(500)
     .distinctUntilChanged() ;

    age_ageUnit$ = ageUnitf.valueChanges.startWith(ageUnitf.value)
    .debounceTime(300)
    .distinctUntilChanged() ;

    const birthdayF$ = birthday$
    .map(d => {
      return {date: d , from: 'birthday'};
    })
    .filter(_ => birthday.valid);

    const ageF$ = Observable
    .combineLatest(age_ageNum$, age_ageUnit$, (_n :number , _u:number) => this.toDate({ age: _n, unit: _u}))
    .map( d => {
      return {date: d, from: 'age', }

    })
    .filter(_ => this.form.get('age').valid);

    const merged$ = Observable
    .merge(birthdayF$, ageF$)
    .filter(_ => this.form.valid);

    this.sub = merged$.subscribe((d: {date:string, from:string} )=> {
        const age = this.toAge(d.date);
        if (d.from === 'birthday'){
          console.log('birthday ...');
          console.log(age);
            if (age.age !== ageNumf.value){
              ageNumf.patchValue(age.age , {emitEvent: false});
            }
            if (age.unit !== ageNumf.value){
              this.selectedUnit = age.unit;
              ageUnitf.patchValue(age.unit, {emitEvent: false});
            }
            this.propagateChange(d.date);
        }else{
          const ageToCompare = this.toAge(birthday.value);
          if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit){
            birthday.patchValue(d.date , {emitEvent: false});
            this.propagateChange(d.date);
          }
        }
    })


  }

  toDate(age : Age): string{
    const now = Date.now();
    const dateFormat = this.format;
    switch (age.unit){
      case AgeUnit.Year:
      {return format(subYears(now, age.age), dateFormat); }
      case AgeUnit.Month:
      {return format(subMonths(now, age.age), dateFormat); }
      case AgeUnit.Day:
      { return format(subDays(now, age.age), dateFormat); }
      default:
      return null;
    }

  }

  toAge(dateStr: string): Age{
    const date = parse(dateStr);
    const now = Date.now();
    return  isBefore(subDays(now, this.daysTop), date) ?
         {age: differenceInDays(now, date), unit: AgeUnit.Day} :
         isBefore(subMonths(now, this.monthsTop), date) ?
         {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
          {age: differenceInYears(now, date), unit: AgeUnit.Year};
  }

  validate(c: FormControl): {[key: string]: any} {
   const val = c.value;
   if (!val){
      return null;
   }
   if (isValidDate(val)){
     return null;
   }
   return {
     dateOfBirthInvalid: true,
   }
}


  validateDate(c: FormControl): {[key: string]: any} {
      const val = c.value;
      return isValidDate(val) ? null :
       {
         birthdayInvilid: true,
       } ;
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
      return (group: FormGroup): {[key: string]: any} => {
        const ageNum = group.controls[ageNumKey];
        const ageUnit = group.controls[ageUnitKey];
        let result = false;
        const ageNumVal = ageNum.value;

        switch (ageUnit.value){
          case AgeUnit.Year:
          {result = ageNumVal >= this.yearsBottom && ageNumVal <= this.yearsTop; break; }
          case AgeUnit.Month:
          {result = ageNumVal >= this.monthsBottom && ageNumVal <= this.monthsTop; break; }
          case AgeUnit.Day:
          {result = ageNumVal >= this.daysBottom && ageNumVal <= this.daysTop; break; }
          default: {break; }

        }
        return result ? null : {ageInvalid: true};
      }

}

ngOnDestroy(): void {

  if (this.sub){
   this.sub.unsubscribe();
  }

}


  writeValue(obj: any): void {
    if (obj){
      const date = format(obj, this.format);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);

    }
  }
  registerOnChange(fn: any): void {
     // this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}


}
