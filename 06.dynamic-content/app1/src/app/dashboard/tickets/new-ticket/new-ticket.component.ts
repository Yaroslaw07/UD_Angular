import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ButtonComponent } from "../../../shared/button/button.component";
import { ControlComponent } from "../../../shared/control/control.component";

@Component({
  selector: "app-new-ticket",
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: "./new-ticket.component.html",
  styleUrl: "./new-ticket.component.css",
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild("form") form?: ElementRef<HTMLFormElement>;
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  // @Output() add = new EventEmitter();
  add = output<{ title: string; text: string }>();

  ngOnInit() {
    console.log("ON INIT");
    console.log(this.form?.nativeElement);
  }

  ngAfterViewInit(): void {
    console.log("AFTER VIEW INIT");
    console.log(this.form?.nativeElement);
  }

  onSubmit(title: string, description: string) {
    console.log(title, ": ", description);
    this.add.emit({ title: title, text: description });
    this.form?.nativeElement.reset();
  }
}
