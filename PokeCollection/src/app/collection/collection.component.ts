import { Component, OnInit } from '@angular/core';
import Const from 'src/utils/const';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  pokeGen1: any[] = [];
  pokeGen2: any[] = [];
  pokeGen3: any[] = [];

  GENE1 = Const.GENE1;
  GENE2 = Const.GENE2;
  GENE3 = Const.GENE3;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPokemon()
    .subscribe((response: any) => {
      response.results.forEach ((result: { name: string; }) => {
        this.dataService.getMoreData(result.name)
        .subscribe((uniqResponse: any) => {
          if (uniqResponse.id < this.GENE1) {
            this.pokeGen1.push(uniqResponse);
          }
          else if (uniqResponse.id < this.GENE2){
            this.pokeGen2.push(uniqResponse);
          }
          else {
            this.pokeGen3.push(uniqResponse);
          }
        });
      });
    });
  }

  retrievePokeOnClick(id: string): void {
    alert("The id is " + id);
  }
}
