import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoodServiceService } from '../services/mood-service';
import { ChangeUsername } from '../models/JournalEntry';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toast.service';

@Component({
  selector: 'app-update-username-modal',
  templateUrl: './update-username-modal.component.html',
  styleUrl: './update-username-modal.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UpdateUsernameModalComponent {

  @ViewChild('updateUserNameModal') updateUserNameModal!: ElementRef;
  @Output() userNameUpdated = new EventEmitter<string>();

  constructor(private moodService: MoodServiceService, private authService: AuthService) { }

  isUpdateModalOpened: boolean = false;
  newUserName: string = '';
  userId: string = '';

  openUpdateNameModal() {
    this.isUpdateModalOpened = true;
  }

  closeModal() {
    this.isUpdateModalOpened = false;
  }

  onUpdateUserName() {
    const userId = this.authService.getUserId();

    if (userId) {
      const user: ChangeUsername = {
        newUserName: this.newUserName,
        userId: userId
      }
      this.moodService.updateUserName(user).subscribe(result => {
        this.updateUserName()
      })
      ToasterService.showToast('success', 'Username successfully updated!')
      this.closeModal();
    }
  }

  updateUserName() {
    if (this.newUserName.trim()) {
      this.userNameUpdated.emit(this.newUserName);
      this.closeModal();
    }
  }
}
