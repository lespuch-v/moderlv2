import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JournalEntry } from '../models/JournalEntry';

@Injectable({
  providedIn: 'root'
})
export class MoodServiceService {
  apiUrl: string = 'https://localhost:7081/api';

  constructor(private http: HttpClient) { }

  getJournalEntries(): Observable<JournalEntry[]> {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Set the Authorization header

    return this.http.get<JournalEntry[]>(`${this.apiUrl}/JournalEntry`, { headers });  // Include headers in the request
  }


  addNewJournalEntry(journalEntry: JournalEntry): Observable<JournalEntry> {
    return this.http.post<JournalEntry>(`${this.apiUrl}/JournalEntry`, journalEntry);
  }

  deleteJournalEntry(journalEntryId: number): Observable<JournalEntry> {
    return this.http.delete<JournalEntry>(`${this.apiUrl}/JournalEntry/${journalEntryId}`);
  }

  updateJournalEntry(entry: JournalEntry): Observable<JournalEntry> {
    return this.http.put<JournalEntry>(`${this.apiUrl}/JournalEntry/${entry.id}`, entry);
  }

  getWordCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/JournalEntry/word-count`);
  }

  getJournalEntryCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/JournalEntry/journalEntry-count`);
  }
}
