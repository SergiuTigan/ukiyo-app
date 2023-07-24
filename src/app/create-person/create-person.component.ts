import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../Core/services/person/person.service';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-create-person',
  templateUrl: 'create-person.component.html',
  styleUrls: ['create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {
  createForm!: FormGroup;
  data: any;

  constructor(private personService: PersonService,
              private dialog: DialogRef) {
  }

  ngOnInit(): void {
    this.data = this.dialog.data;
    let { person } = this.data;
    if (!person) {
      person = {};
    }
    this.createForm = new FormGroup({
      name: new FormControl(person.name ?? '', [Validators.required]),
      type: new FormControl(person.type ?? '', [Validators.required]),
      email: new FormControl(person.email ?? '', [Validators.required]),
      phoneNo: new FormControl(person.phoneNo ?? '', [Validators.required]),
      companyName: new FormControl(person.companyName ?? '', [Validators.required]),
      address: new FormControl(person.address ?? '', [Validators.required])
    });
  }

  savePerson(event: Event): void {
    this.data = this.dialog.data;
    let { person } = this.data;
    if (!person) {
      this.personService.writePerson(this.createForm.value);
      this.dialog.close();
      return;
    }
    this.personService.updatePerson(this.createForm.value, person.id);
    this.dialog.close();
  }
}
