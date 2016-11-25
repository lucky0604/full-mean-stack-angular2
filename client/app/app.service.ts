import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HumanService {
  constructor(private http: Http) {};

  addHuman(human) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post("/api/human", human, {headers: headers})
    .map(response => response.json());

    console.log('in human service');
    console.log(human);
  }
}