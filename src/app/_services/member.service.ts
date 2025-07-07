import { HttpClient} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
private http= inject(HttpClient);
baseUrl = environment.apiUrl;
getMembers() {
  return this.http.get<Member[]>(this.baseUrl + 'users');
}
getMemberByUsename(username: string) {
  return this.http.get<Member>(this.baseUrl + 'users/' + username);
}
getMemberById(id: number) {
  return this.http.get<Member>(this.baseUrl + 'users/' + id);
}


}
