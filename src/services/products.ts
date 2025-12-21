import { Product } from '../types/Product'

const API_URL = 'https://fakestoreapi.com/products'

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos')
  }

  const data: Product[] = await response.json()
  return data
}
