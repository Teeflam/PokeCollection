import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../services/Collection/collection.service';
import { AuthService } from '../services/Auth/auth.service';
import { DataService } from '../services/data.service';
import { DailyService } from '../services/Daily/daily.service';

@Component({
  selector: 'app-random-pokemon',
  templateUrl: './random-pokemon.component.html',
  styleUrls: ['./random-pokemon.component.css'],
})
export class RandomPokemonComponent implements OnInit {
  userID: string;
  pokemonList = [] as number[];
  lastDate!: string;
  actualDate!: string;
  actualPoke: any;

  constructor(
    private db: CollectionService,
    private authService: AuthService,
    private dataService: DataService,
    private daily: DailyService
  ) {
    this.userID = this.authService.currentUserId;
    this.actualDate = new Date().toLocaleDateString();
    this.getPokemonList();
  }

  ngOnInit() {
    this.getLastDateOfUser();
  }

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
    this.dataService
      .getMoreData(String(number))
      .subscribe((uniqResponse: any) => {
        this.actualPoke = uniqResponse;
      });
    return number;
  }

  getLastDateOfUser() {
    this.daily
      .getDate(this.authService.currentUserId)
      .subscribe((lastDate) => (this.lastDate = lastDate));
    console.log(this.lastDate);
  }
}
