import { Component, OnInit } from '@angular/core';
import {AlertController, IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'app-printer-list',
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PrinterListComponent  implements OnInit {

  public printers: any[] = [];
  constructor(
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    const savedPrinters = localStorage.getItem('printers')
    if (savedPrinters) {
      this.printers = JSON.parse(savedPrinters);
      for (const printer of this.printers) {
        printer.timePassed = this.getTimePassed(printer.lastMaintenance);
      }
    }
  }

  addNewPrinter() {
    const lastMaintenance = moment().format('DD.MM.YYYY HH:mm');
    this.printers.push({
      name: 'Printer name',
      lastMaintenance,
      timePassed: this.getTimePassed(lastMaintenance),
    });
    this.savePrinters();
  }

  async doMaintenance(printer: any) {
    const modal = await this.alertController.create({
      header: 'Maintenance',
      subHeader: 'Save maintenance date?',
      buttons: [{
        text: 'Yes',
        role: 'yes',
      }, {
        text: 'No',
        role: 'no',
      }],
    });
    await modal.present();
    const { role } = await modal.onWillDismiss();
    if (role === 'yes') {
      printer.lastMaintenance = moment().format('DD.MM.YYYY HH:mm');
      printer.timePassed = this.getTimePassed(printer.lastMaintenance);
      this.savePrinters();
    }
  }

  savePrinters() {
    localStorage.setItem('printers', JSON.stringify(this.printers));
  }

  async deletePrinter(printer: any) {
    const modal = await this.alertController.create({
      header: 'Delete printer',
      subHeader: 'Do you want to delete the printer?',
      buttons: [{
        text: 'Yes',
        role: 'yes',
      }, {
        text: 'No',
        role: 'no',
      }],
    });
    await modal.present();
    const { role } = await modal.onWillDismiss();
    if (role === 'yes') {
      this.printers = this.printers.filter(p => p !== printer);
      this.savePrinters();
    }
  }

  private getTimePassed(lastMaintenance: string) {
    const lastMaintenanceMoment = moment(lastMaintenance, 'DD.MM.YYYY HH:mm');
    const today = moment();
    const diff = today.diff(lastMaintenanceMoment, 'days');
    if (diff === 0) {
      return 'Today';
    }
    return diff + ' days ago';
  }
}
