import {Component, OnDestroy} from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from './auth.service';
import {Subscription} from "rxjs/Rx";

@Component({
    selector: 'my-header',
    template: `
       
        <header>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
        
                    <ul class="nav navbar-nav">
                        <li><a [routerLink]="['signup']">Sign Up</a></li>
                        <li><a [routerLink]="['signin']">Sign In</a></li>
                        <li><a [routerLink]="['protected']">Protected</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" *ngIf="isAuth()">
                        <li><a (click)="logout()" style="cursor: pointer">Logout</a></li>
                    </ul>
                </div><!-- /.container-fluid -->
        
            </nav>
        
        </header>
    `,
    directives: [ ROUTER_DIRECTIVES ]
})
export class HeaderComponent implements OnDestroy {

    isAuthenticated: boolean = false;

    private subscription: Subscription;

    constructor(private authService: AuthService) {
        this.subscription = this.authService.isAuthenticated().subscribe(
            authStatus => this.isAuthenticated = authStatus
        );
    }
    
    isAuth() {
        return this.isAuthenticated;
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
