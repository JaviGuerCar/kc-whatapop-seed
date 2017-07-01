import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../product';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  product: Product;

  constructor() { }

  ngOnInit() {
  }

  @Input() favorito: boolean;

  @Output() clickFavorito = new EventEmitter<boolean>();

  notificarFavorito(favorito: boolean): void{
    this.clickFavorito.emit(this.favorito);   
  }

}