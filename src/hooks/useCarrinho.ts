import { useContext } from 'react'
import { CarrinhoContexto } from '../context/CarrinhoContexto'

export function useCarrinho() {
  const contexto = useContext(CarrinhoContexto)

  if (!contexto) {
    throw new Error(
      'useCarrinho deve ser usado dentro de CarrinhoProvider'
    )
  }

  return contexto
}
