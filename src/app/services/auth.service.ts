import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppError } from '../common/validator/app-error';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BadRequest } from '../common/validator/bad-request';
import { NotFound } from '../common/validator/not-found';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly role =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  private httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private router: Router, private http: HttpClient) {}

  login(user: any) {
    return this.http
      .post(
        'https://localhost:44329/auth/Login',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(
        map((response: any) => {
          let result = response;
          if (result && result.token) {

            localStorage.setItem('token', result.token);
            alert('logged In Successfully');

            return (this.isInRole('Admin'))?this.router.navigate(['/']):this.router.navigate(['/home']);
          }
          return false;
        })
      );
  }

  logOut() {
    let httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (localStorage.getItem('token') as string),
      }),
    };

    this.http
      .post('https://localhost:44329/auth/logout', null)
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        console.log(res);
      });

    localStorage.removeItem('token');

    alert('LogOut Successfully');
    return this.router.navigate(['/customerLogin']);
  }

  IsUserNameExist(userName:string):boolean{

    this.http
    .get('https://localhost:44329/auth/'+userName)
    .pipe(catchError(this.handleError))
    .subscribe((res) => {
      console.log(res);
      const isExist = (res as boolean);
      return isExist;
    });

    return false;
  }

  isAutherize() {
    const token = this.getToken();
    if (!token) return false;

    const helper = new JwtHelperService();
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);

    return !isExpired;
  }

  isInRole(role: string) {
    const helper = new JwtHelperService();

    const token = this.getToken();
    if (!token) return false;

    const decodedToken = helper.decodeToken(token);
    const isExpired = helper.isTokenExpired(token);
    if (isExpired) return !isExpired;

    const userRole: string = decodedToken[this.role];
    if (userRole == role) return true;
    return false;
  }

  getUserName(){
    const helper = new JwtHelperService();
    const token = this.getToken();
    if (!token) return false;

    const decodedToken = helper.decodeToken(token);
    const isExpired = helper.isTokenExpired(token);
    if (isExpired) return !isExpired;
    return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }
  private getToken() {
    return localStorage.getItem('token');
  }

  handleError(error: Response) {
    if (error.status === 404) return throwError(new NotFound(error));

    if (error.status === 400) return throwError(new BadRequest(error));

    return throwError(new AppError(error));
  }
}
