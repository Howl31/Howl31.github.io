import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public base_url = "https://clever-space.herokuapp.com/authenticate/"
  // public base_url = "http://127.0.0.1:8000/authenticate/"

  constructor(public http:HttpClient) { }

  sendOTPApi(data: any): Observable<any> {
    return this.http.post(this.base_url + "send_otp/", data);
  }

  verifyOTPApi(data: any): Observable<any> {
    return this.http.post(this.base_url + "verify_otp/", data).pipe(
      catchError((err) => {
        alert("Login Failed")
        return throwError(err);
      })
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(this.base_url + "login", data).pipe(
      catchError((err) => {
        alert("Invalid Credentials")
        return throwError(err);
      })
    );
  }
}

