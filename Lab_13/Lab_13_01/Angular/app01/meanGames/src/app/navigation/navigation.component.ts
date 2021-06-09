import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,
              private location: Location
    ) { }

  ngOnInit(): void {
  }

  public isLoggedIn() : boolean {
    return this.authenticationService.isLoggedIn();
  }

  public isActiveTab(url:string) : string {
    let currentPath = this.location.path().split("/")[1];
    return (url===currentPath? "active": "");
  }

  // public onLogin() {
  //   console.log("Login event");

  // }
}
