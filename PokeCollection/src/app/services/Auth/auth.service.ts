import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState!: firebase.User | null;
  userID: string | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      this.userID = auth?.uid;
    });
  }
  /*
  dbRef = this.db.database.ref('users');
*/
  get isUserAnonymousLoggedIn(): boolean {
    return this.authState !== null ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  get currentUser(): any {
    return this.authState !== null ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if (this.authState !== null && !this.isUserAnonymousLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

  signUpWithEmail(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        this.authState = userCredentials.user;
        this.db.list('users').push(this.userID);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  /*
  // with date
  signUpWithEmail2(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        this.authState = userCredentials.user;
        if (this.authState != null) {
          this.dbRef.child(this.authState.uid).set('...');
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  */
  loginWithEmail(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        this.authState = userCredentials.user;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  signOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}