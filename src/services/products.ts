import produtosJson from '../data/produtos.json'

import type { BancoDeProdutos } from '../types/BancoDeProdutos'
import type { Categoria } from '../types/Categoria'
import type { Product } from '../types/Product'

// garante tipagem correta do JSON
const bancoDeProdutos = produtosJson as BancoDeProdutos

// 🔹 TODAS AS CATEGORIAS
export function getCategorias(): Categoria[] {
  return bancoDeProdutos.categorias
}

// 🔹 PRODUTOS POR CATEGORIA (slug)
export function getProdutosPorCategoria(slug: string): Product[] {
  const categoria = bancoDeProdutos.categorias.find(
    (categoria) => categoria.slug === slug
  )

  return categoria?.produtos ?? []
}

// 🔹 PRODUTO POR ID (busca global)
export function getProdutoPorId(id: number): Product | undefined {
  for (const categoria of bancoDeProdutos.categorias) {
    const produto = categoria.produtos.find(
      (produto) => produto.id === id
    )

    if (produto) {
      return produto
    }
  }

  return undefined
}
