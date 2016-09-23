import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Subject, Observable } from "rxjs/Rx";

import { User } from './user.interface';


declare var firebase;

@Injectable()
export class AuthService {

  constructor(private router: Router) {}

  signupUser(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .catch(function (error) {
        console.log(error);
      });
  }

  signinUser(user: User) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .catch(function (error) {
        console.log(error);
      });
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/signup']);
  }

    isAuthenticated() : Observable<boolean> {
        const subject = new Subject<boolean>();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                subject.next(true);
            } else {
                subject.next(false);
            }
        });
        return subject.asObservable();
    }

}