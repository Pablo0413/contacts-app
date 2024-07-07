import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contact = this.contactService.getContactById(+id);
    }
  }

  deleteContact(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contactService.deleteContact(+id);
      this.router.navigate(['/']);
    }
  }
}
