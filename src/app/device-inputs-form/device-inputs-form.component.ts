import { element } from 'protractor';
import { DeviceService } from './../services/device.service';
import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/Forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ipPattern } from '../common/validations/common-validators';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog,  MAT_DIALOG_DATA, PageEvent } from '@angular/material';

import { InterfacesDialogComponent } from '../interfaces-dialog/interfaces-dialog.component';


export interface Element {
  hostname: string;
  loopback: string;
  }

@Component({
  selector: 'app-device-inputs-form',
  templateUrl: './device-inputs-form.component.html',
  styleUrls: ['./device-inputs-form.component.css']
})

export class DeviceInputsFormComponent implements OnInit, AfterViewInit, AfterContentChecked {
  // tslint:disable-next-line:no-trailing-whitespace
  
     deviceForm = new FormGroup({
    'hostname': new FormControl('', [Validators.required]),
    'loopback': new FormControl('', [Validators.required, Validators.pattern(ipPattern)])
  });

  ELEMENT_DATA : Element[] = [];

  displayedColumns = ['hostname', 'loopback', 'Actions'];
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  get hostname() {
    return this.deviceForm.get('hostname');
  }

  get loopback() {
    return this.deviceForm.get('loopback');
  }

  // tslint:disable-next-line:no-trailing-whitespace
  
  constructor(private deviceService: DeviceService, public dialog: MatDialog) { }

  ngAfterContentChecked() {
    this.getAll();
  }

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
 }

  getAll() {
    this.ELEMENT_DATA =  this.deviceService.getAllDevices();
    this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  }

  ValidForm() : boolean {

    let isValid = false;
    isValid = this.deviceService.isUniqueHostname(this.hostname.value as string);
    if(!isValid) {
       this.deviceForm.setErrors({ hostnameNotUnique: true });
    } else {
        isValid = true;
    }
    isValid = this.deviceService.isUniqueLoopback(this.loopback.value as string);

    if(!isValid) {
       this.deviceForm.setErrors({ loopbackNotUnique: true });
    } else {
        isValid = true;
    }
     return isValid;
  }

  Save() {
    if (this.ValidForm()) {
       this.deviceService.saveDevice(this.deviceForm.value);
       this.deviceForm.reset();
    }
  }

  openDialog(rowElementHostname: string) {
    const dialogRef = this.dialog.open(InterfacesDialogComponent, {
      width: '850px',
      height: '600px',
      disableClose: true,
      data: {
             rowElementHostname
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

 }

