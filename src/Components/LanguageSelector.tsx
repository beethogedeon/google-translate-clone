import Form from 'react-bootstrap/Form'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { FromLanguage, Language, SectionType } from '../types.d'

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }


export function LanguageSelector({ type, value, onChange }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  return (
    <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
      {type === SectionType.From && <option key={AUTO_LANGUAGE} value={AUTO_LANGUAGE} >Detectar idioma</option>}

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}