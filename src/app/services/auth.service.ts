import { ProjectService } from 'app/services/project.service';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import {User, Project, Auth} from '../domain';


@Injectable()
export class AuthService {
  private readonly domain= 'users';
  private readonly headers = new Headers({
    'Content-Type' : 'application/json'
  })

  private token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImNoYXJsaWUiLCJpYXQiOjE1MTYyMzkwMjJ9.4SChRvOkdWcMAHzIfLJaGOBaci5akTzgOep_a6XTW3s';


  constructor(private http: Http, @Inject('BASE_CONFIG') private config){}

// POST
register(user: User): Observable<Auth> {
  // user.id = null;
  const uri = `${this.config.url}/${this.domain}`;

 return this.http
        .get(uri, {params: {'email': user.email}})
        .switchMap( res => {
          if (res.json().length > 0){
            throw new Error(('user existed'));
          }
          return this.http
          .post(uri, JSON.stringify(user), {headers: this.headers})
          .map(rs => ({ token: this.token , user: rs.json() as User}));
        }
        );
}

  login(email:string,password:string): Observable<Auth> {
    const uri = `${this.config.url}/${this.domain}`;

      return this.http
      .get(uri,{params:{email:email, password:password}})
      .map(res =>  {
        if(res.json().length === 0){
          throw 'username or password not match';
        }
        return  {token: this.token, user: res.json()[0]}
      });
  }

}
