export class SocketEvent {

    static REQUEST_NOTES = SocketEvent.newEvent('request-notes');
    static NOTES = SocketEvent.newEvent('notes');
    static UPDATE_NOTE = SocketEvent.newEvent('update-note');
    static NOTE_UPDATED = SocketEvent.newEvent('note-updated');
    static DELETE_NOTE = SocketEvent.newEvent('delete-note');
    static NOTE_DELETED = SocketEvent.newEvent('note-deleted');
    static CREATE_NOTE = SocketEvent.newEvent('create-note');
    static NOTE_CREATED = SocketEvent.newEvent('note-created');
    private _value: string;

    constructor() {
    }

    static newEvent(value: string) {
        const obj: SocketEvent = new SocketEvent();
        obj.value = value;
        return obj;
    }

    toString = () => this._value;

    set value(value: string) {
        this._value = value;
    }

}
