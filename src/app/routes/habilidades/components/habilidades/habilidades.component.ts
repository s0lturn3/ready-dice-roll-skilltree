import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ClasseDto } from '../../../../shared/models/db/classe.dto';
import { HabilidadeDto } from '../../../../shared/models/db/habilidade.dto';
import { RacaDto } from '../../../../shared/models/db/raca.dto';
import { TipoHabilidadeDto } from '../../../../shared/models/db/tipo-habilidade.dto';
import { CadastroModalComponent } from "../cadastro-modal/cadastro-modal.component";

interface Product {
  id: string
  code: string
  name: string
  description: string
  image: string
  price: number
  category: string
  quantity: number
  inventoryStatus: string
  rating: number
}

@Component({
  selector: 'habilidades',
  imports: [
    CommonModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    RouterLink,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    TableModule,
    CadastroModalComponent
],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.css'
})
export class HabilidadesComponent implements OnInit {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  public loading: boolean = false;
  public visible: boolean = false;

  public habilidades$?: HabilidadeDto[];
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM CONFIG <==========
  public pesquisa: string = "";

  public tiposHabilidades$?: TipoHabilidadeDto[] = [
    { Id: 1, Nivel: 1, Tipo: 'Passiva', Descricao: 'Habilidade passiva' },
    { Id: 2, Nivel: 1, Tipo: 'Ativa', Descricao: 'Habilidade ativa' },
    { Id: 3, Nivel: 1, Tipo: 'Melhoria', Descricao: 'Melhoria' },
    { Id: 4, Nivel: 1, Tipo: 'Evolução', Descricao: 'Evolução' },
  ];

  public classes$?: ClasseDto[] = [
    { Id: 1, Nome: 'Guerreiro' },
    { Id: 2, Nome: 'Feiticeiro' },
    { Id: 3, Nome: 'Paladino' },
    { Id: 4, Nome: 'Mago' },
    { Id: 5, Nome: 'Bárbaro' },
  ];

  public racas$?: RacaDto[] = [
    { Id: 1, Nome: 'Elfo' },
    { Id: 2, Nome: 'Humano' },
    { Id: 3, Nome: 'Morfo' },
    { Id: 4, Nome: 'Orc' },
    { Id: 5, Nome: 'Drow' },
  ];

  public selectedTipo: any;
  public selectedRaca: any;
  public selectedClasse: any;
  // #endregion MOCKS

  // #endregion ==========> FORM CONFIG <==========


  constructor() { }

  ngOnInit(): void {
    this.getHabilidades();
  }


  // #region ==========> API METHODS <==========

