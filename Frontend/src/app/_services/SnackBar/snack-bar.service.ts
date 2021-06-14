import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    private currentSnackbar: MatSnackBarRef<SimpleSnackBar> = null;

    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string, duration: number = 2000) {
        this.currentSnackbar = this.snackBar.open(message, action, { duration: duration, });
    }
    hideSnackBar() {
        this.currentSnackbar?.dismiss();
    }
}