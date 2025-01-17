import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeUsername, JournalEntry, TotalEntriesResponse, TotalNumberOfWordsResponse } from '../models/JournalEntry';

@Injectable({
  providedIn: 'root'
})
export class MoodServiceService {
  apiUrl: string = 'https://localhost:7081/api';

  constructor(private http: HttpClient) { }

  private httpWithAuth<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: any): Observable<T> {
    const headers = this.getAuthHeaders();

    switch (method) {
      case 'GET':
        return this.http.get<T>(url, { headers });
      case 'POST':
        return this.http.post<T>(url, body, { headers });
      case 'PUT':
        return this.http.put<T>(url, body, { headers });
      case 'DELETE':
        return this.http.delete<T>(url, { headers });
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token not found");
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getJournalEntries(): Observable<JournalEntry[]> {
    return this.httpWithAuth<JournalEntry[]>('GET', `${this.apiUrl}/JournalEntry`)
  }

  addNewJournalEntry(journalEntry: JournalEntry): Observable<JournalEntry> {
    return this.httpWithAuth<JournalEntry>('POST', `${this.apiUrl}/JournalEntry`, journalEntry)
  }

  deleteJournalEntry(journalEntryId: number): Observable<JournalEntry> {
    return this.httpWithAuth<JournalEntry>('DELETE', `${this.apiUrl}/JournalEntry/${journalEntryId}`);
  }

  updateJournalEntry(entry: JournalEntry): Observable<JournalEntry> {
    return this.httpWithAuth<JournalEntry>('PUT', `${this.apiUrl}/JournalEntry/${entry.id}`, JSON.stringify(entry));
  }

  getWordCount(): Observable<number> {
    return this.httpWithAuth<number>('GET', `${this.apiUrl}/JournalEntry/word-count`);
  }

  getJournalEntryCount(): Observable<number> {
    return this.httpWithAuth<number>('GET', `${this.apiUrl}/JournalEntry/journalEntry-count`)
  }

  getUserName(): Observable<any> {
    return this.httpWithAuth<string>('GET', `${this.apiUrl}/User/get-username`);
  }

  updateUserName(userInfo: ChangeUsername): Observable<any> {
    return this.httpWithAuth<{ updatedUserName: string }>('PUT', `${this.apiUrl}/User/change-username`, userInfo);
  }

  getTotalNumberOfEntries(): Observable<TotalEntriesResponse> {
    return this.http.get<TotalEntriesResponse>(`${this.apiUrl}/JournalEntry/total-entries`)
  }

  getTotalNumberOfWords(): Observable<TotalNumberOfWordsResponse> {
    return this.http.get<TotalNumberOfWordsResponse>(`${this.apiUrl}/JournalEntry/total-number-words`)
  }

  getTotalNumberOfUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/User/total-users`)
  }
}
