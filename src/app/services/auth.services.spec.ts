import { TestBed, inject } from "@angular/core/testing";
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';


describe('auth service',()=>{
 let RouterStub;
  let user;
  const authStub: any = {
    authState: {},
    auth: {
       currentUser:{
         uid:"nirali"
       },
      signInWithEmailAndPassword() {
       return Promise.resolve();
      },
      createUserWithEmailAndPassword(){
        return Promise.resolve();
      },
      sendPasswordResetEmail(){
        return Promise.resolve();
      }      

    }
  };

  beforeEach(() => {
    let store = {};
    let mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    
    };
  
   
    class RouterStub {
      navigateByUrl(url: string) { return url; }
  }

    user = { email :"nirali",password:"nirali123"}
  
    TestBed.configureTestingModule({
      
      providers: [
        {provide: AngularFireAuth, useValue: authStub},
        {provide: AngularFireDatabase},
        {provide: Router, useClass:RouterStub},
        {provide:localStorage,useValue:mockLocalStorage},
         AuthService
      ]
    });
    authStub.authState = of(null);
    
   
  });
   
  it('should call signInWithPasswordAndEmail',inject([AuthService,Router], (service: AuthService,router:Router) => {
 
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.callThrough();
  
    
    mock.auth = authStub.auth;
    
    service.login(user.email,user.password);
    localStorage.setItem("uid",mock.auth.currentUser.uid);
   
    expect(spy).toHaveBeenCalledWith(user.email,user.password);
    
    
  }));

  it('should call  createUserWithEmailAndPassword', inject([AuthService,Router], (service: AuthService,router:Router) => {
 
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'createUserWithEmailAndPassword').and.callThrough();
  
     mock.auth = authStub.auth;
    
    service.register(user.email,user.password);
   
    expect(spy).toHaveBeenCalledWith(user.email,user.password);
    
  }));

  it('should call  forgetpassword', inject([AuthService,Router], (service: AuthService,router:Router) => {
 
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'sendPasswordResetEmail').and.callThrough();
  
     mock.auth = authStub.auth;
    
    service.forgetPassword(user.email); 
     
    expect(spy).toHaveBeenCalledWith(user.email);
    
 
    
  }));


})