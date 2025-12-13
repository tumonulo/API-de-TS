export interface WebhookItem {
  name: string
  value: string
}

export interface WebhookPayload {
  content: string
  embeds: Array<{
    title: string
    fields: WebhookItem[]
    color: number
  }>
}

export interface FormResponse {
  question: string
  answer: string | string[]
}