import { of } from 'rxjs';
import { RegisterComponent } from './register.component';

describe("Register Component",()=>{
  let component : RegisterComponent;
  let user;
  let mockAuthService;
  beforeEach(()=>{
    user = {email:"shahnirali51@gmail.com",password:"nirali123"}
    mockAuthService = jasmine.createSpyObj(['register'])
    component =  new RegisterComponent(mockAuthService)
  })

  describe('register',()=>{
    it('should check the correct email in register ',()=>{
      component.user=user;
      component.register();
      expect(component.user.email).toEqual("shahnirali51@gmail.com");
    })

    it('should check the correct password in register ',()=>{
      component.user=user;
      component.register();
      expect(component.user.password).toEqual("nirali123");
    })
   
    it('should call register ',()=>{
      component.user=user;
      spyOn(component,"register")
      component.register();
      expect(component.register).toHaveBeenCalled();
    })

    it('should call mock authservice in register funtion',()=>{
      component.user=user;
      component.register();
      expect(mockAuthService.register).toHaveBeenCalledWith(user.email,user.password);
       
    })
         

  
  })
})

