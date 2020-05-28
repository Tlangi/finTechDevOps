import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UsersService} from '../services/users.service';
import {AlertService} from '../../helpers/service/alert.service';
import {first} from 'rxjs/operators';
import {MustMatchService} from '../../helpers/service/must-match.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loading = false;
  submitted = false;
  resetPasswordForm: FormGroup;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private userService: UsersService,
              private alertService: AlertService,
              private mustMatch: MustMatchService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, {validators: this.mustMatch.mustMatch('password', 'confirmPassword')});
  }

  get formFields() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.resetPasswordForm.value)
      .pipe(first())
      .subscribe(data => {
          this.alertService.success('Password successfully reset', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }


}
