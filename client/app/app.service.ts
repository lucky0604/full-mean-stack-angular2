import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HumanService {
  addHuman(human) {
    console.log('in human service');
    console.log(human);
  }
}