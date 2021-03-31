import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  date = new Date().toLocaleDateString();
  dbRef: string | undefined;
  constructor(private db: AngularFireDatabase) {}

  addDate(userID: string): void {
    this.db.database
      .ref(`users/${userID}/`)
      .set(new Date().toLocaleDateString());
  }

  getDate(userID: string): Observable<any> {
    if (userID != null && userID.length > 0) {
      return this.db.object(`users/${userID}/`).valueChanges();
    }
    return EMPTY;
  }
}
