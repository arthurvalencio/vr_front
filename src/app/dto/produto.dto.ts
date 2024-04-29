export interface ProdutoDto {
    id: number;
    descricao: string;
    custo: number;
    imagem: Buffer;
    lojas: {
        idLoja?: number;
        precoVenda?: string;
    }[]
}  