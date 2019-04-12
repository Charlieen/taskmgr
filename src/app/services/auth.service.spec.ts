import { Http, BaseResponseOptions, HttpModule,Response, ResponseOptions } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { AuthService } from './auth.service';
import { User } from 'app/domain/user.model';

describe('FrotestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule],
      providers: [
        {provide:'BASE_CONFIG', useValue: {url: 'http://localhost:3000'}}
        ,
        {
          provide:Http,
          useFactory: (mockBackEnd,options) => {
            return new Http(mockBackEnd,options);
          },
          deps:[MockBackend,BaseResponseOptions],
        }
        ,
        MockBackend,
        BaseResponseOptions,
        AuthService,
      ],

    });
  });

  it('注册后应该返回一个 Observable<Auth>', inject([AuthService,MockBackend], (service: AuthService,mockBackend:MockBackend) => {
    const mockUser: User = {
      name:'zgding',
      password:'123abc',
      email:'zgding79@gmail.com'
    };

    const mockResponse = {
      id:'obj123abc',
      name:'zgding',
      password:'123abc',
      email:'zgding79@gmail.com'
    };

    mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(
          new ResponseOptions({body : JSON.stringify(mockResponse)})
          ))});

    service.register(mockUser).subscribe(auth => {
        expect(auth.token).toBeDefined();
        expect(auth.user).toBeDefined();

        expect(auth.user.name).toEqual(mockResponse.name);
    })


  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));


});
