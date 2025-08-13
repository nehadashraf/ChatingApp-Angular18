import { AccountService } from './../../_services/account.service';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, PhotoEditorComponent],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member?: Member;

  private accountService = inject(AccountService);
  private memberService = inject(MemberService);
  private toastr = inject(ToastrService);
  selectedPhoto: string = '';
  showOverlay: boolean = false;
  activeTab: string = 'basic-info';

  ngOnInit(): void {
    this.getMember();
  }
  calculateAge(dob: string | Date): number {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }
  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getMember() {
    const user = this.accountService.currentUser();
    if (!user || !user.username) return;
    this.memberService.getMemberByUsename(user.username).subscribe({
      next: (member) => {
        console.log(member);
        this.member = member;
      },
    });
  }

  onDateOfBirthChange(newDate: Date) {
    const age = this.calculateAge(newDate);
    if (age < 18 || age > 100) {
      this.toastr.error('Date of birth must make age between 18 and 100.');
      this.editForm?.controls['dateofbirth'].setErrors({
        invalidDate: true,
      });
      console.log(this.editForm?.invalid);
      if (this.member?.dateOfBirth) {
        this.member.dateOfBirth = this.member.dateOfBirth;
      }
      return;
    }
    this.member!.dateOfBirth = newDate;
    this.member!.age = age;
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.form.markAsPristine();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Failed to update profile');
      },
    });
  }
  onMemberChange(event: Member) {
    this.member = event;
  }
    setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}
