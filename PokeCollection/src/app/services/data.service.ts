import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Const from 'src/utils/const';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPokemon() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=802');
  }

  getMoreData(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }

  sortPokemonByGene(table: string[]) {
    // Create local table for sort pokemon by generation
    let pokeGen1: any[] = [];
    let pokeGen2: any[] = [];
    let pokeGen3: any[] = [];
    let pokeGen4: any[] = [];
    let pokeGen5: any[] = [];
    let pokeGen6: any[] = [];
    let pokeGen7: any[] = [];

    // Retrieve the constant of generation
    let GENE1 = Const.GENE1;
    let GENE2 = Const.GENE2;
    let GENE3 = Const.GENE3;
    let GENE4 = Const.GENE4;
    let GENE5 = Const.GENE5;
    let GENE6 = Const.GENE6;

    let pokeGen: any[] = [];

    // Browse all pokeId in the table
    table.forEach((pokeId) => {
      // Retrieve data of each pokemon
      this.getMoreData(pokeId).subscribe((uniqResponse: any) => {
        // Push pokemon into generation in function of the value of the id
        if (uniqResponse.id <= GENE1) {
          pokeGen1.push(uniqResponse);
        } else if (uniqResponse.id <= GENE2) {
          pokeGen2.push(uniqResponse);
        } else if (uniqResponse.id <= GENE3) {
          pokeGen3.push(uniqResponse);
        } else if (uniqResponse.id <= GENE4) {
          pokeGen4.push(uniqResponse);
        } else if (uniqResponse.id <= GENE5) {
          pokeGen5.push(uniqResponse);
        } else if (uniqResponse.id <= GENE6) {
          pokeGen6.push(uniqResponse);
        } else {
          pokeGen7.push(uniqResponse);
        }
      });
    });

    // Push all generation into the general table of pokemon
    pokeGen.push(
      pokeGen1,
      pokeGen2,
      pokeGen3,
      pokeGen4,
      pokeGen5,
      pokeGen6,
      pokeGen7
    );
    return pokeGen;
  }
}
