import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";

import { BaseInputComponent } from "../BaseInputComponent";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormInputErrorDirective } from "../../directives";
import { Estado } from "@domain";

@Component({
  selector: "ui-select-estado",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormInputErrorDirective,
  ],
  templateUrl: "./select-estado.component.html",
  styleUrl: "./select-estado.component.css",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectEstadoComponent,
    },
  ],
})
export class SelectEstadoComponent extends BaseInputComponent {
  @ViewChild(FormInputErrorDirective)
  private childDirective!: FormInputErrorDirective;

  override value: Estado | undefined = undefined;

  override onChangeHandler(event: MatSelectChange): void {
    this.onChange(event.value);
  }

  public onBlurHandler(): void {
    this.onTouched();
    this.childDirective.onBlur();
  }

  /* override writeValue(value: string) {
    super.writeValue(value);
    if (this.inputRef) {
      this.inputRef.nativeElement.value = value;
    }
  } */
}
