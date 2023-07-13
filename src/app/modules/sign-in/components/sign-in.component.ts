import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { kratosService } from '../services/kratos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  loading = false;
  errorMessage: string;
  loginForm: FormGroup;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private kratos: kratosService,
    private router: Router,

  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password_identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.loading = true
    let login: any = {
      method: "password",
      password_identifier: this.loginForm.value.password_identifier,
      password: this.loginForm.value.password,
    };
    this.subscription = this.kratos.loginIdentity(login).subscribe({
      next: (res: any) => {
        this.loading = false
        if (res?.session) {
          // Store the session in the local storage
          localStorage.setItem("session", JSON.stringify(res.session));
          this.router.navigate([`/`]);
        } else {
          // Handle invalid response or missing session
          console.error("Invalid response or missing session data.");
        }
      },
      error: (err: any) => {
        this.loading = false
        if (err?.status === 400 ) {
          this.errorMessage = "The provided credentials are invalid, check for spelling mistakes in your password or username, email address."
        } else if (err?.status === 500) {
          this.errorMessage = "An internal server error occurred. Please try again later.";
        } else {
          this.errorMessage = "An error occurred. Please try again later.";
        }
      },
    });
  }

}
