import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmationService } from 'primeng/primeng';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnDestroy, OnInit {

  product: Product;
  private _productSubscription: Subscription;

  productoFavorito: boolean;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._route.data.forEach((data: { product: Product }) => this.product = data.product);
    window.scrollTo(0, 0);
    
    const favorito = localStorage.getItem(this.product.id.toString());
    //Intentamos recuperar el localStorage
    if(favorito==null){
      this.productoFavorito = true;
      //alert(this.productoFavorito);
    }
    else{
      this.productoFavorito = false;
      //alert(this.productoFavorito);
    }
  }

  ngOnDestroy(): void {
    if (this._productSubscription !== undefined) {
      this._productSubscription.unsubscribe();
    }
  }

  private _buyProduct(): void {
    this._productSubscription = this._productService
      .buyProduct(this.product.id)
      .subscribe(() => this._showPurchaseConfirmation())
  }

  private _showPurchaseConfirmation(): void {
    this._confirmationService.confirm({
      rejectVisible: false,
      message: 'Producto comprado. ¡Enhorabuena!',
      accept: () => this._router.navigate(['/product'])
    });
  }

  showPurchaseWarning(): void {
    this._confirmationService.confirm({
      message: `Vas a comprar ${this.product.name}. ¿Estás seguro?`,
      accept: () => this._buyProduct()
    });
  }

  goBack(): void {
    window.history.back();
  }

  marcarFavorito(favorito: boolean){
    if (typeof(Storage) !== "undefined") {
      const favorito = localStorage.getItem(this.product.id.toString());
      //alert(favorito);
      if (favorito == null) {
        //alert(favorito + ' es distinto de: ' +this.product.id.toString())
        this.productoFavorito = false;
        localStorage.setItem(this.product.id.toString(), this.product.id.toString());
      } else {
        //alert(favorito+ ' es igual que: ' +this.product.id.toString())
        this.productoFavorito = true;
        localStorage.removeItem(this.product.id.toString());
      }
    } else {
        //No se permite el webStorage
        console.log("El navegador no soporta Web Storage");
    }

  }

}
