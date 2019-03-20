import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleNoteComponent } from 'app/components/single-note/single-note.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SingleNoteComponent
    ],
    exports: [
        SingleNoteComponent
    ],
    imports: [
        CommonModule,
        ColorPickerModule,
        FormsModule
    ]
})
export class SingleNoteModule {
}
