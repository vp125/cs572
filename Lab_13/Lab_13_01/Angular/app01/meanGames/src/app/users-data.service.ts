import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private baseURL: string = "http://localhost:3000/api";


  constructor(private http:HttpClient) { }

  public register(newUser:User) : Promise<any>{
    // 1- Build URL
    const url: string = this.baseURL+"/users";
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.post(url,newUser).toPromise().then(this.registeredUser).catch(this.handleError);
  }

  private registeredUser(resposne:any) : any {
    return resposne;
  }

  private handleError(error:any) : any {
    console.log(error);
  }
}
