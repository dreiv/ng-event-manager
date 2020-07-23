import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: number[] = [...Array(100).keys()];

  doSomething(event): void {
    console.log(event);
  }

  delegate(event, item): void {
    console.log(event);
    console.log('item clicked', item);
  }
}
