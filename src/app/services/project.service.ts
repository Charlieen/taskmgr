import { Observable } from 'rxjs/Rx';
import { Http,Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import {Project, User} from '../domain';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {
  private readonly domain= 'projects';
  private readonly headers = new Headers({
    'Content-Type' : 'application/json'
  })
  constructor(private http: Http, @Inject('BASE_CONFIG') private conifg){}
   // POST
  add(project: Project):Observable<Project> {
    const uri = `${this.conifg.url}/${this.domain}`;
    project.id=null;
    console.log('server _ '+JSON.stringify(project));
      return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers})
      .map(res => res.json());
  }

    // put 最佳实践，单一任务原则，最少暴露。
    update(project: Project):Observable<Project> {
      const uri = `${this.conifg.url}/${this.domain}/${project.id}`;
      const toUpdate = {
        name: project.name,
        desc: project.desc,
        coverImg:project.coverImg
      };
        return this.http
        .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
        .map(res => res.json());
    }
// Delete
/* Project 有多个 taskList ,每个 taskList 内有 多个 task，
*  mergeMap  流 内 元素 都是 taskList, 并且有多个, 当正在删除某个listid的时候，又有新的 listid 进来，
   此种状态下，要保证 所有的 listid 都执行完删除操作 ,都要保持住，需要用 mergeMap;

   count() 执行时，上一个 mergeMap() 已经发生完成了，
   switchMap 只要 接受一个 project 就可以了。

*/
delete(project: Project):Observable<Project> {
  console.log('02_delete service..'+ JSON.stringify(project));

  const delTasks$ = Observable.from(project.taskList? project.taskList :[] )
  .mergeMap(listId => this.http.delete(`${this.conifg.url}/taskLists/${listId}`))
  .count();

  return delTasks$
  .switchMap(_ => this.http.delete(`${this.conifg.url}/${this.domain}/${project.id}`))
  .mapTo(project);
}

  // get 最佳实践，单一任务原则，最少暴露。
  get(userId:string):Observable<Project[]> {
   const uri=`${this.conifg.url}/${this.domain}`;
   return this.http
          .get(uri,{params: {'members_like': userId}})
          .map(res => res.json() as Project[]);
  }

  // get 最佳实践，单一任务原则，最少暴露。
  getById(projectId:string):Observable<Project> {
    const uri=`${this.conifg.url}/${this.domain}`;
    return this.http
           .get(uri,{params: {'id': projectId}})
           .map(res => res.json() as Project);
   }

   // put 最佳实践，单一任务原则，最少暴露。
   invite(projectId: string, users:User[]):Observable<Project> {
    const uri = `${this.conifg.url}/${this.domain}/${projectId}`;
    return this.getById(uri)
        .switchMap( project =>{
          const existingMembers = project.members;
          const invitedIds= users.map(u=>u.id);
          const newIds = _.union(existingMembers,invitedIds);
          return this.http
          .patch(uri, JSON.stringify({members: newIds}), {headers: this.headers})
          .map(res => res.json());
        });


  }

}
