import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { DescriptionComponent } from './description/description.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RandomPokemonComponent } from './random-pokemon/random-pokemon.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'collection', component: CollectionComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'description/:pokeId', component: DescriptionComponent },
  { path: 'description/:id', component: DescriptionComponent },
  { path: 'randomPokemon', component: RandomPokemonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
