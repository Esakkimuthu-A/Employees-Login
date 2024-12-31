import { Injectable } from '@angular/core';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SnackBar{
  message:string,
  duration?: number,
  main: SnackType
}
export enum SnackType{
  Success,Error,Info,Warning,Default
}
@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  details = [
    { type: SnackType.Success,  event: "check_circle_outline", panelClass: 'snackbar-success' },
    { type: SnackType.Error,  event: "highlight_off", panelClass: 'snackbar-error' },
    { type: SnackType.Warning, event: 'warning', panelClass: 'snackbar-warning' },
    { type: SnackType.Info, event: 'touch_app', panelClass: 'snackbar-info' },
    { type: SnackType.Default, event: 'settings_backup_restore', panelClass: 'snackbar-defalute' },
  ];

  openSnackBar(Input: SnackBar): void{
    const property = this.details.find(x => x.type === Input.main);
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: Input.duration? Input.duration: 2000,
      data: {
        header: Input.message,
        content: property?.event
      },
      verticalPosition: 'top',
      panelClass: property?.panelClass
    });
  }
}
