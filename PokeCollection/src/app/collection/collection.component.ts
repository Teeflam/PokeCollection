import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Const from 'src/utils/const';
import { AuthService } from '../services/Auth/auth.service';
import { CollectionService } from '../services/Collection/collection.service';
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

  pokeGen: any[] = [];

  GENE1 = Const.GENE1;
  GENE2 = Const.GENE2;
  GENE3 = Const.GENE3;
  GENE4 = Const.GENE4;
  GENE5 = Const.GENE5;
  GENE6 = Const.GENE6;

  condInd: number = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {

    let table : string[] = ['1', '2', '3','234', '512', '34', '802'];

    table.forEach( (pokeId) => {
      this.dataService.getMoreData(pokeId)
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

    this.pokeGen.push(this.pokeGen1);
    this.pokeGen.push(this.pokeGen2);
    this.pokeGen.push(this.pokeGen3);
    this.pokeGen.push(this.pokeGen4);
    this.pokeGen.push(this.pokeGen5);
    this.pokeGen.push(this.pokeGen6);
    this.pokeGen.push(this.pokeGen7);   

    console.log(typeof(this.pokeGen1[0]));
  }

  tabChange(index: number) {
    this.condInd = index;
  }
}
