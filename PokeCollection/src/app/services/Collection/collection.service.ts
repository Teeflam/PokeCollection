import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { EMPTY, Observable, of } from 'rxjs';

export interface Pokemon {
  pokemonID: number;
}

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private db: AngularFireDatabase) {}

  // retrieve data
  getPokemon(userID: string): Observable<any> {
    if (userID != null && userID.length > 0) {
      return this.db.list(`collection/${userID}/`).valueChanges();
    }
    return EMPTY;
  }
  getePokemon(): Observable<any> {
    return this.db.list('collection').valueChanges();
  }

  sendPokemon(pokemonID: number) {
    this.db.list('collection').push(pokemonID);
  }

  sendToSpecific(id: string, pokemonID: number) {
    if (id != null) {
      this.db.list(`collection/${id}`).push({ pokemonID });
    }
    return EMPTY;
  }
}
