import { Component } from '@angular/core';
import {DataService} from "./shared/data.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isFetching$= this.dataService.isFetching

    constructor(private dataService: DataService) {
    }

}
