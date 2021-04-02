import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import Const from 'src/utils/const';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})

export class DescriptionComponent implements OnInit {

  GENE1 = Const.GENE1;
  GENE2 = Const.GENE2;
  GENE3 = Const.GENE3;
  GENE4 = Const.GENE4;
  GENE5 = Const.GENE5;
  GENE6 = Const.GENE6;
  
  pokemon: any;
  data : any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);


  displayedColumns : string[] = ['hp', 'attack', 'defense', 'special attack', 'special defense', 'speed'];

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let pokeStats;
    let pokeID = this.route.snapshot.params['pokeID']

    this.dataService.getMoreData(pokeID)
      .subscribe((uniqResponse: any) => {
        this.pokemon = uniqResponse;
        
        pokeStats = {
          hp : uniqResponse.stats[0].base_stat,
          attack : uniqResponse.stats[1].base_stat,
          defense : uniqResponse.stats[2].base_stat,
          specialAttack : uniqResponse.stats[3].base_stat,
          specialDefense : uniqResponse.stats[4].base_stat,
          speed : uniqResponse.stats[5].base_stat
        }
        this.data.push(pokeStats);
        this.dataSource = new MatTableDataSource<any>(this.data);
    });
  }
}
