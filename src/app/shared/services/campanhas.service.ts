import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { CampanhaDto } from '../models/db/campanha.dto';

@Injectable({
  providedIn: 'root'
})
export class CampanhasService {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private readonly BASE_URL: string = `${ environment.apiUrl }/demo`;
  // #endregion PRIVATE

  // #endregion ==========> PROPERTIES <==========


  constructor( private _http: HttpClient ) { }


  // #region ==========> API METHODS <==========

  // #region GET
  public getCampanhas(): Observable<ApiResponse<CampanhaDto[]>> {
    return this._http.get<ApiResponse<CampanhaDto[]>>(`${this.BASE_URL}/campaigns`).pipe(take(1));
  }
  // #endregion GET

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
