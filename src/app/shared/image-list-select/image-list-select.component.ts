import { Component, OnInit, Input ,forwardRef } from '@angular/core';
import {ControlValueAccessor , NG_VALUE_ACCESSOR ,NG_VALIDATORS, FormControl} from '@angular/forms'

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ImageListSelectComponent ) ,
      multi:true,

    },
    {
      provide: NG_VALIDATORS,
      useExisting:forwardRef(()=>ImageListSelectComponent ) ,
      multi:true,

    }]
})
export class ImageListSelectComponent implements OnInit ,ControlValueAccessor {


  @Input() title='选择';
  @Input() cols =6;
  @Input() rowHeight= '64px';
  @Input() items: string[]=[];
  @Input() useSvgIcon = false;
  @Input() itemWidth = '80px';


  selected:string;
  constructor() { }

  private propagateChange = (_:any) => {};

  writeValue(obj: any): void {
    this.selected =obj;
  }
  registerOnChange(fn: any): void {
      this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}


  ngOnInit() {
  }

  onChange(i){
    console.log(JSON.stringify(i));
    this.selected = this.items[i];
    this.propagateChange(this.selected);

  }

  validate(c:FormControl): {[key:string]:any}{

    return this.selected? null:{
      iamgeListInvalid:{
        valid:false
      }
    }
  }

}
