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
  data = [
    {
      name: 'Susan Boyle',
      type: 'person',
      email: 'someone@gmail.com',
      phoneNo: '+1 628 291 2098',
      companyName: 'Alphabet',
      address: '169 11th Street, 94103 San Francisco'
    },
    {
      name: 'Marc Johnson',
      type: 'person',
      email: 'someone@gmail.com',
      phoneNo: '+1 628 291 2098',
      companyName: 'Alphabet',
      address: ' 169 11th Street, 94103 San Francisco ads ad ss'
    },
    {
      name: 'PiedPiper',
      type: 'person',
      email: 'someone@gmail.com',
      phoneNo: '+1 628 291 2098',
      companyName: 'Alphabet',
      address: ' 169 11th Street, 94103 San Francisco ads ad ss',
      children: [
        {
          name: 'Children 1',
          type: 'company',
          email: '1 - someone@gmail.com',
          phoneNo: '1 - +1 628 291 2098',
          companyName: '1 -',
          address: '1 - 169 11th Street, 94103 San Francisco',
          children: [
            {
              name: 'Children 21',
              type: 'company',
              email: '21 - someone@gmail.com',
              phoneNo: '21 - +1 628 291 2098',
              companyName: '21 -',
              address: '21 - 169 11th Street, 94103 San Francisco'
            },
            {
              name: 'Children 31',
              type: 'company',
              email: '31 - someone@gmail.com',
              phoneNo: '31 - +1 628 291 2098',
              companyName: '31 -',
              address: '31 - 169 11th Street, 94103 San Francisco'
            }
          ]
        },
        {
          name: 'Children 2',
          type: 'company',
          email: '2 - someone@gmail.com',
          phoneNo: '2 - +1 628 291 2098',
          companyName: '2 -',
          address: '2 - 169 11th Street, 94103 San Francisco',
          children: [
            {
              name: 'Children 21',
              type: 'company',
              email: '21 - someone@gmail.com',
              phoneNo: '21 - +1 628 291 2098',
              companyName: '21 -',
              address: '21 - 169 11th Street, 94103 San Francisco'
            },
            {
              name: 'Children 31',
              type: 'company',
              email: '31 - someone@gmail.com',
              phoneNo: '31 - +1 628 291 2098',
              companyName: '31 -',
              address: '31 - 169 11th Street, 94103 San Francisco'
            }
          ]
        },
        {
          name: 'Children 3',
          type: 'company',
          email: '3 - someone@gmail.com',
          phoneNo: '3 - +1 628 291 2098',
          companyName: '3 -',
          address: '3 - 169 11th Street, 94103 San Francisco'
        }
      ]
    },
    {
      name: 'PiedPiper',
      type: 'company',
      email: 'someone_at_very_lonng_long_long@gmail.com',
      phoneNo: '+1 628 291 2098',
      companyName: '',
      address: '169 11th Street, 94103 San Francisco'
    },
    {
      name: 'PiedPiper',
      type: 'company',
      email: 'someone@gmail.com',
      phoneNo: '+1 628 291 2098',
      companyName: '',
      address: '169 11th Street, 94103 San Francisco',
      children: [
        {
          name: 'Children 21',
          type: 'company',
          email: '21 - someone@gmail.com',
          phoneNo: '21 - +1 628 291 2098',
          companyName: '21 -',
          address: '21 - 169 11th Street, 94103 San Francisco'
        },
        {
          name: 'Children 31',
          type: 'company',
          email: '31 - someone@gmail.com',
          phoneNo: '31 - +1 628 291 2098',
          companyName: '31 -',
          address: '31 - 169 11th Street, 94103 San Francisco'
        }
      ]
    },
    {
      name: 'PiedPiper',
      type: 'person',
      email: 'someone@gmail.com',
      phoneNo: '+1 628 291 2098',
      companyName: 'Alphabet',
      address: '169 11th Street, 94103 San Francisco'
    },
    {
      name: 'Florin Galan',
      type: 'person',
      email: 'someone@gmail.com',
      phoneNo: '+1 628 291 2098',
      companyName: 'Alphabet',
      address: '169 11th Street, 94103 San Francisco'
    },
    {
      name: 'March Andreesen',
      type: 'person',
      email: 'someone@gmail.com',
      phoneNo: '+1 628 291 2098',
      companyName: 'Alphabet',
      address: '169 11th Street, 94103 San Francisco',
      children: [
        {
          name: 'Andreesen',
          type: 'company',
          email: '21 - someone@gmail.com',
          phoneNo: '21 - +1 628 291 2098',
          companyName: '21 -',
          address: '21 - 169 11th Street, 94103 San Francisco'
        },
        {
          name: 'Space X',
          type: 'company',
          email: '31 - someone@gmail.com',
          phoneNo: '31 - +1 628 291 2098',
          companyName: '31 -',
          address: '31 - 169 11th Street, 94103 San Francisco'
        }
      ]
    },
    {
      name: 'Ben Horowitz',
      type: 'person',
      email: 'someone@gmail.com',
      phoneNo: '+1 628 291 2098',
      companyName: 'Alphabet',
      address: '169 11th Street, 94103 San Francisco'
    }
  ];

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
