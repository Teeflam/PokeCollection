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
  pokeGen4: any[] = [];
  pokeGen5: any[] = [];
  pokeGen6: any[] = [];
  pokeGen7: any[] = [];

  GENE1 = Const.GENE1;
  GENE2 = Const.GENE2;
  GENE3 = Const.GENE3;
  GENE4 = Const.GENE4;
  GENE5 = Const.GENE5;
  GENE6 = Const.GENE6;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPokemon()
    .subscribe((response: any) => {
      response.results.forEach ((result: { name: string; }) => {
        this.dataService.getMoreData(result.name)
        .subscribe((uniqResponse: any) => {
          if (uniqResponse.id <= this.GENE1) {
            this.pokeGen1.push(uniqResponse);
          }
          else if (uniqResponse.id <= this.GENE2){
            this.pokeGen2.push(uniqResponse);
          }
          else if (uniqResponse.id <= this.GENE3){
            this.pokeGen3.push(uniqResponse);
          }
          else if (uniqResponse.id <= this.GENE4){
            this.pokeGen4.push(uniqResponse);
          }
          else if (uniqResponse.id <= this.GENE5){
            this.pokeGen5.push(uniqResponse);
          }
          else if (uniqResponse.id <= this.GENE6){
            this.pokeGen6.push(uniqResponse);
          }
          else {
            this.pokeGen7.push(uniqResponse);
          }
        });
      });
    });
  }

  retrievePokeOnClick(id: string): void {
    alert("The id is " + id);
  }
}
