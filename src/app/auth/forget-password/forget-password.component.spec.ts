import { ForgetPasswordComponent } from './forget-password.component';

describe("Forget password Component",()=>{
  let component : ForgetPasswordComponent;
  let mockAuthService;
  let email= "shahnirali51@gmail.com"
  beforeEach(()=>{
    mockAuthService = jasmine.createSpyObj(['forgetPassword'])
    component =  new ForgetPasswordComponent(mockAuthService)
  })

  describe('Forget password',()=>{
     it('should call forget password with correct email ',()=>{
      spyOn(component, "forgetPassword");
      component.forgetPassword(email);
      expect(component.forgetPassword).toHaveBeenCalledWith("shahnirali51@gmail.com");
    })
    it('should call mockauthService in forgetpassword function ',()=>{
        component.forgetPassword(email);
        expect(mockAuthService.forgetPassword).toHaveBeenCalledWith(email);
      })
 })
})


