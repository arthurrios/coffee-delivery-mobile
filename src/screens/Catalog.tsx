import { useEffect, useState } from 'react'
import { HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed'
import CoffeeGrains from '@assets/coffee-grains.png'
import { MapPin, ShoppingCart } from 'phosphor-react-native'
import { RootInput } from '@components/Input'
import { getCoffees } from '@data/coffees'
import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { FlatList } from 'react-native'
import { CarouselCard } from '@components/CarouselCard'
import { StatusBar } from 'expo-status-bar'
import { Tag } from '@components/Tag'

export function Catalog() {
  const [coffees, setCoffees] = useState<CoffeeDTO[]>([])
  const [featured, setFeatured] = useState<CoffeeDTO[]>([])
  const [categories, setCategories] = useState<string[]>([])

  function handleCategories(category: string) {
    const categoryAlreadySelected = categories.includes(category)

    if (categoryAlreadySelected) {
      setCategories((prevState) =>
        prevState.filter((item) => item !== category),
      )
    } else if (categories.length === 2 && !categoryAlreadySelected) {
      setCategories([])
    } else {
      setCategories((prevState) => [...prevState, category])
    }
  }

  async function fetchData() {
    const data = await getCoffees()
    setCoffees(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    function filterOnePerCategory() {
      const uniqueCategories = new Set()
      const filteredData = []

      for (const item of coffees) {
        if (!uniqueCategories.has(item.category)) {
          uniqueCategories.add(item.category)
          filteredData.push(item)
        }
      }
      setFeatured(filteredData)
    }

    filterOnePerCategory()
  }, [coffees])

  return (
    <VStack flex={1}>
      <StatusBar style="light" />
      <VStack h={384} bgColor="$gray_100">
        <Image
          position="absolute"
          right="$2"
          bottom={68}
          source={CoffeeGrains}
          alt="coffee-grains"
        />
        <HStack
          mt="$12"
          justifyContent="space-between"
          alignItems="center"
          py="$4"
          px="$8"
        >
          <HStack alignItems="center" gap="$1">
            <MapPin size={20} weight="fill" color="#8047F8" />
            <Text fontFamily="$body" fontSize="$sm" color="$gray_900">
              Brasília, DF
            </Text>
          </HStack>
          <Pressable h="$8" w="$8" alignItems="center" justifyContent="center">
            <ShoppingCart size={20} weight="fill" color="#C47F17" />
          </Pressable>
        </HStack>
        <VStack mt="$5" px="$8" gap="$4">
          <Text
            color="$white"
            fontFamily="$heading"
            fontSize="$xl"
            lineHeight="$lg"
          >
            Find the perfect coffee for every occasion
          </Text>
          <RootInput placeholder="Search" />
        </VStack>
      </VStack>
      <FlatList
        data={featured}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => <CarouselCard data={item} />}
        contentContainerStyle={{
          gap: 32,
          paddingHorizontal: 32,
          paddingTop: 34,
        }}
        horizontal
        style={{
          position: 'absolute',
          zIndex: 20,
          flex: 1,
          top: 264,
          width: '100%',
        }}
        snapToInterval={176}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
      />
      <VStack pt={216} px="$8">
        <VStack py="$4" gap="$3">
          <Text fontFamily="$heading" color="$gray_300" fontSize="$md">
            Our coffees
          </Text>
          <HStack gap="$2">
            <Tag
              title="traditional"
              isSelected={categories.includes('traditional')}
              onPress={() => handleCategories('traditional')}
            />
            <Tag
              title="sweet"
              isSelected={categories.includes('sweet')}
              onPress={() => handleCategories('sweet')}
            />
            <Tag
              title="special"
              isSelected={categories.includes('special')}
              onPress={() => handleCategories('special')}
            />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
