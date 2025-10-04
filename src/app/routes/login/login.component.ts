import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CampanhaDto } from '../../shared/models/db/campanha.dto';
import { AuthService } from '../../shared/services/auth.service';
import { CampanhasService } from '../../shared/services/campanhas.service';
import { FormUtils } from '../../shared/utils/form-utils';

import { NgClass } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,

    CardModule,
    DividerModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    ToastModule,
    Message
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  public loading: boolean = false;
  public campanhas$: CampanhaDto[] | undefined;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM CONFIG <==========
  public form: FormGroup = new FormGroup({
    Campanha: new FormControl<string | null>(null, [ Validators.required ]),
    Personagem: new FormControl<string | null>(null, [ Validators.required ]),
  });

  public get FormUtils(): typeof FormUtils { return FormUtils; }
  // #endregion ==========> FORM CONFIG <==========


  constructor(
    private _auth: AuthService,
    private _campanhas: CampanhasService,
    private _message: MessageService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getCampanhas();
  }


  // #region ==========> API METHODS <==========

  // #region GET
  public getCampanhas(): void {
    this._campanhas.getCampanhas().subscribe({
      next: response => {
        this.campanhas$ = response.body;
      },
      error: error => {
        this._message.add({
          severity: 'error',
          summary: 'Erro ao buscar as campanhas',
          detail: error.error.message,
          key: 'tc',
          life: 3000,
        });
      }
    })
  }
  // #endregion GET

  // #region POST
  public login(): void {
    if (this.form.valid) {
      this.loading = true;
  
      this._auth.login(this.form.controls['Campanha'].value, this.form.controls['Personagem'].value).subscribe({
        next: () => {
          this.loading = false;
          this._router.navigate(['/habilidades']);
        },
        error: error => {
          this._message.add({
            severity: 'error',
            summary: 'Erro no login',
            detail: error.error.errorMessage,
            key: 'tc',
            life: 3000,
          });
  
          this.loading = false;
          throw new Error(error.error.errorMessage);
        }
      });
    }
    else {
      FormUtils.validateForm(this.form);

      this._message.add({
        severity: 'error',
        summary: 'Erro nos campos',
        detail: 'Preencha os campos corretamente.',
        key: 'tc',
        life: 3000,
      });
    }
  }
  // #endregion POST

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
