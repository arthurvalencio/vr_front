import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoDto } from '../dto/produto.dto';

interface ProdutoFilter {
  codigo?: string;
  descricao?: string;
  custo?: string;
  preco?: string;
}

interface ProdutoLojaDto {
  id: number;
  precoVenda: string;
  loja: {
    id: number;
    descricao: string;
  }
}

interface Loja {
  id: number;
  descricao: string;
}

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

const baseUrl = 'http://localhost:3000/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getProdutos(filters?: ProdutoFilter): Observable<ProdutoDto[]> {
    const queryParams: any = {};

    if (filters) {
      if (filters.codigo) {
        queryParams['codigo'] = filters.codigo;
      }
      if (filters.descricao && filters.descricao.length > 2) {
        queryParams['descricao'] = filters.descricao;
      }
      if (filters.custo && filters.custo.length > 2) {
        queryParams['custo'] = parseFloat(filters.custo);
      }
      if (filters.preco && filters.preco.length > 2) {
        queryParams['preco'] = parseFloat(filters.preco);
      }
    }

    return this.http.get<ProdutoDto[]>(baseUrl, { params: queryParams });
  }

  getProdutoPorId(id: string): Observable<ProdutoDto> {
    const url = baseUrl + '/' + id;
    return this.http.get<ProdutoDto>(url);
  }

  getProdutoLojaPorId(id: string): Observable<ProdutoLojaDto[]> {
    const url = 'http://localhost:3000/produtoloja/produtoid/' + id;
    return this.http.get<ProdutoLojaDto[]>(url);
  }

  getLojas(): Observable<Loja[]> {
    const url = 'http://localhost:3000/loja/';
    return this.http.get<Loja[]>(url);
  }

  deletarProduto(id: number): Observable<any> {
    const url = baseUrl + '/' + id;
    return this.http.delete(url);
  }

  salvarProduto(produto: Produto): Observable<any> {
    const url = baseUrl;
    return this.http.post(url, produto);
  }

}
