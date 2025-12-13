// controllers/apikey.controller.ts
import { Request, Response } from 'express'
import { apiKeyService } from '../services/apikey.service'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

// Middleware simple de admin
const authenticateAdmin = (req: Request, res: Response, next: Function) => {
  const password = req.headers['x-admin-password'] as string
  
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ ok: false, error: 'Forbidden' })
  }
  
  next()
}

export const createApiKey = [authenticateAdmin, (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Name is required' 
      })
    }

    const apiKey = apiKeyService.generateKey(name)
    
    return res.status(201).json({ 
      ok: true,
      apiKey: {
        id: apiKey.id,
        key: apiKey.key, // ⚠️ Solo se muestra una vez
        name: apiKey.name,
        createdAt: apiKey.createdAt
      },
      warning: 'Save this key, it will not be shown again'
    })
  } catch (err) {
    console.error('Error creating API key:', err)
    return res.status(500).json({ 
      ok: false, 
      error: 'Error creating API key' 
    })
  }
}]

export const listApiKeys = [authenticateAdmin, (req: Request, res: Response) => {
  try {
    const keys = apiKeyService.listKeys()
    return res.status(200).json({ ok: true, keys })
  } catch (err) {
    console.error('Error listing API keys:', err)
    return res.status(500).json({ 
      ok: false, 
      error: 'Error listing API keys' 
    })
  }
}]

export const revokeApiKey = [authenticateAdmin, (req: Request, res: Response) => {
  try {
    const { key } = req.body

    if (!key) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Key is required' 
      })
    }

    const success = apiKeyService.revokeKey(key)
    
    if (!success) {
      return res.status(404).json({ 
        ok: false, 
        error: 'API key not found' 
      })
    }

    return res.status(200).json({ 
      ok: true, 
      message: 'API key revoked successfully' 
    })
  } catch (err) {
    console.error('Error revoking API key:', err)
    return res.status(500).json({ 
      ok: false, 
      error: 'Error revoking API key' 
    })
  }
}]