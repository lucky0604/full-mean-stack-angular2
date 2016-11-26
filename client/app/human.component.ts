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
  humans: Array<any>;
  specificHumanName: string;
  specificHumanAge: number;

  constructor(private humanService: HumanService) {
    humanService.getHumans().subscribe(response => {
      this.humans = response;
    })
  };

  viewHuman(id) {
    this.humanService.viewHuman(id).subscribe(data => {
      this.specificHumanName = data.name;
      this.specificHumanAge = data.age;
    })
  }



  addHuman() {
    var human = {
      name: this.name,
      age: this.age
    }
    this.humanService.addHuman(human)
      .subscribe(data => {
        this.humans.push(human);
      })
  }

  removeHuman(id) {
    this.humanService.removeHuman(id)
      .subscribe(data => {
        console.log('Success deleting' + data);
      })
  }
}