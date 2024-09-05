import { FromLanguage, Language } from "../types.d";

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage,
  toLanguage: Language,
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const fromCode = fromLanguage === 'auto' ? 'auto' : fromLanguage
  const toCode = toLanguage
  const data = { fromCode, toCode, text }

  //hacer el fetching a la api backend
  const response = await fetch('https://imole-translator-eight.vercel.app/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}