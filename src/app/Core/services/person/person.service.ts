import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IPerson } from '../../../Shared/interfaces/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private firestore: AngularFirestore) {
  }

  getPersons(): Observable<IPerson[]> {
    return this.firestore.collection<IPerson>('persons').valueChanges();
  }

  writePerson(person: IPerson): any {
    this.firestore.collection<IPerson>('persons').add(person).then();
  }

}
