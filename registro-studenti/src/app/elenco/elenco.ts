
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentiService } from '../services/studenti-service';

@Component({
  selector: 'app-elenco',
  imports: [FormsModule, RouterLink],
  templateUrl: './elenco.html',
  styleUrl: './elenco.css'
})
export class Elenco {
  private readonly studentiService = inject(StudentiService);

  readonly studenti = this.studentiService.studenti;
  readonly filtroClasse = signal('');

  readonly filtrati = computed(() => {
    const filtro = this.filtroClasse().trim().toUpperCase();
    const tutti = this.studenti();

    if (filtro === '') {
      return tutti;
    }

    return tutti.filter(
      s => s.classe.toUpperCase() === filtro
    );
  });

  readonly mediaClasse = computed(() => {
    const lista = this.filtrati();

    if (lista.length === 0) {
      return undefined;
    }

    const somma = lista.reduce(
      (totale, s) => totale + s.mediaVoti,
      0
    );

    return somma / lista.length;
  });

  rimuovi(id: number): void {
    this.studentiService.rimuovi(id);
  }
}
