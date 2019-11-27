import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private log = new BehaviorSubject<any>("");
  login = this.log.asObservable();
  constructor() { }
  authenticate(username, password){
    
    if( username === "admin" && password === "123456"){
      sessionStorage.setItem('username', username)
      this.log.next("true");
      return this.login
    }else{
      this.log.next("false");
      return this.login
    }

  }



  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
