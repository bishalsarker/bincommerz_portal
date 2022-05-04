import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'projects/account-management/src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public appName: string = '</hydb>';

  public regForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    rePassword: new FormControl('')
  });

  public showButton: boolean = true;
  public hasError: boolean = false;
  public errorMessage: string = '';

  constructor(public httpClient: HttpClient, public router: Router) {}

  ngOnInit() {
  }

  public createAccount(): void {
    this.showButton = false;
    let isValid = false;

    if (!this.checkIfPasswordsMatches()) {
      this.hasError = true;
      this.errorMessage = "Passwords doesn't match";
      this.showButton = true;
      isValid = false;
    } else if (!this.userName.value.match(/^[a-zA-Z0-9-]+$/)) {
      this.hasError = true;
      this.errorMessage = "Invalid username format";
      this.showButton = true;
      isValid = false;
    } else {
      this.hasError = false;
      isValid = true;
    }

    if(isValid) {
      this.httpClient.post<any>(`${environment.api_host}auth/createaccount`, {
        userName: this.userName.value,
        email: this.email.value,
        password: this.password.value
      }).subscribe(response => {
        if(!response.isSuccess) {
          this.hasError = true;
          this.errorMessage = response.message;
        } else {
          this.router.navigateByUrl('/signup-success');
        }
      }, err => {}, () => {
        this.showButton = true;
      });
    }
  }

  public get userName(): AbstractControl {
    return this.regForm.get('userName');
  }

  public get email(): AbstractControl {
    return this.regForm.get('email');
  }

  public get password(): AbstractControl {
    return this.regForm.get('password');
  }

  public get rePassword(): AbstractControl {
    return this.regForm.get('rePassword');
  }

  public checkIfPasswordsMatches(): boolean {
    return (this.password.value === this.rePassword.value);
  }

}
