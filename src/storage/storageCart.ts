import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

const CART_STORAGE = '@COFFEEDELIVERY_CART'

export type StorageCartProps = {
  id: string
  name: string
  size: string
  quantity: number
  image: string
  price: number
}

export function storageProductGetAll() {
  const storageItems = storage.getString(CART_STORAGE) || ''
  const products: StorageCartProps[] = storageItems
    ? JSON.parse(storageItems)
    : []

  return products
}

export function storageProductSave(newProduct: StorageCartProps) {
  let products = storageProductGetAll()

  const productExists = products.filter(
    (product) => product.id === newProduct.id,
  )

  if (productExists.length > 0) {
    products = products.map((product) => {
      if (product.id === newProduct.id) {
        product.quantity = product.quantity + newProduct.quantity
      }

      return product
    })
  } else {
    products.push(newProduct)
  }

  const productsUpdated = JSON.stringify(products)
  storage.set(CART_STORAGE, productsUpdated)

  return products
}

export function storageProductRemove(productId: string) {
  const products = storageProductGetAll()

  const productsUpdated = products.filter((product) => product.id !== productId)
  storage.set(CART_STORAGE, JSON.stringify(productsUpdated))

  return productsUpdated
}

export function storageIncreaseItemQuantity(itemId: string) {
  const oldItems = storageProductGetAll()
  const existingItemIndex = oldItems.findIndex((coffee) => coffee.id === itemId)

  const updatedOrder = [...oldItems]

  if (existingItemIndex !== -1) {
    updatedOrder[existingItemIndex].quantity += 1

    storage.set(CART_STORAGE, JSON.stringify(updatedOrder))
  }
}

export function storageDecreaseItemQuantity(itemId: string) {
  const oldItems = storageProductGetAll()
  const existingItemIndex = oldItems.findIndex((coffee) => coffee.id === itemId)

  const updatedOrder = [...oldItems]

  if (existingItemIndex !== -1) {
    updatedOrder[existingItemIndex].quantity -= 1

    storage.set(CART_STORAGE, JSON.stringify(updatedOrder))
  }
}
