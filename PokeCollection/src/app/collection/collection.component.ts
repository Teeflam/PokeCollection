import { Component, OnInit } from '@gangular/core';
import { Observable } from 'rxjs';
import Const from 'src/utils/const';
import { AuthService } from '../services/Auth/auth.service';
import { CollectionService } from '../services/Collection/collection.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  pokeGen: any[] = [];

  condInd: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    let table: string[] = ['1', '2', '3', '234', '512', '34', '802'];
    this.pokeGen = this.dataService.sortPokemonByGene(table);
  }

  tabChange(index: number) {
    this.condInd = index;
  }
}
