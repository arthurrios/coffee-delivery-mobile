import { Center, Spinner } from "@gluestack-ui/themed";

export function Loading() {
  return (
    <Center flex={1} >
      <Spinner flex={1} color='$yellow_dark'/>
    </Center>
  )
}