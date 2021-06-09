import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  //loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.isLoggedIn()) {
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  public onLogin() {
      this.submitted = true;

      console.log("onLogin is called 0");
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      //this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .then(this.handleSuccess)
          .catch(this.handleError);

  }

  public onLogout() {
    this.authenticationService.logout();
  }

  private handleSuccess(response:any) {
    console.log("Login Successfully");
    location.reload();
  }

  private handleError(error:any) {
    console.log(error);

  }

  public isLoggedIn() : boolean {
    return this.authenticationService.isLoggedIn();
  }
}
