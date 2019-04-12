import { Actions } from '@ngrx/effects';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit , HostBinding , ChangeDetectionStrategy, ChangeDetectorRef, Inject, OnDestroy, NgZone } from '@angular/core';
import { Project } from 'app/domain/project.model';
import {MdDialog} from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import {slideToRight} from '../../anims/router.anim';
import { listAnimation } from 'app/anims/list.anim';
import { ProjectService } from 'app/services/project.service';
import * as _ from 'lodash';
import { Subscription, Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as projectActions from '../../actions/project.action';




@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProjectListComponent implements OnInit, OnDestroy {
    projects;
    openDialogAndSaveAndUpdate: Subscription;
    projects$: Observable<Project[]>;
    listAnim$: Observable<number>;

  @HostBinding('@routeAnim') state;
  constructor(
    private store$:Store<fromRoot.State>,
    private dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private zone: NgZone) {

    this.store$.dispatch(new projectActions.LoadAction(null));
    this.projects$ = this.store$.select(fromRoot.getProjects).map(p => p.filter(n => n) );
    this.listAnim$ = this.projects$.map(p => p.length);

   }

  ngOnInit() {

  }

  ngOnDestroy(): void {

}
/*
openNewProjectDialog_bak () {

  const selectedImg =  `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
  const newdialory = this.dialog.
  open(NewProjectComponent,
    {data: {thumbnails: this.getThumbnails(), img: selectedImg, }});
    this.openDialogAndSaveAndUpdate = newdialory.afterClosed().filter(on => on )
    .take(1) //只取一次，本次调用就自动销毁了，就不用  unsubscribe（）了。
   // 对象，展开，并更新属性
   .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))
   //第一个流的使命是从对话框中得到返回值，通过switchMap,接管了从第一个流中得到的值，第一个流的使命就结束了，
   //在switchMap内部在接着做 存到数据库的事情，
   // 接下来，在订阅中通过http 获得的返回对象（包含ID)添加到当前组件的成员变量中，并通知
   // angular 进行 脏值检测。
   .switchMap(v => this.service$.add(v))
  //  .switchMap( (v: Project )=>
  //   {
  //     v.coverImg = this.buildImgSrc(v.coverImg);
  //     return  this.service$.add(v);
  //   })
   .subscribe(project => {
      console.log(project);
      // 数组对象展开，并添加新的内容。
      this.projects = [...this.projects, project];
      this.cd.markForCheck();
   });


}
*/

openNewProjectDialog () {

  const selectedImg =  `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
  const newdialory = this.dialog.
  open(NewProjectComponent,
    {data: {thumbnails: this.getThumbnails(), img: selectedImg, }});
    this.openDialogAndSaveAndUpdate = newdialory.afterClosed().filter(on => on )
    .take(1)
   .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))
   .subscribe(project => {
      this.store$.dispatch(new projectActions.AddAction(project));
      this.cd.markForCheck();
   });


}
ListenToInvite(project){

    console.log('wo bei diao yong...'+ project);

            this.store$.select(fromRoot.getProjectUsers(project.id))
            .map(users =>  this.dialog.open(InviteComponent, {data: {members:users}}))
            .switchMap(dialog => dialog.afterClosed().take(1).filter(n => n))
            .subscribe(val  => {
              this.store$.dispatch
              (new projectActions.InviteAction({projectId:project.id, members:val}))});

}

editProjectDialog(project){
  const newdialory = this.dialog.
  open(NewProjectComponent,
    {data: {project: project}});
    newdialory.afterClosed().filter(on => on )
    .take(1)
    .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))
    .subscribe(project => {
      this.store$.dispatch(new projectActions.UpdateAction(project));
      this.cd.markForCheck();
   });
}

ListenToDeleteProject(project){

const newdialory = this.dialog.open(ConfirmDialogComponent
  , {data: {title: '删除', confirmContent: '您确认要删除本项目吗？该项目下所有的内容都会被删除！'}});


  newdialory.afterClosed().filter(on => on )
  .take(1)
  .do(p => console.log('01_delete component..'+ JSON.stringify(p)))
  .subscribe(_ => {
    this.store$.dispatch(new projectActions.DeleteAction(project));
    this.cd.markForCheck();
 });

}

private getThumbnails(){
  return _.range(0, 40)
  .map(i => `/assets/img/covers/${i}_tn.jpg`)
}

private buildImgSrc(img: string){

  return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
}

projectSelect(project: Project){

  this.zone.run(()=>{
    this.store$.dispatch(new projectActions.SelectAction(project));
  });


}

}

