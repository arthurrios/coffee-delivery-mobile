import { Audio } from 'expo-av'
import SuccessAudio from '@assets/sounds/success.mp3'

export async function playSound() {
  const { sound } = await Audio.Sound.createAsync(SuccessAudio, {
    shouldPlay: true,
  })

  await sound.setPositionAsync(0)
  await sound.playAsync()
}
