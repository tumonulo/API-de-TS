// services/apikey.service.ts
import { ApiKey } from '../types/apikey.types'
import crypto from 'crypto'

class ApiKeyService {
  private apiKeys: Map<string, ApiKey> = new Map()

  constructor() {
    // Cargar keys desde variable de entorno o base de datos
    this.loadKeys()
  }

  private loadKeys() {
    // Opción 1: Desde variable de entorno (simple)
    const keysFromEnv = process.env.API_KEYS?.split(',') || []
    keysFromEnv.forEach(key => {
      if (key) {
        this.apiKeys.set(key, {
          id: crypto.randomUUID(),
          key: key,
          name: 'Default Key',
          createdAt: new Date(),
          isActive: true
        })
      }
    })
  }

  generateKey(name: string): ApiKey {
    // Generar key segura: "sk_" + 32 caracteres aleatorios
    const key = `sk_${crypto.randomBytes(32).toString('hex')}`
    
    const apiKey: ApiKey = {
      id: crypto.randomUUID(),
      key,
      name,
      createdAt: new Date(),
      isActive: true
    }

    this.apiKeys.set(key, apiKey)
    
    // Aquí guardarías en base de datos
    console.log(`Nueva API Key creada: ${name}`)
    console.log(`Key: ${key}`)
    
    return apiKey
  }

  validateKey(key: string): boolean {
    const apiKey = this.apiKeys.get(key)
    
    if (!apiKey || !apiKey.isActive) {
      return false
    }

    // Actualizar último uso
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

  listKeys(): ApiKey[] {
    return Array.from(this.apiKeys.values()).map(key => ({
      ...key,
      key: key.key.substring(0, 12) + '...' // Ocultar key completa
    }))
  }
}

export const apiKeyService = new ApiKeyService()