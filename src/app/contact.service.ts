import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private storageKey = 'contacts';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      const initialContacts = [
        { id: 1, firstName: 'Oleh', lastName: 'Kotsik', phone: '123-456-7890', email: 'oleh.kotsik@gmail.com', address: '123 Main St', dob: '1990-01-01' },
        { id: 2, firstName: 'Mykola', lastName: 'Malyar', phone: '987-654-3210', email: 'mykola.malyar@gmail.com', address: '456 Elm St', dob: '1992-02-02' }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(initialContacts));
    }
  }

  getContacts(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getContactById(id: number): any {
    return this.getContacts().find((contact: any) => contact.id === id);
  }

  addContact(contact: any): void {
    const contacts = this.getContacts();
    contact.id = this.generateId();
    contacts.push(contact);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  updateContact(id: number, updatedContact: any): void {
    const contacts = this.getContacts();
    const index = contacts.findIndex((contact: any) => contact.id === id);
    contacts[index] = { ...contacts[index], ...updatedContact };
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  deleteContact(id: number): void {
    let contacts = this.getContacts();
    contacts = contacts.filter((contact: any) => contact.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  searchContacts(term: string): any[] {
    return this.getContacts().filter((contact: any) =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(term.toLowerCase())
    );
  }

  private generateId(): number {
    const contacts = this.getContacts();
    return contacts.length ? Math.max(...contacts.map((contact: any) => contact.id)) + 1 : 1;
  }
}
