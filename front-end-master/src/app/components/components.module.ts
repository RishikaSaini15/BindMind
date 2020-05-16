import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
    ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
