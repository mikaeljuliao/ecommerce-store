export interface Product {
  id: number
  titulo: string
  descricao: string
  preco: number
  preco_desconto: number | null
  imagens: string[]
  categoria: string
}