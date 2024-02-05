import { useEffect, useState } from 'react'
import {
  HStack,
  Image,
  SectionList,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed'
import CoffeeGrains from '@assets/coffee-grains.png'
import { MapPin } from 'phosphor-react-native'
import { RootInput } from '@components/Input'
import { getCoffees } from '@data/coffees'
import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { Dimensions, FlatList, SectionListRenderItemInfo } from 'react-native'
import { CarouselCard } from '@components/CarouselCard'
import { StatusBar } from 'expo-status-bar'
import { Tag } from '@components/Tag'
import { groupCoffeesByCategory } from '@utils/groupCoffeesByCategory'
import { CoffeeCard } from '@components/CoffeeCard'
import { Cart } from '@components/Cart'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/index'
import { AddCoffeeToast } from '@components/AddCoffeeToast'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const { height } = Dimensions.get('screen')

type RouteParamsProps = {
  name: string
  size: string
  quantity: number
}

export type CoffeeSection = {
  title: string
  data: CoffeeDTO[]
}

export function Catalog() {
  const [coffees, setCoffees] = useState<CoffeeDTO[]>([])
  const [groupedCoffees, setGroupedCoffees] = useState<CoffeeSection[]>([])
  const [featured, setFeatured] = useState<CoffeeDTO[]>([])
  const [categories, setCategories] = useState<string[]>([])

  const translateY = useSharedValue(height)

  const navigation = useNavigation<AppNavigationRoutesProps>()

  const route = useRoute()
  const routeParams = route.params as RouteParamsProps

  function handleCart() {
    navigation.navigate('cart')
  }

  function handleProductDetails(product: CoffeeDTO) {
    navigation.navigate('product', product)
  }

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

  useEffect(() => {
    async function fetchData() {
      const data = await getCoffees()
      setCoffees(data)
      setGroupedCoffees(groupCoffeesByCategory(data))
    }
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

  useEffect(() => {
    if (categories.length !== 0) {
      setGroupedCoffees(
        groupCoffeesByCategory(coffees).filter((group) =>
          categories.includes(group.title),
        ),
      )
    } else {
      setGroupedCoffees(groupCoffeesByCategory(coffees))
    }
  }, [categories])

  useEffect(() => {
    if (routeParams) {
      translateY.value = withTiming(height - 96, {
        duration: 800,
        easing: Easing.out(Easing.exp),
      })
      setTimeout(() => {
        translateY.value = withTiming(height, {
          duration: 800,
          easing: Easing.out(Easing.exp),
        })
      }, 5000)
    }
  }, [routeParams])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      position: 'absolute',
      zIndex: 40,
    }
  })

  return (
    <>
      <SectionList
        ListHeaderComponentStyle={{ marginBottom: 12 }}
        ListHeaderComponent={() => (
          <>
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
                <Cart onPress={() => handleCart()} />
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
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <CarouselCard
                  data={item}
                  onPress={() => handleProductDetails(item)}
                />
              )}
              contentContainerStyle={{
                gap: 32,
                paddingHorizontal: 32,
                paddingVertical: 34,
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
          </>
        )}
        sections={groupedCoffees}
        keyExtractor={(item, index) =>
          (item as CoffeeDTO).name + index.toString()
        }
        renderSectionHeader={({
          section,
        }: SectionListRenderItemInfo<CoffeeDTO, CoffeeSection>) => (
          <View px="$8">
            <Text
              fontSize="$sm"
              textTransform="capitalize"
              fontFamily="$heading"
              color="$gray_400"
            >
              {section.title}
            </Text>
          </View>
        )}
        renderItem={({
          item,
          index,
          section,
        }: SectionListRenderItemInfo<CoffeeDTO, CoffeeSection>) => (
          <View px="$8" mb={index === section.data.length - 1 ? 48 : 0}>
            <CoffeeCard
              data={item}
              onPress={() => handleProductDetails(item)}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8 }}
      />
      {routeParams && (
        <Animated.View style={[animatedStyle]}>
          <AddCoffeeToast
            name={routeParams.name}
            size={routeParams.size}
            quantity={routeParams.quantity}
          />
        </Animated.View>
      )}
    </>
  )
}
