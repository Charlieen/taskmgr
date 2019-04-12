import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { AddTaskListComponent } from './../add-task-list/add-task-list.component';
import { CopyTaskComponent } from './../copy-task/copy-task.component';
import { NewTaskComponent } from './../new-task/new-task.component';
import { Component, OnInit, Input, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EditListNameComponent } from '../edit-list-name/edit-list-name.component';
import {slideToRight} from '../../anims/router.anim';
import {Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/task-list.actions';
import { ActivatedRoute ,ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import { TaskList } from 'app/domain/task-list.model';
import { filter } from 'rxjs/operators';
import * as taskActions from '../../actions/task.actions';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routeAnim') state;
  lists$:Observable<TaskList[]>;
  projectId$:Observable<string>;

  constructor(
    private store$:Store<fromRoot.State>,
    private dialog: MdDialog ,
    private cd: ChangeDetectorRef,
    private route:ActivatedRoute

    ) {
      this.projectId$ =this.route.paramMap.map(r =>r.get('id'));

      this.lists$ = this.store$.select(fromRoot.getTaskByLists);
        this.cd.markForCheck();
     // console.log('task-home....');

     // this.lists$.subscribe(l => console.log('tasklist...'+JSON.stringify(l)));

     }

  ngOnInit() {
    this.cd.markForCheck();
  }
  testClick(){

    alert('testClick');
  }

  handleMove(srcData,list){
      switch (srcData.tag) {
        case 'task-item':
          console.log('hangding item');
          break;

          case 'task-list':
          console.log('hangding list');
          const srcList= srcData.data;
          const tempOrder = srcList.order;
          srcList.order = list.order;
          list.order=tempOrder;
          break;
        default:
          break;
      }
  }

  newTaskDialog(list){
    const user$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user);

    user$.take(1)
      .map(user => this.dialog.open(NewTaskComponent,{data: {title:'新建任务' , owner: user}}))
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter( n => n))
        .subscribe(val => this.store$.dispatch(new taskActions.AddAction(
          {...val, taskListId:list.id, completed:false,creatDate:new Date()}
        )));


  }

  openNewTaskListDialog() {
    alert('newTaskList');
    const dialogRef = this.dialog.open(EditListNameComponent ,{data:{title: '新建列表'}});

    dialogRef.afterClosed()
        .take(1)
        .withLatestFrom(this.projectId$,(val,projectId)=> ({...val,projectId:projectId}))
        .subscribe(result => this.store$.dispatch(new actions.AddAction(result)));
  }



  newCopyTaskDialog(list){
      this.lists$.map(l => l.filter(ll => ll.id !== list.id))
      .map(li => this.dialog.open(CopyTaskComponent,{data: {lists: li}}))
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter( n => n))
      .subscribe((val:string) =>
       this.store$.dispatch( new taskActions.MoveALLAction({srcListId: list.id , targetListId: val})));
  }

  editTaskDialog(task){
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title :'修改任务', task:task}});

    dialogRef.afterClosed()
    .take(1)
    .filter(n => n)
    .subscribe(val => this.store$.dispatch(new taskActions.UpdateAction({...task, ...val})));
  }

  editListNameDialog(list:TaskList){

    const editListNameDialogRef =
    this.dialog.open(EditListNameComponent,{data: {title:'更改列表名称',taskList:list }});
    editListNameDialogRef.afterClosed()
    .take(1)
    .filter(n => n)
    .subscribe(result =>{
      this.store$.dispatch(new actions.UpdateAction({...result, id:list.id}));
    });
  }

  deleteListNameDialog(list:TaskList){
    const editListNameDialogRef = this.dialog.open(ConfirmDialogComponent,
      {data:{title:'删除任务',confirmContent:'您确认要删除本任务吗？'}});

      editListNameDialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(_ =>{
        this.store$.dispatch(new actions.DeleteAction(list));
      });
  }

  handleDeskOK(desc:string, list){
    const user$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user);
    user$.take(1)
        .subscribe(user => this.store$.dispatch(new taskActions.AddAction({
          desc:desc,
          priority:3,
          taskListId:list.id,
          ownerId: user.id,
          completed:false,
          createDate: new Date(),
          participantIds:[]
        })));
  }
}
