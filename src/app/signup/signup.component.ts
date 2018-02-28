import { Component } from '@angular/core';
import { Router }  from '@angular/router';

import { CommonService } from '../services/common/common.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent {
    newUser = {
        email: null as string,
        firstName: null as string,
        password: null as string
    };
    constructor(private commonService: CommonService, private router: Router) {
        
    }
    
    goToLogin() {
        this.router.navigate(['login']);
    }
    
    signUp() {
        if (this.canSignUp) {
            this.commonService.data.users.push(this.newUser);
            localStorage.setItem('data', JSON.stringify(this.commonService.data));
            this.router.navigate(['login']);
        } else {
            alert('Fill all fields.');
        }
    }
    
    get canSignUp() {
        return this.newUser.email && this.newUser.firstName && this.newUser.password ? true : false;
    }
}
