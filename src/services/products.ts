import produtosJson from '../data/produtos.json'
import type { BancoDeProdutos } from '../types/BancoDeProdutos'
import type { Categoria } from '../types/Categoria'
import type { Product } from '../types/Product'

const bancoDeProdutos = produtosJson as BancoDeProdutos

export function getCategorias(): Categoria[] {
  return bancoDeProdutos.categorias
}

export function getProdutosPorCategoria(slug: string): Product[] {
  const categoria = bancoDeProdutos.categorias.find(
    (cat) => cat.slug === slug
  )

  return categoria ? categoria.produtos : []
}

export function getProdutoPorId(id: number): Product | undefined {
  for (const categoria of bancoDeProdutos.categorias) {
    const produto = categoria.produtos.find(
      (produto) => produto.id === id
    )

    if (produto) return produto
  }

  return undefined
}