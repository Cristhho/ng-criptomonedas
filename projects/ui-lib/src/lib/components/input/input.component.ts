import {
  Component,
  ElementRef,
  Injector,
  Input,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

import { BaseInputComponent } from "../BaseInputComponent";
import { FormInputErrorDirective } from "../../directives";

type InputType = "text" | "url" | "email" | "tel" | "date";

@Component({
  selector: "ui-input",
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormInputErrorDirective,
  ],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.css",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent extends BaseInputComponent {
  @ViewChild(FormInputErrorDirective)
  private childDirective!: FormInputErrorDirective;
  @ViewChild("inputRef")
  private inputRef!: ElementRef<HTMLInputElement>;

  @Input()
  inputType: InputType = "text";

  override value = "";

  constructor(override readonly injector: Injector) {
    super(injector);
  }

  override onChangeHandler(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onChange(target.value);
  }

  public onBlurHandler(): void {
    this.onTouched();
    this.childDirective.onBlur();
  }

  override writeValue(value: string) {
    super.writeValue(value);
    if (this.inputRef) {
      this.inputRef.nativeElement.value = value;
    }
  }
}
