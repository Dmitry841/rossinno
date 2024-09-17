import { BASE_URL } from '@/constants'
import io, { Socket } from 'socket.io-client'

export async function getData() {
  const response = await fetch(BASE_URL)
  const result = await response.json()
  return result
}

class SocketApi {
  static socket: null | Socket = null

  static createConnection(): void {
    this.socket = io(BASE_URL)
    this.socket.on('connect', () => {
      console.log('connected')
    })
    this.socket.on('disconnect', () => {
      console.log('disconnect')
    })
  }
}

export default SocketApi
