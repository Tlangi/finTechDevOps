import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UsersService} from '../services/users.service';
import {AlertService} from '../../helpers/service/alert.service';
import {MustMatchService} from '../../helpers/service/must-match.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent implements OnInit {

  loading = false;
  submitted = false;
  editProfileForm: FormGroup;

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
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      cell: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, this.mustMatch.mustMatch('password', 'confirmPassword'));

    this.editProfileForm.controls.email.valueChanges.subscribe(email => {
      this.editProfileForm.controls.username.setValue(email);
    });
  }

  get formFields() { return this.editProfileForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.editProfileForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.editProfileForm.value)
      .pipe(first())
      .subscribe(data => {
          this.alertService.success('Edit Successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
