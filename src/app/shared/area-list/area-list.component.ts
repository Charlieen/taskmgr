import { Subscription } from 'rxjs/Rx';
import { Address } from './../../domain/user.model';
import { Component, OnInit, Input , forwardRef , OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import {getAreaByCity,getCitiesByProvince,getProvince} from '../../utils/area.util'

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent ) ,
      multi: true,

    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent ) ,
      multi: true,

    }],
    changeDetection:ChangeDetectionStrategy.OnPush,

})
export class AreaListComponent implements OnInit,OnDestroy,ControlValueAccessor {

  _address: Address ={
    province: '',
    city: '',
    district:'',
    street: ''
  }
  _province = new Subject();
  _city = new Subject();
  _district =new Subject();
  _street = new Subject();

  provinces$:Observable<string[]>;
  citys$:Observable<string[]>;
  districts$:Observable<string[]>;


  sub:Subscription;

  private propagateChange = (_: any) => {};
  constructor() { }

  ngOnInit() {
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');

    const val$= Observable.combineLatest([province$,city$,district$,street$],
      (_p,_c,_d,_s) => {
        return {province:_p, city:_c,district:_d,street:_s}
      });

     this.sub= val$.subscribe(v => {
       this.propagateChange(v);
      })

      this.provinces$ =Observable.of(getProvince());
      this.citys$ =province$.map( (p:string) => getCitiesByProvince(p));
      this.districts$= Observable.combineLatest(province$, city$, (p:string,c:string)=>
      getAreaByCity(p, c));

  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }

  }

  provinceChange(){
    this._province.next(this._address.province);
  }
  cityChange(){
    this._city.next(this._address.city);
  }
  districtChange(){
    this._district.next(this._address.district);
  }
  streetChange(){
    this._street.next(this._address.street);
  }

  writeValue(obj: Address){
      if(obj){
        this._address =obj;
        if(this._address.province){
          this._province.next(this._address.province);
        }
        if(this._address.city){
          this._city.next(this._address.city);
        }
        if(this._address.district){
          this._district.next(this._address.district);
        }
        if(this._address.street){
          this._street.next(this._address.street);
        }
      }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
 }
 registerOnTouched(fn: any): void {}

 validate(c: FormControl): {[key: string]: any} {
  const val = c.value;
  if (!val){
     return null;
  }
if(val.province && val.city && val.district && val.street){
  return null;
}
return { addresInvlid:true};

}
}

