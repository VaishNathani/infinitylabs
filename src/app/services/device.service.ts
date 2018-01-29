import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class DeviceService {

  constructor() { }

  saveDevice(formData : FormGroup) {

    let retrievedObject = localStorage.getItem('DeviceInputs');
    let stored = (retrievedObject == null || retrievedObject === undefined || retrievedObject === '')
        ? [] : JSON.parse(retrievedObject);

      stored.push(formData);
     localStorage.setItem('DeviceInputs', JSON.stringify(stored));

   }

    getAllDevices() : any  {

     let storedDevices : any = JSON.parse(localStorage.getItem('DeviceInputs'));
     return storedDevices == null ? [] : storedDevices;
   }

  isUniqueHostname(value : string) : boolean {
    let retrievedObject : any = JSON.parse(localStorage.getItem('DeviceInputs'));
    let result = retrievedObject == null ?
        null : retrievedObject.find(deviceInputsObj => deviceInputsObj.hostname === value);
    return (result == null || result === undefined || result === '');
  }

  isUniqueLoopback(value : string) : boolean {
    let retrievedObject : any = JSON.parse(localStorage.getItem('DeviceInputs'));
    let result =  retrievedObject == null ?
        null : retrievedObject.find(deviceInputsObj => deviceInputsObj.loopback === value);
       return (result == null || result === undefined || result === '');

  }
}
