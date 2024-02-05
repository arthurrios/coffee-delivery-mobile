/* eslint-disable no-useless-catch */
import {
  StorageCartProps,
  storageDecreaseItemQuantity,
  storageIncreaseItemQuantity,
  storageProductGetAll,
  storageProductRemove,
  storageProductSave,
} from '@storage/storageCart'
import { ReactNode, createContext, useEffect, useState } from 'react'

export type CartContextDataProps = {
  addProductCart: (newProduct: StorageCartProps) => void
  removeProductCart: (productId: string) => void
  cart: StorageCartProps[]
  updateProductQuantity: (itemId: string, newQuantity: number) => void
}

type CartContextProviderProps = {
  children: ReactNode
}

export const CartContext = createContext<CartContextDataProps>(
  {} as CartContextDataProps,
)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<StorageCartProps[]>([])

  function addProductCart(newProduct: StorageCartProps) {
    const storageResponse = storageProductSave(newProduct)
    setCart(storageResponse)
  }

  function removeProductCart(productId: string) {
    const response = storageProductRemove(productId)
    setCart(response)
  }

  function updateProductQuantity(itemId: string, newQuantity: number) {
    if (newQuantity > 0) {
      storageIncreaseItemQuantity(itemId)
    } else {
      storageDecreaseItemQuantity(itemId)
    }

    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item,
    )
    setCart(updatedCart)
  }

  useEffect(() => {
    const products = storageProductGetAll()
    setCart(products)
  }, [])

  return (
    <CartContext.Provider
      value={{ cart, addProductCart, removeProductCart, updateProductQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}
