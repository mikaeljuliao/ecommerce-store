import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../types/Product'

type ItemCarrinho = {
  produto: Product
  quantidade: number
}

type CartContextData = {
  itens: ItemCarrinho[]
  adicionarProduto: (produto: Product, quantidade: number) => void
  alterarQuantidade: (id: number, quantidade: number) => void
  removerProduto: (id: number) => void
  limparCarrinho: () => void
  total: number
  totalItens: number
}

const CartContext = createContext<CartContextData | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  function adicionarProduto(produto: Product, quantidade: number) {
    if (quantidade <= 0) return

    setItens((estadoAtual) => {
      const itemExistente = estadoAtual.find(
        (item) => item.produto.id === produto.id
      )

      if (itemExistente) {
        return estadoAtual.map((item) =>
          item.produto.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + quantidade
              }
            : item
        )
      }

      return [...estadoAtual, { produto, quantidade }]
    })
  }

  function alterarQuantidade(id: number, quantidade: number) {
    if (quantidade <= 0) {
      removerProduto(id)
      return
    }

    setItens((estadoAtual) =>
      estadoAtual.map((item) =>
        item.produto.id === id
          ? { ...item, quantidade }
          : item
      )
    )
  }

  function removerProduto(id: number) {
    setItens((estadoAtual) =>
      estadoAtual.filter((item) => item.produto.id !== id)
    )
  }

  function limparCarrinho() {
    setItens([])
  }

  const total = itens.reduce((soma, item) => {
    const preco =
      item.produto.preco_desconto ?? item.produto.preco

    return soma + preco * item.quantidade
  }, 0)

  const totalItens = itens.reduce(
    (soma, item) => soma + item.quantidade,
    0
  )

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarProduto,
        alterarQuantidade,
        removerProduto,
        limparCarrinho,
        total,
        totalItens
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }

  return context
}
