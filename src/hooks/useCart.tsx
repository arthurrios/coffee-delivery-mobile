import { CartContext, CartContextDataProps } from '@contexts/CartContext'
import { useContext } from 'react'

export function useCart(): CartContextDataProps {
  const context = useContext(CartContext)

  return context
}
