import { Component, OnInit } from '@angular/core';
import { PersonService } from './Core/services/person/person.service';
import { IPerson } from './Shared/interfaces/person.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { CreatePersonComponent } from './create-person/create-person.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  persons: Array<IPerson> = [];
  showDelete = false;
  firstLevel = false;
  searchForm!: FormGroup;
  initialPersons: Array<IPerson> = [];

  constructor(private personService: PersonService,
              private dialogRef: DialogService) {

  }

  ngOnInit(): void {
    this.fetchPersons();
    this.searchForm = new FormGroup<any>({
      searchTerm: new FormControl('')
    });
    this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      if(!this.searchForm.get('searchTerm')?.value
      || this.searchForm.get('searchTerm')?.value === '') {
        this.fetchPersons();
        return;
      }
      this.persons = this.persons.filter(person => person.name.toLowerCase().includes(this.searchForm.get('searchTerm')?.value.toLowerCase())
      );
    });
  }

  expand(event: Event): void {
    //find the person in the array
    const element = event.target as HTMLElement;
    const person = this.persons.find(person => person.name === element.parentElement.innerText);
    if (!person) {
      return;
    }

    if (person.children?.every(element => {
      return this.persons.includes(element);
    })) {
      person.children?.forEach(child => {
        const index = this.persons.indexOf(child);
        this.persons.splice(index, 1);
      });
      person.expanded = !person.expanded;
      return;
    }

    person.children?.forEach((child: IPerson) => {
      const index = this.persons.indexOf(person);
      this.persons.splice(index + 1, 0, child);
      setTimeout(() => {
        element.parentElement.parentElement.nextElementSibling.querySelectorAll('td').forEach((element: HTMLElement) => {
          element.style.marginLeft = '50px';
        });
      }, 0);
    });

    person.expanded = !person.expanded;
  }

  processDeleteButton(person: IPerson): void {
    if (!person.isChild && !this.firstLevel) {
      this.firstLevel = !this.firstLevel;
    }
  }

  updateRecord(person: IPerson): void {
    this.dialogRef.open(CreatePersonComponent, {
      width: '450px',
      height: '600px',
      data: {
        title: 'Update Person',
        person
      }
    });
  }

  deleteRecord(person: IPerson): void {
    this.personService.deletePerson(person);
    this.fetchPersons();
  }

  deleteMultiple(): void {

  }

  createPerson(): void {
    const dialogRef = this.dialogRef.open(CreatePersonComponent, {
      width: '450px',
      height: '600px',
      data: {
        title: 'Create Person'
      }
    });
  }

  private fetchPersons(): void {
    this.personService.getPersons().subscribe(persons => {
      this.persons = persons;
      this.initialPersons = persons.map(person => {
        person = {
          ...person,
          children: { ...person.children }
        };
        return person;
      });
    });
  }
}
