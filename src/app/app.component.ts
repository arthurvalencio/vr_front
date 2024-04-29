import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ViewProdutosComponent } from './view-produtos/view-produtos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ViewProdutosComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
