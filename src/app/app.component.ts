import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { ToastComponent } from "@ui-lib";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "crypto-tracking";
}
