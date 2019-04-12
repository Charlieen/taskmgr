import { Observable } from 'rxjs/Observable';
import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.actions';
import { getAuthState } from '../../reducers';
import { Auth } from '../../domain/auth.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth$:Observable<Auth>;
  @Output() toggle= new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  constructor(private store$:Store<fromRoot.State>) {
      this.auth$ = store$.select(getAuthState);
   }

  ngOnInit() {


  }

  openSidebar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

  onClick(){
       this.logout();

  }
  logout(){
    this.store$.dispatch(new authActions.LogoutAction(null));
  }
}
