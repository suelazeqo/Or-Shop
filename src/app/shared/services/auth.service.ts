import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private routerSVC:Router
  ) {
    this.user$ = afAuth.authState;
  }

  login(email: string, password: string) {
    // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('returnUrl',returnUrl);
    // this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.routerSVC.navigateByUrl("/")
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  authState(){
    return this.afAuth.authState
  }

  //Just in case needed
  // signup(email: string, password: string) {
  //   this.afAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(value => {
  //       console.log('Success!', value);
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:',err.message);
  //     });
  // }


  logout() {
    this.afAuth.signOut();
    this.routerSVC.navigateByUrl("/")
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
