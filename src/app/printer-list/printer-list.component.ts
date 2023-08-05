import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-printer-list',
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PrinterListComponent  implements OnInit {

  public printers: number[] = [];
  constructor() { }

  ngOnInit() {}

  addNewPrinter() {
    console.warn("IDEMOOO");
    this.printers.push(1);
  }
}
