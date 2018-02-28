import { Component } from '@angular/core';
import { Router }  from '@angular/router';

import { CommonService } from '../services/common/common.service';

import { User } from '../models/user/user.model';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    email: string = null;
    errors = {
        email: false,
        password: false
    };
    password: string = null;
    users: User[] = [];
    constructor(private commonService: CommonService, private router: Router) {
        this.users = this.commonService.data.users;
    }
    
    input() {
        this.errors.email = false;
        this.errors.password = false;
    }
    
    login() {
        if(this.canLogin) {
            if (this.users.length) {
                let emailExist = false;
                for(let user of this.users) {
                    if (user.email == this.email) {
                        emailExist = true;
                        if (user.password == this.password) {
                            this.commonService.data.loginedUser = user;
                            localStorage.setItem('data', JSON.stringify(this.commonService.data));
                            this.router.navigate(['blog']);
                        } else {
                            this.errors.password = true;
                        }
                        break;
                    }
                }
                if(!emailExist) {
                    this.errors.email = true;
                }
            } else {
                alert('There is no user yet. Sign up.');
            }
        } else {
            alert('Fill all fields.');
        }
    }
    
    goToSignUp() {
        this.router.navigate(['signup']);
    }
    
    get canLogin() {
        return this.email && this.password ? true : false;
    }
}
