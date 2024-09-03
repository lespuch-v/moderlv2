import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
    type: 'info' | 'success' | 'error' | 'warning';
    text: string;
}

@Injectable({
    providedIn: 'root',
})
export class ToasterService {
    private static toastMessagesSubject = new BehaviorSubject<ToastMessage[]>([]);
    static toastMessages$ = ToasterService.toastMessagesSubject.asObservable();

    constructor() { }

    static showToast(type: 'info' | 'success' | 'error' | 'warning', text: string) {
        const currentMessages = ToasterService.toastMessagesSubject.value;
        const updatedMessages = [...currentMessages, { type, text }];
        ToasterService.toastMessagesSubject.next(updatedMessages);

        setTimeout(() => {
            ToasterService.removeToast();
        }, 3000);
    }

    private static removeToast() {
        const currentMessages = ToasterService.toastMessagesSubject.value;
        currentMessages.shift();
        ToasterService.toastMessagesSubject.next(currentMessages);
    }
}
