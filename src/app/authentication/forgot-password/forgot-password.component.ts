import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UsersService} from '../services/users.service';
import {AlertService} from '../../helpers/service/alert.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loading = false;
  submitted = false;
  forgotPasswordForm: FormGroup;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private userService: UsersService,
              private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get formFields() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.forgotPasswordForm.value)
      .pipe(first())
      .subscribe(data => {
          this.alertService.success('Email Successful sent', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
