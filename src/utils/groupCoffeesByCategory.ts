import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { CoffeeSection } from '@screens/Catalog'

export function groupCoffeesByCategory(
  coffeeData: CoffeeDTO[],
): CoffeeSection[] {
  const groupedCoffees: { [key: string]: CoffeeSection } = coffeeData.reduce(
    (acc, coffee) => {
      if (acc[coffee.category]) {
        acc[coffee.category].data.push(coffee)
      } else {
        acc[coffee.category] = { title: coffee.category, data: [coffee] }
      }
      return acc
    },
    {} as { [key: string]: CoffeeSection },
  )
  return Object.values(groupedCoffees)
}
