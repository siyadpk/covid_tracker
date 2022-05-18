import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginError: boolean = false;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  attemptLogin() {
    if (this.loginForm.valid) {
      if (this._authService.login(this.loginForm.value)) {
        this._router.navigateByUrl('/dashboard');
        this.loginError = false;
      } else {
        this.loginError = true;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  changeLoginValues(){
    this.loginError = false
  }




}
