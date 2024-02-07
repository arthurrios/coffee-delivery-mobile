import { useEffect, useState } from 'react'
import { HStack, Image, Text, VStack, View } from '@gluestack-ui/themed'
import CoffeeGrains from '@assets/coffee-grains.png'
import { MapPin } from 'phosphor-react-native'
import { RootInput } from '@components/Input'
import { getCoffees } from '@data/coffees'
import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { Dimensions } from 'react-native'
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
  Extrapolation,
  FadeIn,
  SlideInUp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const { height, width } = Dimensions.get('screen')

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
  const [queryCoffees, setQueryCoffees] = useState<CoffeeDTO[]>([])

  const translateY = useSharedValue(height)
  const scrollX = useSharedValue(0)
  const scrollY = useSharedValue(0)
  const animatedFlatlistStyle = useSharedValue(0)

  const navigation = useNavigation<AppNavigationRoutesProps>()

  const route = useRoute()
  const routeParams = route.params as RouteParamsProps

  const handleOnScrollCarousel = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  const handleOnScrollScreen = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

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

  function handleSearch(query: string) {
    const searchResult = coffees.filter((coffee) =>
      coffee.name.toLowerCase().includes(query.toLowerCase()),
    )
    setQueryCoffees(searchResult)
    if (query === '') {
      setQueryCoffees([])
    }
  }

  const toastAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      position: 'absolute',
      zIndex: 40,
    }
  })

  const carouselAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            animatedFlatlistStyle.value,
            [0, 1],
            [width, 0],
          ),
        },
      ],
    }
  })

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [60, 90],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    }
  })

  const fixedHeaderStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 40,
      width: '100%',
      opacity: interpolate(
        scrollY.value,
        [50, 90],
        [0, 1],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [50, 100],
            [-40, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }
  })

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
      translateY.value = withSequence(
        withTiming(height - 96, {
          duration: 800,
          easing: Easing.out(Easing.exp),
        }),
        withDelay(
          5000,
          withTiming(height, {
            duration: 800,
            easing: Easing.out(Easing.exp),
          }),
        ),
      )
    }
  }, [routeParams])

  useEffect(() => {
    animatedFlatlistStyle.value = withDelay(
      1200,
      withTiming(1, { duration: 1000 }),
    )
  }, [])

  return (
    <>
      <Animated.View style={fixedHeaderStyle}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          pt={52}
          pb="$2"
          px="$8"
          bgColor="$gray_900"
          borderBottomWidth={1}
          borderBottomColor="$gray_800"
        >
          <HStack alignItems="center" gap="$1">
            <MapPin size={20} weight="fill" color="#8047F8" />
            <Text fontFamily="$body" fontSize="$sm" color="$gray_200">
              Brasília, DF
            </Text>
          </HStack>
          <Cart onPress={() => handleCart()} />
        </HStack>
      </Animated.View>
      <Animated.ScrollView
        onScroll={handleOnScrollScreen}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="light" />
        <Animated.View entering={SlideInUp.duration(1000)}>
          <VStack h={384} bgColor="$gray_100">
            <Image
              position="absolute"
              right="$2"
              bottom={68}
              source={CoffeeGrains}
              alt="coffee-grains"
            />
            <Animated.View style={headerStyle}>
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
            </Animated.View>

            <VStack mt="$5" px="$8" gap="$4">
              <Text
                color="$white"
                fontFamily="$heading"
                fontSize="$xl"
                lineHeight="$lg"
              >
                Find the perfect coffee for every occasion
              </Text>
              <RootInput placeholder="Search" onSearch={handleSearch} />
            </VStack>
          </VStack>
        </Animated.View>

        <Animated.FlatList
          data={featured}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <CarouselCard
              data={item}
              onPress={() => handleProductDetails(item)}
              index={index}
              scrollX={scrollX}
            />
          )}
          onScroll={handleOnScrollCarousel}
          contentContainerStyle={{
            gap: 32,
            paddingHorizontal: 32,
            paddingVertical: 34,
          }}
          horizontal
          style={[
            {
              position: 'absolute',
              zIndex: 20,
              flex: 1,
              top: 264,
            },
            carouselAnimatedStyle,
          ]}
          snapToInterval={176}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
        />
        <Animated.View entering={FadeIn.delay(2000).duration(1000)}>
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
        </Animated.View>

        <Animated.View entering={FadeIn.delay(2500)}>
          {queryCoffees.length === 0 ? (
            <>
              {groupedCoffees.map((section, sectionIndex) => (
                <Animated.View
                  entering={FadeIn.duration(1000)}
                  key={sectionIndex}
                >
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
                  {section.data.map((item, itemIndex) => (
                    <Animated.View
                      entering={FadeIn.duration(1000)}
                      key={item.id}
                    >
                      <View
                        px="$8"
                        mb={itemIndex === section.data.length - 1 ? 48 : 0}
                      >
                        <CoffeeCard
                          data={item}
                          onPress={() => handleProductDetails(item)}
                        />
                      </View>
                    </Animated.View>
                  ))}
                </Animated.View>
              ))}
            </>
          ) : (
            <>
              {queryCoffees.map((item, itemIndex) => (
                <Animated.View entering={FadeIn.duration(1000)} key={item.id}>
                  <View
                    px="$8"
                    mb={itemIndex === queryCoffees.length - 1 ? 48 : 0}
                  >
                    <CoffeeCard
                      data={item}
                      onPress={() => handleProductDetails(item)}
                    />
                  </View>
                </Animated.View>
              ))}
            </>
          )}
        </Animated.View>
      </Animated.ScrollView>

      {routeParams && (
        <Animated.View style={toastAnimatedStyle}>
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
