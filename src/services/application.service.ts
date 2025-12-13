import type { WebhookItem, WebhookPayload, FormResponse } from '../types/application.types'
import { WEBHOOK_URL } from "../config/config"

async function handleApplication(responses: FormResponse[]): Promise<void> {
  try {
    const items: WebhookItem[] = []

    responses.forEach((response) => {
      let { question, answer } = response

      if (typeof answer === 'string') {
      } else if (Array.isArray(answer)) {
        answer = answer.join(", ")
      } else if (!answer) {
        return
      }

      const parts = (typeof answer === 'string') 
        ? answer.match(/[\s\S]{1,1024}/g) || [] 
        : [String(answer)]

      parts.forEach((part, index) => {
        items.push({
          name: index === 0 ? question : question + " - (cont.)",
          value: `> ${part}`,
          inline: false
        })
      })
    })

    const payload: WebhookPayload = {
      content: '@everyone',
      embeds: [{
        title: "Postulaciones de TS Com. Brawl & Clash",
        fields: items,
        color: parseInt("2f6df9", 16)
      }]
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`)
    }

  } catch {
    throw new Error('Error sending application data to Discord webhook')  
  }
}

export { handleApplication }