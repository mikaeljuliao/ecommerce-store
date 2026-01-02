import { createContext } from 'react'
import type { Product } from '../types/Product'

export interface ItemCarrinho {
  produto: Product
  quantidade: number
}

export interface CarrinhoContextoDados {
  itens: ItemCarrinho[]
  adicionarProduto: (produto: Product) => void
  removerProduto: (id: number) => void
}

export const CarrinhoContexto =
  createContext<CarrinhoContextoDados | null>(null)
