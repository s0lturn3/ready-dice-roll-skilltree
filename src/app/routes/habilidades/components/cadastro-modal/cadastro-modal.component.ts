import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { StorageService } from '../../../../shared/services/storage.service';
import { FormUtils } from '../../../../shared/utils/form-utils';
import { SkillsService } from '../../services/skills.service';

import { HabilidadeDto } from '../../../../shared/models/db/habilidade.dto';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';


@Component({
  selector: 'cadastro-modal',
  imports: [
    ReactiveFormsModule,
    NgClass,

    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumber,
    ToastModule,
    Select,
    Tooltip
  ],
  templateUrl: './cadastro-modal.component.html',
  styleUrl: './cadastro-modal.component.css'
})
export class CadastroModalComponent implements OnInit {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private _skills: SkillsService = inject(SkillsService);
  // #endregion PRIVATE

  // #region PUBLIC
  @Input() skill?: HabilidadeDto | null;

  /** Emite um evento ao salvar. O valor enviado indica se o modal deve ser fechado. */
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  public saving: boolean = false;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM CONFIG <==========
  public form: FormGroup = new FormGroup({
    Nome: new FormControl<string | null>(null, [ Validators.required ]),
    DescricaoCurta: new FormControl<string | null>(null, [ Validators.required ]),
    DescricaoCompleta: new FormControl<string | null>(null),
    Tipo: new FormControl<number | null>(null, [ Validators.required ]),
    Nivel: new FormControl<number | null>(null, [ Validators.required ]),
    HabilidadeDependenciaId: new FormControl<number | null>(null),
    ExclusivaClasseId: new FormControl<number | null>(null),
    ExclusivaRacaId: new FormControl<number | null>(null),
  });

  public get FormUtils() { return FormUtils; }
  // #endregion ==========> FORM CONFIG <==========


  constructor(
    private _message: MessageService,
    private _storage: StorageService
  ) { }

  ngOnInit(): void {
    this.validateMode();
  }


  // #region ==========> API METHODS <==========

  // #region GET
  // [...]
  // #endregion GET

  // #region POST
  saveHabilidade(keepOpen: boolean = true) {
    FormUtils.validateForm(this.form);
  }
  // #endregion POST

  // #region PUT
  // [...]
  // #endregion PUT

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  private validateMode(): void {
    if (this.skill) {
      this.form.patchValue({
        Nome: this.skill.Nome,
        Descricao: this.skill.DescricaoCurta,
        Status: 1,
        SistemaId: 1,
      });
    }

    console.log(this.skill);
    console.log(this.form);
    
  }
  // #endregion ==========> UTILS <==========

}
