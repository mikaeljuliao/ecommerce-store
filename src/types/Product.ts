export type Product = {
  id: number
  titulo: string
  descricao: string
  preco: number
  preco_desconto: number | null
  imagens: string[]
  categoria: string

  // 🔥 exatamente como no JSON
  em_promocao: boolean
  mais_vendido: boolean
}
