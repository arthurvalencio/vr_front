import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ViewProdutosComponent } from './view-produtos/view-produtos.component';
import { EditProdutosComponent } from './edit-produtos/edit-produtos.component';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      AppComponent,
      ViewProdutosComponent,
      EditProdutosComponent,
      ModalModule.forRoot(),
      HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
export class AppModule { }