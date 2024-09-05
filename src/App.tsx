import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useTraductor } from './hooks/useReducer'
//import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon, ClipBoardIcon } from './Components/Icons'
import { LanguageSelector } from './Components/LanguageSelector'
import { TextArea } from './Components/TextArea'
import { SectionType } from './types.d'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
import { SpeakerButton } from './Components/SpeakerButton'

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    interchangeLanguages,
  } = useTraductor()

  const debounceFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debounceFromText === '') return

    translate({ text: debounceFromText, fromLanguage, toLanguage  })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => setResult('Error'))
  }, [debounceFromText, fromLanguage, toLanguage])

  const handleClickBoard = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <>
      <Container fluid>
        <h2>Imole Translate</h2>

        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <div style={{ position: 'relative' }}>
                <TextArea
                  type={SectionType.From}
                  value={fromText}
                  onChange={setFromText}
                />
                <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <SpeakerButton
                  language={fromLanguage}
                  text={fromText}
                />
                </div>

              </div>
            </Stack>
          </Col>

          <Col xs='auto'>
            <Button variant='link'
              disabled={fromLanguage === toLanguage}
              onClick={() => interchangeLanguages()}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />
              <div style={{ position: 'relative' }}>
                <TextArea

                  loading={loading}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                />
                <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                  <Button
                    variant='link'
                    onClick={handleClickBoard}>
                    <ClipBoardIcon />
                  </Button>
                  <SpeakerButton
                    language={toLanguage}
                    text={result}
                  />
                </div>

              </div>
            </Stack>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default App
