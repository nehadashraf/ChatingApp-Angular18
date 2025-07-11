import { Photo } from "./photo"

export interface Member {
  id: string
  userName: string
  age: number
  photoUrl: string
  knownAs: string
  created: Date
  lastActive: string
  gender: string
  introduction: string
  interests: string
  lookingFor: string
  city: string
  country: string
  photos: Photo[]
}
