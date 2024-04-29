import { Component, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProdutoService } from '../services/produto.service';
import { ProdutoDto } from '../dto/produto.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProdutoFilter {
  codigo?: string;
  descricao?: string;
  custo?: string;
  preco?: string;
}

@Component({
  selector: 'app-view-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-produtos.component.html',
  styleUrl: './view-produtos.component.css'
})
export class ViewProdutosComponent {
  produtos: ProdutoDto[] = [];
  idProdutoSelecionado!: number;
  filter: ProdutoFilter = {};

  constructor(private modalService: BsModalService, public modalRef: BsModalRef, private produtoService: ProdutoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getProdutos();
  }

  public getProdutos() {
    this.produtoService.getProdutos(this.filter).subscribe(produtos => this.produtos = produtos);
  }

  public openModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template);
    this.idProdutoSelecionado = id;
  }

  public async removeProduct() {
    await this.produtoService.deletarProduto(this.idProdutoSelecionado).subscribe(() => {
      this.getProdutos()
    });
    this.modalRef.hide();
  }
}
