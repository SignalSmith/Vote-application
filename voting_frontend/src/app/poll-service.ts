import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from './poll.models';

@Injectable({
  providedIn: 'root',
})
export class PollService {

  private baseUrl = 'http://localhost:8080/api/poll';

  constructor(private http: HttpClient) { }

  // Our task --> 1) create poll
  // 2) get the poll
  // 2) vote for a specific option

  createPoll(poll: Poll): Observable<Poll> {

    return this.http.post<Poll>(`${this.baseUrl}/create`, poll);
  }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(`${this.baseUrl}/get/polls`);
  }

  vote(pollId: number, pollOptions: number,): Observable<void> {
    const url = `${this.baseUrl}/vote`;
    return this.http.post<void>(url, { pollId, pollOptions });
  }

  deletePoll(pollId: number): Observable<void> {
    const url = `${this.baseUrl}/${pollId}/delete`;
    return this.http.delete<void>(url);
  }
}
