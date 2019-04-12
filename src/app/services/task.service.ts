import { TaskListService } from './task-list.service';
import { Observable } from 'rxjs/Rx';
import { Http,Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import {Task, User,TaskList,} from '../domain';

@Injectable()
export class TaskService {
  private readonly domain= 'tasks';
  private readonly headers = new Headers({
    'Content-Type' : 'application/json'
  })
  constructor(private http: Http,
    @Inject('BASE_CONFIG') private conifg
    ,private taskListservice :TaskListService ){}


    // POST
  add(task: Task):Observable<Task> {
    console.log('taskService...' +JSON.stringify(task));

    const uri = `${this.conifg.url}/${this.domain}`;

      return this.http
      .post(uri, JSON.stringify(task), {headers: this.headers})
      .map(res => res.json());
  }

    // put 最佳实践，单一任务原则，最少暴露。
    update(task: Task):Observable<Task> {
      const uri = `${this.conifg.url}/${this.domain}/${task.id}`;
      const toUpdate = {
        desc: task.desc,
        priority: task.priority,
        dueDate:task.dueDate,
        reminder:task.reminder,
        ownerId:task.ownerId,
        participantIds:task.participantIds,
        remark:task.remark,

      };
        return this.http
        .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
        .map(res => res.json());
    }
// Delete
/* Task 有多个 taskList ,每个 taskList 内有 多个 task，
*  mergeMap  流 内 元素 都是 taskList, 并且有多个, 当正在删除某个listid的时候，又有新的 listid 进来，
   此种状态下，要保证 所有的 listid 都执行完删除操作 ,都要保持住，需要用 mergeMap;

   count() 执行时，上一个 mergeMap() 已经发生完成了，
   switchMap 只要 接受一个 task 就可以了。

*/
delete(task: Task):Observable<Task> {
 const uri= `${this.conifg.url}/${this.domain}/${task.id}`;
 return this.http.delete(uri).mapTo(task);
}

  // get 最佳实践，单一任务原则，最少暴露。
  get(taskListId:string):Observable<Task[]> {
   const uri=`${this.conifg.url}/${this.domain}`;
   return this.http
          .get(uri,{params: {'taskListId': taskListId}})
          .map(res => res.json() as Task[]);
  }

  getByLists(lists: TaskList[]):Observable<Task[]> {

    return Observable.from(lists)
    .mergeMap(list => this.get(list.id))
    .reduce( (tasks: Task[], t:Task[] ) => [...tasks ,...t],[]);
  }

   // put 最佳实践，单一任务原则，最少暴露。
   complete(task: Task):Observable<Task> {
    const uri = `${this.conifg.url}/${this.domain}/${task.id}`;

      return this.http
      .patch(uri, JSON.stringify({completed:!task.completed}), {headers: this.headers})
      .map(res => res.json());
  }

  move(taskId:string, targetListId:string):Observable<Task> {
    const uri = `${this.conifg.url}/${this.domain}/${taskId}`;

      return this.http
      .patch(uri, JSON.stringify({taskListId:targetListId}), {headers: this.headers})
      .map(res => res.json());
  }

  moveAll(srcListId:string, targetListId:string):Observable<Task[]> {

      return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task => this.move(task.id, targetListId))
      .reduce( (arr,x)=> [...arr, x],[]);

  }

  getUserTasks(userId:string):Observable<Task[]>{
    const uri=`${this.conifg.url}/${this.domain}`;
    return this.http.get(uri,{params:{ownerId: userId}})
            .map(res  => res.json() as Task[]);

  }

}
