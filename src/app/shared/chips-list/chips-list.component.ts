import { UserService } from './../../services/user.service';
import { Component, OnInit, Input , forwardRef , OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../domain/user.model'
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
import { useAnimation } from '@angular/animations';


@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent ) ,
      multi: true,

    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent ) ,
      multi: true,

    }]
})
export class ChipsListComponent implements OnInit {

  private propagateChange = (_: any) => {};
  @Input() multiple = true;
  @Input() placehold= '请输入成员 email';
  @Input() label= '添加/修改成员'
  items: User[]= [];
  memberResults$:Observable<User[]> ;
  form: FormGroup;
  constructor(private fb: FormBuilder, private userServer: UserService) { }

  ngOnInit() {
    this.form = this.fb
    .group({
      memberSearch: [],
    });

    this.memberResults$ = this.form.get('memberSearch').valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .filter(s=> s && s.length >1)
        .switchMap(str => this.userServer.searchUser(str))
        ;

  }


  writeValue(obj: User[]): void {
    if (obj && this.multiple){
     const userEntities = obj.reduce( (e , c) => ({...e , c }) , {});
     if(this.items){
       const remaining = this.items.filter(item => ! userEntities[item.id]);
       this.items = [...remaining , ...obj];
     }
    }else if(obj&& this.multiple){
      this.items = [...obj];
    }
  }
  registerOnChange(fn: any): void {
     this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  validate(c:FormControl):{[key:string]:any}{
    return this.items? null : {
      chipListInvalid:true
    };
  }

  removeMember(member:User){

    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);

    if(this.multiple){
      this.items = [...this.items.slice(0,i), ...this.items.slice(i+1)];
    }else{
      this.items =[];
    }
      this.form.patchValue({memberSearch: ''});
      this.propagateChange(this.items);
  }

  handleMemberSelection(member:User){

    this.items = this.items.filter(n => n!== undefined);

    if(this.items.length === 0)
    {
      this.items = [member];
    }else{
      const ids = this.items.map(item => item.id);
      if(ids.indexOf(member.id)=== -1){
         this.items = this.multiple? [...this.items ,member] :[member];
      }
    }

    this.form.patchValue({memberSearch:member.name})
    this.propagateChange(this.items);
  }

  displayUse(user:User):string {
    return user? user.name :'';
  }

  get displayInput(){
    return this.multiple || this.items.length === 0;
  }
}
