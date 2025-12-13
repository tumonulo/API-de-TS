import { Request, Response } from 'express'
import { FormResponse } from '../types/application.types'
import { handleApplication } from '../services/application.service'

export const sendApplication = async (req: Request, res: Response) => {
  try {
    const responses: FormResponse[] = req.body.responses

    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ 
        ok: false,
        error: 'Invalid request: responses array is required' 
      })
    }

    const isValidStructure = responses.every(
      response => response.question && response.answer !== undefined
    )

    if (!isValidStructure) {
      return res.status(400).json({ 
        ok: false,
        error: 'Invalid request: each response must have question and answer' 
      })
    }

    await handleApplication(responses)
    
    return res.status(200).json({ 
      ok: true,
      message: 'Application sent successfully' 
    })
  } catch (err) {
    console.error('Error in sendApplication controller:', err)
    return res.status(500).json({ 
      ok: false,
      error: 'Error sending application to Discord' 
    })
  }
}