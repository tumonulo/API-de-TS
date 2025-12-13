import fs from 'node:fs'
import { Router } from 'express'

const router = Router()

const path = './src/routes'

fs.readdirSync(path).forEach((file) => {
  if (file === 'index.ts') return

  import(`./${file}`).then((module) => {
    const routeName = file.replace('.routes.ts', '')
    router.use(`/${routeName}`, module.default)
  })
})

export default router