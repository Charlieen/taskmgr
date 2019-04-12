import { Observable } from 'rxjs/Observable';
import {Http ,Response} from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Quote } from 'app/domain/quote.model';


@Injectable()
export class QuoteService {

  constructor(private http:Http , @Inject('BASE_CONFIG') private config){}

  getQuote(): Observable<Quote>{

      const num= Math.floor(Math.random()*10);

      const quoteurl=`${this.config.url}/quotes/${num}`;

      //this.http.get(quoteurl).subscribe((r:Response) =>{console.log(r.json())});

      return this.http.get(quoteurl).debug('quote:').map(res => res.json() as Quote);

  }
}
