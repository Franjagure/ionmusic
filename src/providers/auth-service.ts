import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthService {

  public fireAuth: any;
  public userData: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/usuarios');
  }

  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => { this.userData.child(newUser.uid).set({ email: email }); });
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  doLogout(): any {
    return this.fireAuth.signOut();
  }

}