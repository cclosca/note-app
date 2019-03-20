import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { NoteRoutingModule } from 'app/note/note-routing.module';
import { SingleNoteModule } from 'app/components/single-note/single-note.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [
        NoteComponent
    ],
    imports: [
        CommonModule,
        NoteRoutingModule,
        SingleNoteModule,
        MatButtonModule
    ]
})
export class NoteModule {
}
