import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UsersService} from '../services/users.service';
import {AlertService} from '../../helpers/service/alert.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  loading = false;
  submitted = false;
  changePasswordForm: FormGroup;
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
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get formFields() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.changePasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.changePasswordForm.value)
      .pipe(first())
      .subscribe(data => {
          this.alertService.success('Password successfully changed', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
