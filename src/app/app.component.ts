import { Component, OnInit } from '@angular/core';
import { PersonService } from './Core/services/person/person.service';
import { IPerson } from './Shared/interfaces/person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  persons: IPerson[] = [];

  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
    this.personService.getPersons().subscribe(persons => {
      this.persons = persons;
    });

  }
  expand(event: Event): void {
    console.log(event);

  }
}
