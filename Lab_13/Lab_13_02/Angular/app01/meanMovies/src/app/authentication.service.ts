import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseURL: string = "http://localhost:3000/api";

  isUserLoggedIn!: boolean;
  loggedinUser!: string;
  token!: any;

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.isUserLoggedIn = true;
    }
  }

  public login(username:string, password:string) : Promise<any> {
    // 1- Build URL
    const url: string = this.baseURL+"/auth";
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.post(url,{username:username,password:password}).toPromise()
      .then((response) => this.handleSuccess(response))
      .catch((error) => this.handleError(error));
  }

  private handleSuccess(response:any): any {
    this.isUserLoggedIn = response.success;
    this.token = response.token;

    localStorage.setItem("token",this.token);
    localStorage.setItem("loggedinUser",this.loggedinUser);
  }

  private handleError(error:any): any {
    this.isUserLoggedIn = false;
    console.log(error);
  }

  public logout() : void {
    this.isUserLoggedIn = false;
    localStorage.removeItem("token");
    localStorage.removeItem("loggedinUser");
  }

  public isLoggedIn() : boolean {
    return this.isUserLoggedIn;
  }

  public getToken() : any {
    return this.token;
  }
}
