import type { Product } from './Product'

export interface Categoria {
  slug: string
  nome: string
  produtos: Product[]
}