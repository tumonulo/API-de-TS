// routes/application.routes.ts
import { Router } from 'express'
import { sendApplication } from '../controllers/application.controller'
import { createApiKey, listApiKeys, revokeApiKey } from '../controllers/apikey.controller'
import { authenticateApiKey } from '../middlewares/auth.middleware'

const router = Router()

// Endpoint protegido con API key
router.post('/application', authenticateApiKey, sendApplication)

// Endpoints de gestión de API keys (protegidos con password de admin)
router.post('/keys', createApiKey)
router.get('/keys', listApiKeys)
router.delete('/keys', revokeApiKey)

export default router