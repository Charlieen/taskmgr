import { ProjectService } from 'app/services/project.service';
import { Observable } from 'rxjs/Rx';
import { Http,Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import {User,Project} from '../domain';


@Injectable()
export class UserService {
  private readonly domain= 'users';
  private readonly headers = new Headers({
    'Content-Type' : 'application/json'
  })
  constructor(private http: Http, @Inject('BASE_CONFIG') private config,
  private projectService:ProjectService){}

  searchUser(filter:string):Observable<User[]> {

     const uri=`${this.config.url}/${this.domain}`;
   return this.http
          .get(uri,{params: {'email_like': filter}})
          .map(res => res.json() as User[]);
  }

  getUsersOfProject( projectid: string ):Observable<User[]> {

    const uri=`${this.config.url}/${this.domain}`;

    const project$ = this.projectService.getById(projectid);

     return  project$.map((res:Project) => res.members)

                  .switchMap(id => {
                   return this.http
                    .get(uri,{params: {'id': id}})
                    .map(res => res.json() as User)
                  })
                  .reduce((arr,u)=>([...arr ,u]),[]);
 }

 getUsersOfProject_2( projectid: string ):Observable<User[]> {

   const uri=`${this.config.url}/${this.domain}`;

                 return this.http
                  .get(uri,{params: {'projectId': projectid}})
                  .map(res => res.json() as User)
                  .reduce( (arrs,user) => [...arrs ,user] ,[]);

}
 addProjectRef_2(userp:User, projectId:string):Observable<User>{


  const uri=`${this.config.url}/${this.domain}/${userp.id}`;

  return this.http.get(uri).map(res => res.json() as User)
  .map(user => user.projectIds )
  .switchMap((val: string[])=>{
    val = [...val, projectId];
    userp.projectIds = val;
    return this.http
    .patch(uri, JSON.stringify(userp), {headers: this.headers})
    .map(res => res.json())
   });

 }

 addProjectRef(user:User, projectId:string):Observable<User>{
  const uri=`${this.config.url}/${this.domain}/${user.id}`;
  const projectIds = user.projectIds? user.projectIds:[];

  if(projectIds.indexOf(projectId)> -1){
    return Observable.of(user);
  }
  return this.http
  .patch(uri, JSON.stringify({projectIds: [...projectIds , projectId]}),{headers:this.headers})
  .map(res => res.json()as User);
 }

 removeProjectRef(user:User, projectId:string):Observable<User>{


  const uri=`${this.config.url}/${this.domain}/${user.id}`;
  const projectIds = user.projectIds? user.projectIds:[];

  if(projectIds.indexOf(projectId)> -1){

    const index = projectIds.indexOf(projectId);
    return this.http
    .patch(uri, JSON.stringify({projectIds: [...projectIds.slice(0,index) ,...projectIds.slice(index+1)]}),{headers:this.headers})
    .map(res => res.json()as User);
  }else{
    return Observable.of(user);
  }

 }

 batchUpdateProjectRef(project:Project):Observable<User[]>{

  const projectId = project.id;
  const merberIds = project.members ? project.members:[];

  return Observable.from(merberIds)
        .switchMap( id => {
          const uri =`${this.config.url}/${this.domain}/${id}`;
          return this.http.get(uri)
            .map(res => res.json() as User) } )
        .filter((user:User) => user.projectIds.indexOf(projectId) === -1)
        .switchMap( u => this.addProjectRef(u,projectId))
        .reduce((arrs,curr) => [...arrs , curr],[]);


 }
}
