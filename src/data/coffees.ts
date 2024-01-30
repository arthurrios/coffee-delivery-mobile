export async function getCoffees() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      name: 'Espresso',
      category: 'traditional',
      image: require('../assets/coffees/Espresso.png'),
      description: 'Traditional coffee made with hot water and ground beans',
      price: 3.5,
    },
    {
      name: 'Americano',
      category: 'traditional',
      image: require('../assets/coffees/Americano.png'),
      description: 'Diluted espresso, less intense than the traditional one',
      price: 3.5,
    },
    {
      name: 'Creamy Espresso',
      category: 'traditional',
      image: require('../assets/coffees/Creamy Espresso.png'),
      description: 'Traditional espresso with creamy foam',
      price: 3.5,
    },
    {
      name: 'Latte',
      category: 'traditional',
      image: require('../assets/coffees/Latte.png'),
      description: 'Espresso with double the amount of milk and creamy foam',
      price: 3.5,
    },
    {
      name: 'Iced Coffee',
      category: 'traditional',
      image: require('../assets/coffees/Iced Coffee.png'),
      description: 'Beverage prepared with espresso and ice cubes',
      price: 3.5,
    },
    {
      name: 'Capuccino',
      category: 'sweet',
      image: require('../assets/coffees/Capuccino.png'),
      description:
        'Cinnamon-flavored drink made with doses of coffee, milk, and foam',
      price: 3.5,
    },
    {
      name: 'Mocaccino',
      category: 'sweet',
      image: require('../assets/coffees/Mochaccino.png'),
      description: 'Espresso with chocolate syrup, little milk, and foam',
      price: 3.5,
    },
    {
      name: 'Hot Chocolate',
      category: 'sweet',
      image: require('../assets/coffees/Hot Chocolate.png'),
      description: 'Drink made with chocolate dissolved in hot milk and coffee',
      price: 3.5,
    },
    {
      name: 'Cuban',
      category: 'special',
      image: require('../assets/coffees/Cuban.png'),
      description: 'Iced espresso drink with rum, cream, and mint',
      price: 3.5,
    },
    {
      name: 'Hawaiian',
      category: 'special',
      image: require('../assets/coffees/Hawaiian.png'),
      description: 'Sweetened beverage prepared with coffee and coconut milk',
      price: 3.5,
    },
    {
      name: 'Arabic',
      category: 'special',
      image: require('../assets/coffees/Arabic.png'),
      description: 'Beverage prepared with Arabica coffee beans and spices',
      price: 3.5,
    },
    {
      name: 'Irish',
      category: 'special',
      image: require('../assets/coffees/Irish.png'),
      description:
        'Drink made with coffee, Irish whiskey, sugar, and whipped cream',
      price: 3.5,
    },
  ]
}
