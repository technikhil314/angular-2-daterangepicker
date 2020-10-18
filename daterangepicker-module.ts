import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DaterangepickerComponent } from './daterangepicker-component';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar-component';
import { FormatMomentDatePipe } from './format-moment-date-pipe'
import { TimePickerComponent } from './time-picker-component';
@NgModule({
    imports: [FormsModule, CommonModule],
    exports: [DaterangepickerComponent],
    declarations: [DaterangepickerComponent, CalendarComponent, TimePickerComponent, FormatMomentDatePipe],
    bootstrap: [DaterangepickerComponent]
})
export class DaterangepickerModule {
}
