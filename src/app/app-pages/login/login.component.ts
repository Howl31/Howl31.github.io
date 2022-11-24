import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  OTPsent : boolean = false;
  isOTP : boolean = false;
  isPasssword : boolean = true;
  isOtpDisabled: boolean = true
  // , private api: ApiService

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      username : this.fb.control("", [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      otp : this.fb.control("", [Validators.minLength(6), Validators.maxLength(6)]),
      password : this.fb.control("", Validators.required)
    })
    console.log(this.isOtpDisabled, '_');
    
  }

  onSubmit() {
    if (this.isPasssword){
      this.api.login(this.loginForm.value).subscribe((response: any) => {
        console.log(response, "login");
        alert("Logged In Successfully")
        console.log(this.loginForm.value)
      });
    }else if(this.isOTP){
      this.api.verifyOTPApi(this.loginForm.value).subscribe((response: any) => {
        console.log(response, "verifyOtp");
        if ("status" in response){
          if (response.status == 200){
            alert("Logged In Successfully")
          }else{
            alert(response.data)
          }
        }else{
          alert("Logged In Successfully")
        }
        // alert("Logged In Successfully")
        console.log(this.loginForm.value)
      });
    }
  }

  enableOTP(){
    this.isOTP = true
    this.isPasssword = false
    // this.loginForm.get("otp").setValue("")
    // this.loginForm.get("password").setValue("password")
    this.loginForm.get("otp").setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    this.loginForm.get("password").clearValidators()
    this.loginForm.get("password").updateValueAndValidity()
    this.loginForm.get("otp").updateValueAndValidity()
  }

  enablePassword(){
    this.isOTP = false
    this.OTPsent = false
    this.isPasssword = true
    // this.loginForm.get("otp").setValue("000000")
    // this.loginForm.get("password").setValue("")
    this.loginForm.get("password").setValidators([Validators.required])
    this.loginForm.get("otp").clearValidators()
    this.loginForm.get("password").updateValueAndValidity()
    this.loginForm.get("otp").updateValueAndValidity()
  }

  sendOTP(){
    this.api.sendOTPApi(this.loginForm.value).subscribe((response: any) => {
      console.log(response, "sendOtp");
      if (response.status == 200){
        alert(response.data)
      }else{
        alert(response.data)
      }
    });
    this.OTPsent = true
  }

  onInputEmail(){
    if (!this.loginForm.controls["username"].errors){
      this.isOtpDisabled = false
    }else{
      this.isOtpDisabled = true
    }
  }

}
