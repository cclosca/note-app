import { Component, Input, OnInit } from '@angular/core';
import { INote } from 'app/interfaces/note.interface';
import { SocketService } from 'app/services/socket.service';
import { SocketEvent } from 'app/services/socket-event';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-single-note',
    templateUrl: './single-note.component.html',
    styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {

    @Input() note: INote;
    detectKeyboard$ = new Subject<string>();

    constructor(private socketService: SocketService) {
    }

    ngOnInit() {
        this.onAfterKeyboardType(this.detectKeyboard$).subscribe();
    }

    onColorChange() {
        this.socketService.emit(SocketEvent.UPDATE_NOTE, this.note);
    }

    deleteNote() {
        const action = confirm('Confirm note deletion!');
        if (action) {
            this.socketService.emit(SocketEvent.DELETE_NOTE, this.note);
        }
    }

    onAfterKeyboardType(terms: Observable<string>) {
        return terms
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(() => {
                    this.socketService.emit(SocketEvent.UPDATE_NOTE, this.note);
                    return of({});
                })
            );
    }
}
