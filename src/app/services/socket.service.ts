import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketEvent } from './socket-event';

import * as socketIO from 'socket.io-client';

declare const ENV: any;

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private static SETTINGS = {
        reconnection: true,
        reconnectionDelay: 5000
    };

    private socket;

    constructor() {
    }

    public initConnection() {

        if (this.socket) {
            return;
        }

        const payload: any = {...SocketService.SETTINGS};
        this.socket = socketIO.connect(ENV.socketURL, payload);
    }

    public on(event: SocketEvent): Observable<any> {
        if (!this.socket) {
            return;
        }
        return new Observable(observer => {
            const callback = (response) => observer.next(response);
            this.socket.on(event.toString(), callback);
            return () => this.socket.off(event.toString(), callback);
        });
    }

    public emit(event: SocketEvent, data: any): void {
        if (!this.socket) {
            return;
        }
        this.socket.emit(event.toString(), data);
    }

    public off(event: SocketEvent, callback?: () => any) {
        if (!this.socket) {
            return;
        }
        if (typeof callback === 'function') {
            this.socket.off(event.toString(), callback);
            return;
        }
        this.socket.off(event.toString());
    }

    public removeAll(): void {
        this.socket.removeAllListeners();
    }

    public close(): void {
        this.socket.close();
    }

    public refreshSocket(): void {
        this.killSocket();
        this.initConnection();
    }

    public killSocket(): void {
        if (!this.socket) {
            return;
        }
        this.removeAll();
        this.socket.disconnect();
        this.socket = null;
    }
}
