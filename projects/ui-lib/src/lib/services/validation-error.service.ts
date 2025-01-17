import { Injectable } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { FormErrors, isEmpty } from "../utils";

@Injectable({
  providedIn: "root",
})
export class ValidationErrorService {
  public getErrorMessage(errors?: ValidationErrors | null): string {
    if (!errors || isEmpty(errors)) {
      return "";
    }
    const firstError = Object.keys(errors)[0];
    switch (firstError) {
      case "required":
        return FormErrors.REQUIRED;
      case "email":
        return FormErrors.EMAIL;
      case "url":
        return FormErrors.URL;
      case "min":
        return `${FormErrors.MIN}${errors["min"].min}`;
      case "max":
        return `${FormErrors.MAX}${errors["max"].max}`;
      case "minlength":
        return `${FormErrors.MINLENGTH}${errors["minlength"].requiredLength}`;
      case "maxlength":
        return `${FormErrors.MAXLENGTH}${errors["maxlength"].requiredLength}`;
      case "existeId":
        return "Este id ya existe, use oto.";
      case "fecha":
        return FormErrors.DATE;
      default:
        return "Error desconocido";
    }
  }
}
