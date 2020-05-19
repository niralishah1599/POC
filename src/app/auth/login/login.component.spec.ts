import { LoginComponent } from "./login.component";
import { of } from 'rxjs';

describe("LoginComponent",()=>{
  let component : LoginComponent;
  let user;
  let mockAuthService;
  beforeEach(()=>{
    user = [
      {email:"shahnirali51@gmail.com",password:"nirali123"}
    ]
    mockAuthService = jasmine.createSpyObj(['login'])
    component =  new LoginComponent(mockAuthService)
  })

  describe('login',()=>{
    it('should check the correct email in login ',()=>{
      component.user=user;
      component.login();
      expect(component.user[0].email).toEqual("shahnirali51@gmail.com");
    })

    it('should check the correct password in login ',()=>{
      component.user=user;
      component.login();
      expect(component.user[0].password).toEqual("nirali123");
    })

    it('should call login ',()=>{
      component.user=user;
      spyOn(component,"login")
      component.login();
      expect(component.login).toHaveBeenCalled();
    })

    it('should call mockAuthService in login function',()=>{
      component.user=user;
      component.login();
      expect(mockAuthService.login).toHaveBeenCalledWith(user.email,user.password);
       
    })
         

  
  })
})





