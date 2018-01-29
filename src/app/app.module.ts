import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/Forms';

import {MatTableModule} from '@angular/material/table';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { DeviceInputsFormComponent } from './device-inputs-form/device-inputs-form.component';

import { DeviceService } from './services/device.service';
import { InterfacesService } from './services/interfaces.service';
import { InterfacesDialogComponent } from './interfaces-dialog/interfaces-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceInputsFormComponent,
    InterfacesDialogComponent
  ],
  entryComponents: [
    InterfacesDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [DeviceService, InterfacesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
