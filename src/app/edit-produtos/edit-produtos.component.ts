import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

interface LojasArr {
  idLoja?: number;
  precoVenda?: string;
  descricao?: string;
}

interface Produto {
  id?: number;
  descricao?: string;
  custo?: number;
  imagem?: Buffer;
  lojas: LojasArr[]
}

interface ProdutoLojaDto {
  id?: number;
  precoVenda?: string;
  loja: {
    id?: number;
    descricao?: string;
  }
}

interface Loja {
  id: number;
  descricao: string;
}

@Component({
  selector: 'app-edit-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-produtos.component.html',
  styleUrl: './edit-produtos.component.css'
})
export class EditProdutosComponent {
  produto: Produto = {
    lojas: []
  };
  produtoLoja: ProdutoLojaDto[] = [];
  imageUrl: string | undefined;
  id: string | null = null;
  lojas: Loja[] = [];
  modalLojaId: number | undefined;
  modalPreco: string | undefined;
  @ViewChild('edit') edit!: TemplateRef<any>;

  constructor(private modalService: BsModalService, public modalRef: BsModalRef, private route: ActivatedRoute, private produtoService: ProdutoService, private router: Router) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      forkJoin({
        produto: this.produtoService.getProdutoPorId(this.id),
        produtoLoja: this.produtoService.getProdutoLojaPorId(this.id)
      }).subscribe(({ produto, produtoLoja }) => {
        this.produto = produto;
        this.produto.lojas = produtoLoja.map(elem => ({
          idLoja: elem.loja.id,
          precoVenda: elem.precoVenda,
          descricao: elem.loja.descricao
        }));
        console.log(this.produto);
      });
    }

    this.produtoService.getLojas().subscribe(lojas => this.lojas = lojas);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public openModalEdit(template: TemplateRef<any>, id?: number, precoVenda?: string) {
    this.modalRef = this.modalService.show(template);
    this.modalLojaId = id;
    this.modalPreco = precoVenda;
  }

  public openModalEditNovo(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalLojaId = undefined;
    this.modalPreco = undefined;
  }

  openModalRemoverItem(template: TemplateRef<any>, id?: number) {
    this.modalRef = this.modalService.show(template);
    this.modalLojaId = id;
  }

  public salvarPrecoVenda() {

    if (!this.modalLojaId) {
      alert('Favor selecionar uma loja!');
      return;
    }

    if (!this.modalPreco) {
      alert('Favor preencher o valor do produto!');
      return;
    }

    if (this.produto.lojas.some(elem => elem.idLoja == this.modalLojaId)) {
      alert('Este produto já está cadastrado nessa loja!');
      return;
    }

    this.produto.lojas.push({
      idLoja: this.modalLojaId,
      precoVenda: this.modalPreco,
      descricao: this.lojas.find(elem => elem.id == this.modalLojaId)?.descricao
    })

    this.modalRef.hide();
  }

  public previewImage(event: any) {
    const input = event.target;
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            this.imageUrl = reader.result as string;
        };

        reader.readAsDataURL(file);
    }
  }

  public async removeProduct() {
    if (this.id) {
      this.produtoService.deletarProduto(parseInt(this.id)).subscribe();
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  }

  public removeItemProdutoLoja() {
    this.produto.lojas = this.produto.lojas.filter(elem => elem.idLoja != this.modalLojaId);
    this.modalRef.hide();
  }

  salvarProduto() {
    if (this.produto.lojas.length < 1) {
      this.openModalEditNovo(this.edit);
      return;
    }

    this.produtoService.salvarProduto(this.produto).subscribe(response => window.location.href = '/produto/cadastro/' + response.id)
  }
}
