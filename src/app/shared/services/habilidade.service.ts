import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HabilidadeService {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  private readonly BASE_URL: string = `${ environment.apiUrl }/skills`;
  // #endregion PRIVATE

  // #endregion ==========> PROPERTIES <==========


  constructor( private _http: HttpClient ) { }


  // #region ==========> API METHODS <==========

  // #region GET
  public getSkillsDemo(): Observable<any> {
    return this._http.get<any>(`${this.BASE_URL}`);
  }
  // #endregion GET

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
