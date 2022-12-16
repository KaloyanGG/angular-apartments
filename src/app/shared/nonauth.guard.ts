import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonauthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(take(1), map(user => !!user), tap(isAuthenticated => {
      if (isAuthenticated) { 
        this.router.navigate(['/auth/myProfile']);
      } 
    }));

    //TODO: Always isAuthenticated is false?

    // return this.authService.user.pipe(
    //   take(1),
    //   map(user => {
    //     return !!user;
    //     // const loginRequired = route.data['loginRequired'];
    //     // if (loginRequired === undefined || !!user === loginRequired) { return true; }
    //     // const returnUrl = route.url.map(u => u.path).join('/');
    //     // return !!user ?
    //     //   this.router.createUrlTree(['/theme/recent'], { queryParams: { returnUrl } }) :
    //     //   this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl } });
    //   })
    // );

  }

}


