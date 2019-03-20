import { Component, OnDestroy, OnInit } from '@angular/core';
import { INote, ISocketNotes } from 'app/interfaces/note.interface';
import { SocketService } from 'app/services/socket.service';
import { SocketEvent } from 'app/services/socket-event';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {

    notes: INote[] = [];

    private onSocketNotesStub: Subscription;
    private onSocketNoteUpdatedStub: Subscription;
    private onSocketNoteDeletedStub: Subscription;
    private onSocketNoteCreatedStub: Subscription;

    constructor(private socketService: SocketService) {
    }

    ngOnInit() {
        this.socketService.emit(SocketEvent.REQUEST_NOTES, {});

        this.onSocketNotesStub = this.socketService.on(SocketEvent.NOTES).subscribe((data: ISocketNotes) => {
            this.notes = data.notes.reverse();
        });

        this.onSocketNoteUpdatedStub = this.socketService.on(SocketEvent.NOTE_UPDATED).subscribe((eventNote: INote) => {
            const index = this.notes.findIndex(note => note.id === eventNote.id);
            if (index !== -1) {
                this.notes[index].bgColor = eventNote.bgColor;
                this.notes[index].note = eventNote.note;
            }
        });
        this.onSocketNoteDeletedStub = this.socketService.on(SocketEvent.NOTE_DELETED).subscribe((eventNote: INote) => {
            const index = this.notes.findIndex(note => note.id === eventNote.id);
            if (index !== -1) {
                this.notes.splice(index, 1);
            }
        });
        this.onSocketNoteCreatedStub = this.socketService.on(SocketEvent.NOTE_CREATED).subscribe((eventNote: INote) => {
            this.notes.unshift(eventNote);
        });
    }

    ngOnDestroy(): void {
        if (this.onSocketNotesStub) {
            this.onSocketNotesStub.unsubscribe();
        }
        if (this.onSocketNoteUpdatedStub) {
            this.onSocketNoteUpdatedStub.unsubscribe();
        }
        if (this.onSocketNoteDeletedStub) {
            this.onSocketNoteDeletedStub.unsubscribe();
        }
        if (this.onSocketNoteCreatedStub) {
            this.onSocketNoteCreatedStub.unsubscribe();
        }
    }

    createNote(): void {
        this.socketService.emit(SocketEvent.CREATE_NOTE, {});
    }

}
