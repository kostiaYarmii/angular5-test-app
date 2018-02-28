import { Component } from '@angular/core';
import { Router }  from '@angular/router';

import { CommonService } from './services/common/common.service';

import { MainData } from './models/main-data/main-data.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private commonService: CommonService, private router: Router) {
        let storedData = localStorage.getItem('data'),
            data: MainData = null;
        if (storedData) {
            data = JSON.parse(storedData);
            if(data.loginedUser) {
                this.router.navigate(['blog']);
            } else {
                this.router.navigate(['login']);
            }
        } else {
            data = {users: [], loginedUser: null, posts: []};
            localStorage.setItem('data', JSON.stringify(data));
            this.router.navigate(['login']);
        }
        this.commonService.data = data;
    }
}
