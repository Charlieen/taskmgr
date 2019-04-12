import { Observable } from 'rxjs/Rx';
import { Http,Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import {TaskList, User} from '../domain';
import { DragDropService } from 'app/directive/drag-drop.service';

@Injectable()
export class TaskListService {
  private readonly domain= 'taskLists';
  private readonly headers = new Headers({
    'Content-Type' : 'application/json'
  })
  constructor(private http: Http, @Inject('BASE_CONFIG') private conifg){}
   // POST
  add(taskList: TaskList):Observable<TaskList> {
    const uri = `${this.conifg.url}/${this.domain}`;
      return this.http
      .post(uri, JSON.stringify(taskList), {headers: this.headers})
      .map(res => res.json());
  }

    // put 最佳实践，单一任务原则，最少暴露。
    update(taskList: TaskList):Observable<TaskList> {
      const uri = `${this.conifg.url}/${this.domain}/${taskList.id}`;
      const toUpdate = {
        name: taskList.name
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
delete(taskList: TaskList):Observable<TaskList> {
  const uri = `${this.conifg.uri}/taskLists/${taskList.id}`;

       return  this.http.delete(uri).mapTo(taskList);
}

  // get 最佳实践，单一任务原则，最少暴露。
  get(projectId:string):Observable<TaskList[]> {
   const uri=`${this.conifg.url}/${this.domain}`;
   return this.http
          .get(uri,{params: {'projectId': projectId}})
          .map(res => res.json() as TaskList[]);
  }


  swapOrder(src: TaskList, target: TaskList):Observable<TaskList[]> {

    const dragUri=`${this.conifg.url}/${this.domain}/${src.id}`;
    const dropUri=`${this.conifg.url}/${this.domain}/${target.id}`;

    const drag$ =this.http.patch(dragUri, JSON.stringify({order: target.order}),{headers:this.headers})
        .map(res => res.json());

    const drop$ =this.http.patch(dropUri, JSON.stringify({order: src.order}),{headers:this.headers})
        .map(res => res.json());



        return Observable
        .concat(drag$,drop$)
        .reduce( (arrs,list) => [...arrs, ...list],[]);



  }
}
