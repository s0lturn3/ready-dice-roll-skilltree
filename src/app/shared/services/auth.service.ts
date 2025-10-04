import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

import { Router } from '@angular/router';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private readonly USERS_URL: string = `${ environment.apiUrl }/demo`;
  // #endregion PRIVATE

  // #region PUBLIC
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> INITIALIZATION <==========
  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {
    const token = this.getToken();
    this.loggedIn = new BehaviorSubject<boolean>(token ? true : false);
  }
  // #endregion ==========> INITIALIZATION <==========


  // #region ==========> SERVICE METHODS <==========

  // #region GET
  public login(campanha: string, personagem: string): Observable<ApiResponse<{ access_token: string, userId: string, userName: string }>> {
    const params: HttpParams = new HttpParams()
      .set('campanha', campanha)
      .set('personagem', personagem);

    const url = `${this.USERS_URL}/login`;

    return this._httpClient.post<ApiResponse<{ access_token: string, userId: string, userName: string }>>(url, null, { 'params': params })
    .pipe( tap(response => {
        this.handleError(response);
        this.setToken(response.body!.access_token, response.body!.userId, response.body!.userName, true);
      }) );
  }
  // #endregion GET

  // #endregion ==========> SERVICE METHODS <==========


  // #region ==========> UTILS <==========
  public logout(): void {
    this.loggedIn.next(false);
    this.destroyToken();
  }


  private buildHeaders(appendToken: boolean): HttpHeaders {
    const headersConfig: any = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }

  private getToken(): string { return window.localStorage['authToken'] || window.sessionStorage['authToken']; }
  private setToken(token: string, loggedUserId: string, loggedUserName: string, rememberMe: boolean = false) {
    if (rememberMe) {
      localStorage['authToken'] = token;
      localStorage['loggedUserId'] = loggedUserId;
      localStorage['loggedUserName'] = loggedUserName;
    }
    else {
      sessionStorage['authToken'] = token;
      sessionStorage['loggedUserId'] = loggedUserId;
      sessionStorage['loggedUserName'] = loggedUserName;
    }

    this.loggedIn.next(true);
  }


  private destroyToken(): void {
    window.localStorage.removeItem('authToken');
    window.sessionStorage.removeItem('authToken');
    
    window.localStorage.removeItem('loggedUserId');
    window.sessionStorage.removeItem('loggedUserId');

    window.localStorage.removeItem('loggedUserName');
    window.sessionStorage.removeItem('loggedUserName');

    this._router.navigate(['/auth']);
  }


  private handleError(response: ApiResponse<any>) {
    if (response.error) {      
      if (response.body['message'] === 'jwt expired') {
        this.destroyToken();
      }

      throw new Error(response.errorMessage);
    }
  }
  private handleTokenError(error: HttpErrorResponse) {
    if (error.error['message'] && error.error['message'] === 'Sessão expirada. Faça login novamente.') {
      window.localStorage.removeItem('authToken');
      window.sessionStorage.removeItem('authToken');
      
      window.localStorage.removeItem('loggedUserId');
      window.sessionStorage.removeItem('loggedUserId');

      window.localStorage.removeItem('loggedUserName');
      window.sessionStorage.removeItem('loggedUserName');

      location.reload();
    }

    return throwError(() => new Error('Ocorreu um erro não identificado...'));
  }
  // #endregion ==========> UTILS <==========

}
