import { useEffect, useState } from "react";
import { Audio, Transcription } from "types/recorder";
import { deleteAudio, sendAudioLocal, transcribe } from "../handlers/recordings-list";
import generateKey from "../utils/generate-key";

export default function useRecordingsList(audio: string | null) {
  const [recordings, setRecordings] = useState<Audio[]>([]);
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);

  const fetchTranscription = async (audio: string) => {
    const timeLocal1 = performance.now()
    const transcription = await sendAudioLocal(audio);
    const timeLocal2 = performance.now()
    const { languaje, transcript: transcriptLocal, date } = transcription.results;
    
    setTranscriptions((prevState: Transcription[]) => {
      return [...prevState, { languaje, 
        transcriptLocal,
        localTime: timeLocal2 - timeLocal1,
        date  }];
    });
  };

  useEffect(() => {
    if (audio)
      setRecordings((prevState: Audio[]) => {
        return [...prevState, { key: generateKey(), audio }];
      });
    console.log(audio);
    if (!audio) return;
    fetchTranscription(audio);

  }, [audio]);

  return {
    recordings,
    transcriptions,
    deleteAudio: (audioKey: string) => deleteAudio(audioKey, setRecordings),
    transcribe: (audioKey: string) => transcribe(audioKey, recordings),
  };
}
