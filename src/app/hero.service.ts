import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      catchError(_ => {
        this.messageService.add('Error al obtener los heroes');
        return of([]);
      }) // of([{ id: 1, name: 'Javier Lete' }, { id: 2, name: 'Pepe Pérez' }]))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}${id}`).pipe(
      catchError(_ => {
        this.messageService.add('Error al obtener el heroe id ' + id);
        return of();
      })
    );
  }
}
