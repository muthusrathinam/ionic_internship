import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY ='auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState= new BehaviorSubject(false);    //Initially authentication is set to false

  constructor(private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(()=> {
      this.checkToken();
    });
  }

  checkToken(){
    return this.storage.get(TOKEN_KEY).then(res =>{
      if (res){
      this.authenticationState.next(true);
      }
    });
  }

  login(){
    return this.storage.set(TOKEN_KEY,'bearer 123456').then(res =>{
      this.authenticationState.next(true);
    });
  }

  //after login authentication is set to true after checktoken()

  logout(){
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  isAuthenticated(){
    return this.authenticationState.value;         //returns whether user is authenticated or not 
  }
  
}
