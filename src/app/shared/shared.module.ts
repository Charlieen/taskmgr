import { NgModule  } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {CalendarModule} from 'angular-calendar';

import {
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdButtonToggleModule,
    MdChipsModule,
    MdTabsModule

} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from 'app/directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import { AreaListComponent } from './area-list/area-list.component';


@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdButtonToggleModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    MdChipsModule,
    MdTabsModule,
    CalendarModule
  ],
  exports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdButtonToggleModule,
    MdChipsModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent,
    AreaListComponent,
    IdentityInputComponent,
    MdTabsModule,
    CalendarModule
  ],
  declarations: [
    ConfirmDialogComponent,
     ImageListSelectComponent,
     AgeInputComponent,
     ChipsListComponent,
      IdentityInputComponent,
      AreaListComponent]
  ,
  entryComponents:[
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
