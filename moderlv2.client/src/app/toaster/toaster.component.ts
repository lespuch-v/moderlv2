import { Component, OnInit } from '@angular/core';
import { ToasterService, ToastMessage } from './../services/toast.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './toaster.component.html',
})
export class ToasterComponent implements OnInit {
  toastMessages: ToastMessage[] = [];

  constructor() { }

  ngOnInit() {
    ToasterService.toastMessages$.subscribe((messages) => {
      this.toastMessages = messages;
    });
  }

  removeToast(toast: ToastMessage) {
    this.toastMessages = this.toastMessages.filter((t) => t !== toast);
  }
}
