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
  public products!: Product[];
  
  public visible: boolean = false;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM CONFIG <==========
  public pesquisa: string = "";

  public tipos$: any;
  public selectedTipo: any;

  public racas$: any;
  public selectedRaca: any;

  public classes$: any;
  public selectedClasse: any;
  // #endregion ==========> FORM CONFIG <==========


  constructor() { }

  ngOnInit(): void {
    this.getHabilidades();
  }


  // #region ==========> API METHODS <==========

  // #region GET
  public getHabilidades(): void {
    this.products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Elegant and eco-friendly bamboo wristwatch.',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Stylish black analog watch with leather strap.',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Comfortable blue fitness band with heart-rate tracking.',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Game Controller',
        description: 'Wireless game controller compatible with most consoles.',
        image: 'game-controller.jpg',
        price: 99,
        category: 'Electronics',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Leather Wallet',
        description: 'Genuine leather wallet with multiple compartments.',
        image: 'leather-wallet.jpg',
        price: 49,
        category: 'Accessories',
        quantity: 15,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
      {
        id: '1005',
        code: 'av2231fwg',
        name: 'Wireless Headphones',
        description: 'Noise-cancelling wireless headphones with deep bass.',
        image: 'wireless-headphones.jpg',
        price: 119,
        category: 'Audio',
        quantity: 5,
        inventoryStatus: 'LOWSTOCK',
        rating: 5,
      },
      {
        id: '1006',
        code: 'bib36pfvm',
        name: 'Smartphone Stand',
        description: 'Adjustable aluminum stand for phones and tablets.',
        image: 'smartphone-stand.jpg',
        price: 35,
        category: 'Office',
        quantity: 42,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
      {
        id: '1007',
        code: 'mbvjkgip5',
        name: 'Laptop Bag',
        description: 'Water-resistant 15-inch laptop bag with extra padding.',
        image: 'laptop-bag.jpg',
        price: 89,
        category: 'Office',
        quantity: 12,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1008',
        code: 'vbb124btr',
        name: 'Running Shoes',
        description: 'Lightweight running shoes for everyday training.',
        image: 'running-shoes.jpg',
        price: 95,
        category: 'Fitness',
        quantity: 9,
        inventoryStatus: 'LOWSTOCK',
        rating: 4,
      },
      {
        id: '1009',
        code: 'cm230f032',
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and USB port.',
        image: 'desk-lamp.jpg',
        price: 59,
        category: 'Office',
        quantity: 34,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      }
    ];
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
  // #endregion ==========> UTILS <==========

}
