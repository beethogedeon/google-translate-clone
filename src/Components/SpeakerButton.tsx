import { Button } from "react-bootstrap";
import { FromLanguage } from "../types";
import { AUTO_LANGUAGE, SPEAKER_LANGUAGES } from "../constants";
import { SpeakerIcon } from "./Icons";

const handleSpeaker = ({ language, text }: Props) => {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = language !== 'auto' ? SPEAKER_LANGUAGES[language] : ''
  speechSynthesis.speak(utterance)
}

type Props = {
  language: FromLanguage, 
  text: string
}

export const SpeakerButton = ({ language, text }: Props) => {

  return (

    <Button
      variant='link'
      disabled={language === AUTO_LANGUAGE}
      onClick={() => handleSpeaker({ language, text })}>
      {
        language !== AUTO_LANGUAGE && <SpeakerIcon />
      }
    </Button>
  )
}