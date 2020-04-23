import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
<<<<<<< HEAD
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule}  from '@angular/material/stepper';
=======
import { MatSelectModule } from '@angular/material/select';
>>>>>>> origin/master

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatProgressButtonsModule,
    MatCheckboxModule,
<<<<<<< HEAD
    MatTabsModule,
    MatStepperModule,
=======
    MatSelectModule,
>>>>>>> origin/master

  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatProgressButtonsModule,
    MatCheckboxModule,
<<<<<<< HEAD
    MatTabsModule,
    MatStepperModule,
=======
    MatSelectModule,

>>>>>>> origin/master
  ],
})

export class MaterialModule {}
