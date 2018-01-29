import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/Forms';
import { Injectable } from '@angular/core';

interface DeviceInterfacesInfo {
  hostname: string;
  interface: string;
  ip: string;
}

export class InterfacesService {

  constructor() { }

  saveInterface(data : string, formData : FormGroup) {

    let obj = {
      hostname : data,
    };

    let finalObj = Object.assign(obj, formData);

    let retrievedObject = localStorage.getItem('InterfaceInputs');

    let stored = (retrievedObject == null || retrievedObject === undefined || retrievedObject === '')
        ?  [] :  JSON.parse(retrievedObject);

    stored.push(finalObj);
    localStorage.setItem('InterfaceInputs', JSON.stringify(stored));
   }


    getAllInterfaces(value : string) : any  {

     let retrievedObject = JSON.parse(localStorage.getItem('InterfaceInputs'));
     console.log(retrievedObject);
     let result : any =  retrievedObject == null ? null :
     retrievedObject.filter((e) => e.hostname === value );

   //   let results : DeviceInterfacesInfo[] = [];
  //   results.push(result);
 //    console.log(results);
      return (result == null || result === undefined)  ? [] : result;
  }

  isUniqueIP(value : string) {
    let retrievedObject : any = JSON.parse(localStorage.getItem('InterfaceInputs'));
    let result =  retrievedObject == null ? null :
        retrievedObject.find(interfaceInputsObj => interfaceInputsObj.ip === value);
    return (result == null || result === undefined || result === '');
}

  isUniqueInterface(value : string, hostvalue: string) {
    let retrievedObject : any = JSON.parse(localStorage.getItem('InterfaceInputs'));
    let result =  retrievedObject == null ? null :
        retrievedObject.find(interfaceInputsObj => interfaceInputsObj.interface === value && interfaceInputsObj.hostname === hostvalue);
    return (result == null || result === undefined || result === '');
}
}
