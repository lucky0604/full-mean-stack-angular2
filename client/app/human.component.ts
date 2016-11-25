import {Component} from '@angular/core';
import {HumanService} from './app.service';

@Component({
  selector: 'human',
  moduleId: module.id,
  templateUrl: 'human.html',
  providers: [HumanService]
})

export class HumanComponent {
  name: string;
  age: number;

  constructor(private humanService: HumanService) {};

  addHuman() {
    var human = {
      name: this.name,
      age: this.age
    }
    this.humanService.addHuman(human)
  }
}