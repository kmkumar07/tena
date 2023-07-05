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
  loginForm:FormGroup;
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
    let login: any = {
      method: "password",
      password_identifier: this.loginForm.value.password_identifier,
      password: this.loginForm.value.password,
    };
    this.subscription = this.kratos.loginIdentity(login).subscribe({
      next: (res: any) => {
        this.router.navigate([`/`]);
        return res;
      },
      error: (err: any) => {
        console.log('something wrong occured', err);
      },
    });
  }

}
