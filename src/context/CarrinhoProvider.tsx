import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../types/Product'
import type { ItemCarrinho } from '../types/ItemCarrinho'

import { CarrinhoContexto } from './CarrinhoContexto'

interface CarrinhoProviderProps {
  children: ReactNode
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  function adicionarProduto(produto: Product) {
    setItens((estadoAtual) => {
      const produtoExistente = estadoAtual.find(
        (item) => item.produto.id === produto.id
      )

      if (produtoExistente) {
        return estadoAtual.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }

      return [...estadoAtual, { produto, quantidade: 1 }]
    })
  }

  function removerProduto(id: number) {
    setItens((estadoAtual) =>
      estadoAtual.filter((item) => item.produto.id !== id)
    )
  }

  return (
    <CarrinhoContexto.Provider
      value={{
        itens,
        adicionarProduto,
        removerProduto,
      }}
    >
      {children}
    </CarrinhoContexto.Provider>
  )
}
