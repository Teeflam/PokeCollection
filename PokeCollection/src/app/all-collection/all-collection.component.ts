import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { CollectionService } from '../services/Collection/collection.service';

@Component({
  selector: 'app-all-collection',
  templateUrl: './all-collection.component.html',
  styleUrls: ['./all-collection.component.css'],
})
export class AllCollectionComponent implements OnInit {
  userID: string;
  pokeList = 'number[] = []';
  pokemonList = [] as number[];

  constructor(private db: CollectionService, private authService: AuthService) {
    this.userID = this.authService.currentUserId;
    this.getPokemonList();
  }

  ngOnInit(): void {}
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
}
