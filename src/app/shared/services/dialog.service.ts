import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public Dialog:MatDialog) { }

  openTheDialogBox(header :string , message:any,closeIcon:boolean){
    const dialog =this.Dialog.open(DialogComponent,{
      data:{
        Header:header,
        content:message,
        CloseIcon:closeIcon
      }
    });
    return dialog;
  }
}
