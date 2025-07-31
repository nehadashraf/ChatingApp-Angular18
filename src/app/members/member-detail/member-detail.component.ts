import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  ngOnInit(): void {
    this.getMember();
  }

  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  member?: Member;
  images: string[] = [];
  selectedPhoto: string = '';

  getMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    
    this.memberService.getMemberByUsename(username).subscribe({
      next: (member) => {
        this.member = member;
        member.photos.map(photo => {
          this.images.push(photo.url);
        });
      },
      error: (error) => {
        console.error('Error fetching member:', error);
      },
    });
    console.log(this.images);
  }

  openPhotoModal(photoUrl: string, index: number) {
    this.selectedPhoto = photoUrl;
    const modal = new bootstrap.Modal(document.getElementById('photoModal'));
    modal.show();
  }
}
