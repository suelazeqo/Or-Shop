import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFG: FormGroup;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private routerSVC: Router
  ) {}
  ngOnInit() {
    this.auth.authState().subscribe((user) => {
      if (user.email) {
        this.routerSVC.navigateByUrl('/');
      }
    });
    this.loginFG = this.fb.group({
      emailFC: this.fb.control('', [Validators.email]),
      passwordFC: this.fb.control('', [Validators.min(5), Validators.max(30)]),
    });
  }

  login() {
    this.auth.login(this.loginFG.value.emailFC, this.loginFG.value.passwordFC);
  }
}
