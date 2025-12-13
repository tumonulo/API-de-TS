import type { ApiKey as ApiKeyType } from '../types/apikey.types'
import crypto from 'crypto'

class ApiKey {
  private apiKeys: Map<string, ApiKeyType> = new Map()

  constructor() {
    this.loadKeys()
  }

  private loadKeys() {
    const keysFromEnv = process.env.API_KEYS?.split(',') || []
    keysFromEnv.forEach(key => {
      if (key) {
        this.apiKeys.set(key, {
          key: key,
          name: 'Default Key',
          createdAt: new Date(),
          isActive: true
        })
      }
    })
  }

  generateKey(name: string): ApiKeyType {
    const key = `sk_${crypto.randomBytes(32).toString('hex')}`
    
    const apiKey: ApiKeyType = {
      key,
      name,
      createdAt: new Date(),
      isActive: true
    }

    this.apiKeys.set(key, apiKey)
    
    console.log(`Nueva API Key creada: ${name}`)
    console.log(`Key: ${key}`)
    
    return apiKey
  }

  validateKey(key: string): boolean {
    const apiKey = this.apiKeys.get(key)
    
    if (!apiKey || !apiKey.isActive) {
      return false
    }

    apiKey.lastUsed = new Date()
    
    return true
  }

  revokeKey(key: string): boolean {
    const apiKey = this.apiKeys.get(key)
    
    if (!apiKey) {
      return false
    }

    apiKey.isActive = false
    console.log(`API Key revocada: ${apiKey.name}`)
    
    return true
  }

  listKeys(): ApiKeyType[] {
    return Array.from(this.apiKeys.values()).map(key => ({
      ...key,
      key: key.key.substring(0, 12) + '...'
    }))
  }
}

export const apiKeyService = new ApiKey()