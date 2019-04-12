import { Observable } from 'rxjs';
import { Component, OnInit ,Output, EventEmitter } from '@angular/core';
import {getDate} from 'date-fns';
import { Project } from 'app/domain/project.model';
import {Store}from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/project.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  projects$:Observable<Project[]>;

  @Output()projectNav = new EventEmitter<void>();

  today = 'day';
  constructor(private store$:Store<fromRoot.State>) {
    this.projects$ = this.store$.select(fromRoot.getProjects);

    this.projects$.subscribe(p => console.log(p));
   }

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;
  }

  onNavClick(){
    this.projectNav.emit();
  }

  onPrjClick(prj:Project){

    this.store$.dispatch(new actions.SelectAction(prj));
    this.projectNav.emit();

  }

}
