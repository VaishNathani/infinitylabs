import { inject } from '@angular/core/testing';
import { InterfacesService } from './../services/interfaces.service';
import { Component, OnInit, ViewChild, AfterViewInit, AfterContentChecked, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ipPattern, CommonValidators } from '../common/validations/common-validators';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MAT_DIALOG_DATA }  from '@angular/material';

export interface Element {
  interface: string;
  ip: string;
  }

@Component({
  selector: 'app-interfaces-dialog',
  templateUrl: './interfaces-dialog.component.html',
  styleUrls: ['./interfaces-dialog.component.css']
})


export class InterfacesDialogComponent implements OnInit, AfterViewInit, AfterContentChecked {

  interfacesForm = new FormGroup({
    'interface': new FormControl('', [Validators.required, CommonValidators.invalidInterfaceName]),
    'ip': new FormControl('', [Validators.required, Validators.pattern(ipPattern)])
  });

  ELEMENT_DATA : Element[] = [];

  displayedColumns = ['interface', 'ip', 'Actions'];
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);

  hostDisplayName : any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  get interface() {
    return this.interfacesForm.get('interface');
  }

  get ip() {
    return this.interfacesForm.get('ip');
  }
  constructor(private interfacesService: InterfacesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.hostDisplayName =  this.data['rowElementHostname'];
  }

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
    this.ELEMENT_DATA =  this.interfacesService.getAllInterfaces(this.data['rowElementHostname']);
    this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  }
  ValidForm() : boolean {
    let isValid = false;

    isValid = this.interfacesService.isUniqueInterface(this.interface.value as string, this.data['rowElementHostname']);
    if(!isValid) {
       this.interfacesForm.setErrors({ interfaceNotUnique: true });
    } else {
      isValid = true;
    }

    isValid = this.interfacesService.isUniqueIP(this.ip.value as string);
    if(!isValid) {
        this.interfacesForm.setErrors({ ipNotUnique: true });
    } else {
      isValid = true;
    }
    return isValid;
  }

  Save() {
      if (this.ValidForm()) {
         this.interfacesService.saveInterface(this.data['rowElementHostname'], this.interfacesForm.value);
         this.interfacesForm.reset();
      }
}
}
