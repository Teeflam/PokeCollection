import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { EMPTY, Observable } from 'rxjs';

export interface Pokemon {
  pokemonID: number;
}

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  pokemonList = [] as number[];
  constructor(private db: AngularFireDatabase) {}

  // retrieve data
  getPokemon(userID: string): Observable<any> {
    if (userID != null && userID.length > 0) {
      return this.db.list(`collection/${userID}/`).valueChanges();
    }
    return EMPTY;
  }

  sendToSpecific(id: string, pokemonID: number) {
    if (id != null) {
      this.db.list(`collection/${id}`).push(pokemonID);
    }
    return EMPTY;
  }
}
