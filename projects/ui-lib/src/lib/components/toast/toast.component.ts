import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { ToastItemComponent } from "../toast-item/toast-item.component";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: "ui-toast",
  standalone: true,
  imports: [CommonModule, ToastItemComponent],
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.css"],
})
export class ToastComponent {
  constructor(private readonly toastService: ToastService) {}

  get toasts() {
    return this.toastService.toasts;
  }
}
