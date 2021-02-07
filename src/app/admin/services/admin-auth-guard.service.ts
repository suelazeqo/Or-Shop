import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth:AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    
    return this.auth.appUser$
    
    .pipe(map(appUser => appUser.isAdmin));
    
  };
}
