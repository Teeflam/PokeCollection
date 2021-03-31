import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../services/Collection/collection.service';
import { AuthService } from '../services/Auth/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-random-pokemon',
  templateUrl: './random-pokemon.component.html',
  styleUrls: ['./random-pokemon.component.css'],
})
export class RandomPokemonComponent implements OnInit {
  userID: string;
  pokemonList = [] as number[];
  lastDate: number = 2;
  actualPoke: any;

  constructor(private db: CollectionService, private authService: AuthService, private dataService: DataService ) {
    this.userID = this.authService.currentUserId;
    this.getPokemonList();
  }

  ngOnInit() {}

  sendPokemon(pokemonID: number): void {
    var id = this.authService.currentUserId;
    if (id != null && id.length > 0) {
      this.db.sendToSpecific(id, pokemonID);
    } else {
      console.log('not connected');
    }
  }

  getPokemonList() {
    this.db
      .getPokemon(this.authService.currentUserId)
      .subscribe((collection) => {
        this.pokemonList = [];
        for (var i = 0; i < collection.length; i++) {
          this.pokemonList.push(collection[i]);
        }
      });
  }

  getRandomId() {
    var number = Math.floor(Math.random() * 802 + 1);
    this.dataService.getMoreData(String(number))
    .subscribe((uniqResponse: any) => {
      this.actualPoke = uniqResponse;
    });
    this.lastDate = 3;
    return number;
  }
}
