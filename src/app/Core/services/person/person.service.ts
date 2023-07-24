import { Injectable } from '@angular/core';
import { IPerson } from '../../../Shared/interfaces/person.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private firestore: AngularFirestore) {
  }

  getPersons(): Observable<IPerson[]> {
    return this.firestore.collection<IPerson>('persons',
        ref => ref.orderBy('name', 'asc')).
    valueChanges({ idField: 'id' }).pipe(map(persons => {
      return persons.map(person => {
        return {
          ...person,
          children: person.children ?? []
        };
      });
    }));
  }

  writePerson(person: IPerson): any {
    const docRef = this.firestore.collection('persons').doc();
    person = { ...person,
      id: docRef.ref.id };
    docRef.set(person).then();
  }

  deletePerson(person: IPerson): any {
    const docRef = this.firestore.doc(`persons/${person.id}`);
    docRef.delete().then();
  }

  updatePerson(person: IPerson, personId: string): any {
    const docRef = this.firestore.doc(`persons/${personId}`);
    docRef.update(person).then();
  }

}