  // #region GET
  public getHabilidades(): void {
    this.habilidades$ = [
      {
        Id: 1,
        CampanhaId: 1,
        Nome: 'Golpe Poderoso',
        DescricaoCurta: 'Um ataque físico aprimorado pela força bruta.',
        DescricaoCompleta: 'Concentra toda a força em um único golpe devastador, aumentando o dano físico em 25% por um ataque.',
        Tipo: 1, // 1 = Física
        Icone: 'sword-slash',
        Nivel: 1,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 100,
        posY: 400,
      },
      {
        Id: 2,
        CampanhaId: 1,
        Nome: 'Fúria de Batalha',
        DescricaoCurta: 'Aumenta o ataque durante o combate.',
        DescricaoCompleta: 'Entra em estado de fúria, aumentando temporariamente o poder de ataque, mas reduzindo a defesa.',
        Tipo: 1,
        Icone: 'flame',
        Nivel: 2,
        HabilidadeDependenciaId: 1,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 250,
        posY: 320,
      },
      {
        Id: 3,
        CampanhaId: 1,
        Nome: 'Defesa Instintiva',
        DescricaoCurta: 'Aumenta a chance de bloqueio de ataques.',
        DescricaoCompleta: 'Reflexos aprimorados permitem reagir rapidamente a ataques inimigos, concedendo +10% de chance de bloqueio.',
        Tipo: 1,
        Icone: 'shield',
        Nivel: 1,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 100,
        posY: 500,
      },
      {
        Id: 4,
        CampanhaId: 1,
        Nome: 'Resiliência do Guerreiro',
        DescricaoCurta: 'Reduz o dano recebido por ataques físicos.',
        DescricaoCompleta: 'Treinamento intenso permite resistir melhor a golpes, reduzindo o dano físico recebido em 15%.',
        Tipo: 1,
        Icone: 'armor',
        Nivel: 2,
        HabilidadeDependenciaId: 3,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 250,
        posY: 580,
      },
      {
        Id: 5,
        CampanhaId: 1,
        Nome: 'Foco Arcano',
        DescricaoCurta: 'Canaliza energia mágica com mais eficiência.',
        DescricaoCompleta: 'Aumenta a regeneração de mana e reduz o custo de feitiços em 10%.',
        Tipo: 2, // 2 = Mágica
        Icone: 'magic-wand',
        Nivel: 1,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 600,
        posY: 400,
      },
      {
        Id: 6,
        CampanhaId: 1,
        Nome: 'Explosão Arcana',
        DescricaoCurta: 'Libera uma onda de energia mágica destrutiva.',
        DescricaoCompleta: 'Dano mágico em área que afeta todos os inimigos próximos. Escala com o poder mágico do usuário.',
        Tipo: 2,
        Icone: 'burst',
        Nivel: 2,
        HabilidadeDependenciaId: 5,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 750,
        posY: 320,
      },
      {
        Id: 7,
        CampanhaId: 1,
        Nome: 'Domínio Elemental',
        DescricaoCurta: 'Controla elementos básicos com maestria.',
        DescricaoCompleta: 'Permite alternar entre dano de fogo, gelo ou relâmpago, adaptando-se à fraqueza do inimigo.',
        Tipo: 2,
        Icone: 'elemental',
        Nivel: 3,
        HabilidadeDependenciaId: 6,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 900,
        posY: 250,
      },
      {
        Id: 8,
        CampanhaId: 1,
        Nome: 'Furtividade',
        DescricaoCurta: 'Permite mover-se silenciosamente.',
        DescricaoCompleta: 'Reduz a chance de ser detectado por inimigos enquanto em movimento. Dura até que o personagem ataque.',
        Tipo: 3, // 3 = Habilidade de Utilidade
        Icone: 'cloak',
        Nivel: 1,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 100,
        posY: 200,
      },
      {
        Id: 9,
        CampanhaId: 1,
        Nome: 'Ataque pelas Sombras',
        DescricaoCurta: 'Ataca o inimigo desprevenido pelas costas.',
        DescricaoCompleta: 'Causa o dobro de dano se o alvo estiver desprevenido. Requer estar em Furtividade.',
        Tipo: 3,
        Icone: 'dagger',
        Nivel: 2,
        HabilidadeDependenciaId: 8,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 250,
        posY: 130,
      },
      {
        Id: 10,
        CampanhaId: 1,
        Nome: 'Assassinato Silencioso',
        DescricaoCurta: 'Finaliza o inimigo de forma letal e discreta.',
        DescricaoCompleta: 'Um golpe preciso que causa dano crítico massivo em inimigos com menos de 30% de vida. Requer Ataque pelas Sombras.',
        Tipo: 3,
        Icone: 'skull',
        Nivel: 3,
        HabilidadeDependenciaId: 9,
        DataCriacao: '2025-10-09T00:00:00Z',
        posX: 400,
        posY: 80,
      }
    ];

    this.habilidades$ = this.habilidades$.sort((a, b) => a.Nome.localeCompare(b.Nome));
  }
  // #endregion GET

  // #region POST
  // [...]
  // #endregion POST

  // #region PUT
  // [...]
  // #endregion PUT

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  public load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

  showDialog() {
    this.visible = true;
  }

  public addToList(record: HabilidadeDto | null): void {
    if (record) this.habilidades$?.push(record);
    this.habilidades$ = this.habilidades$?.sort((a, b) => a.Nome.localeCompare(b.Nome));
  }
  // #endregion ==========> UTILS <==========

}
