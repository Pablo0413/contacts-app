import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; // Додали AbstractControl
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contactId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      dob: ['', [Validators.required, this.dateValidator]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contactId = +id;
      const contact = this.contactService.getContactById(this.contactId);
      this.contactForm.patchValue(contact);
    }
  }

  saveContact(): void {
    if (this.contactForm.valid) {
      if (this.contactId !== null) {
        this.contactService.updateContact(this.contactId, this.contactForm.value);
      } else {
        this.contactService.addContact(this.contactForm.value);
      }
      this.router.navigate(['/']);
    }
  }

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    const date = new Date(control.value);
    const now = new Date();
    if (date > now) {
      return { 'invalidDate': 'Date of birth cannot be in the future' };
    }
    return null;
  }
}
