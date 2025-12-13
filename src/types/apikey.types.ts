export interface ApiKey {
  key: string
  name: string
  createdAt: Date
  lastUsed?: Date
  isActive: boolean
}