import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-emotions-content-modal',
  templateUrl: './emotions-content-modal.component.html',
  standalone: true,
  imports: [NgIf, CommonModule],
  styleUrl: './emotions-content-modal.component.css'
})
export class EmotionsContentModalComponent {
  @Input() isVisible: boolean = false;
  @Input() modalContent: any = null;
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }
}

