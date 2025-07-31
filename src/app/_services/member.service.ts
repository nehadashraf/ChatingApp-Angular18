import { Member } from './../_models/member';
import { HttpClient} from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { of, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
private http= inject(HttpClient);
baseUrl = environment.apiUrl;
members=signal<Member []>([]);
getMembers() {
  return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
    next: members =>  this.members.set(members)
  });
}
getMemberByUsename(username: string) {
  const member=this.members().find(x=>x.userName==username);
  if(member!==undefined) return of(member);
  return this.http.get<Member>(this.baseUrl + 'users/' + username);
}
getMemberById(id: number) {
  return this.http.get<Member>(this.baseUrl + 'users/' + id);
}
updateMember(member:Member){
  console.log(member);
  return this.http.put<Member>(this.baseUrl + 'users', member).pipe(
    tap(()=>{
      this.members.update(members => members.map(m=>m.userName===member.userName?member:m))
    })
  )
}
}
