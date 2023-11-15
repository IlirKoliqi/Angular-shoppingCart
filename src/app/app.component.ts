import {Component, OnInit} from '@angular/core';
import {DataService} from "./shared/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isFetching:boolean = false;
  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    this.dataService.isFetching.subscribe(value =>{
      this.isFetching = value;
    })
  }
}
