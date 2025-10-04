import { AbstractControl, FormGroup, UntypedFormGroup } from "@angular/forms";

/** Classe estática que contém diversos métodos de utilidade para formulário. */
export class FormUtils {

  /**
   * Valida o formulário, marca todos os campos como dirty/touched para exibir as classes de inválido se necessário.
   * @param form FormGroup a ser validado
  */
  public static validateForm(form: UntypedFormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      const currentValue = control?.value;

      control?.reset();

      control?.markAsDirty();
      control?.markAsTouched();

      control?.setValue(currentValue);

      if (control instanceof UntypedFormGroup) this.validateForm(control);
    });
  }


  /** Informa se um Control está inválido ou não. */
  public static isInvalidControl(control: AbstractControl<any> | null | undefined): boolean {
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  /** Informa se um Control está inválido ou não. */
  public static isInvalidControlName(controlName: string, formGroup: FormGroup | UntypedFormGroup): boolean {
    const control = formGroup.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

}