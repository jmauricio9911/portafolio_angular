import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }


  private cargarProductos() { 

    return new Promise( (resolve, reject ) =>{
      this.http.get('https://angular-html5-a87cc.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    })
  }

  getProducto(id: string){

    return this.http.get(`https://angular-html5-a87cc.firebaseio.com/productos/${ id }.json`)

  }

  buscarProducto(termino: string){

    if( this.productos.length === 0 ){
      // Cargando productos
      this.cargarProductos().then( () => {
        //Despuer de cargar los productos
        //Aplicar filtro
        this.filtrarProductos( termino );

      })
    }else {
      //Aplicar Filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos( termino: string){
     this.productosFiltrado = [];
     termino = termino.toLocaleLowerCase();
     this.productos.forEach( prod => {
       const titulo = prod.titulo.toLocaleLowerCase();
        if(prod.categoria.indexOf( termino ) >= 0 || titulo.indexOf( termino ) >= 0 ){
          this.productosFiltrado.push( prod );
        }
     })
  }

}
