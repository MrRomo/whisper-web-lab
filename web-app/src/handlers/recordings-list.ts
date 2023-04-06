import { Audio, SetRecordings } from "types/recorder";

export function deleteAudio(audioKey: string, setRecordings: SetRecordings) {
  setRecordings((prevState) => prevState.filter((record) => record.key !== audioKey));
}

export async function transcribe(audioKey: string, recordings: Audio[]) {
  const audio = recordings.find((record) => record.key === audioKey);
  if (!audio) return;
  const resultLocal = await sendAudioLocal(audio.audio);
  return resultLocal
}

export async function sendAudioLocal(audio: string) {
  const WHISPER_ENDPOINT = "http://localhost:5000/whisper_local";
  const blob = await fetch(audio).then((r) => r.blob());
  const formData = new FormData();
  //create blob string from audio file
  const file = new File([blob], "audio.mp3", { type: "audio/mp3" });
  formData.append("audio_file", file);
  const data = await fetch(WHISPER_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: {
      'Access-Control-Allow-Origin': "*",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return data;
}
export async function sendAudioApi(audio: string) {
  const WHISPER_ENDPOINT = "http://localhost:5000/whisper_api";
  const blob = await fetch(audio).then((r) => r.blob());
  const formData = new FormData();
  //create blob string from audio file
  const file = new File([blob], "audio.mp3", { type: "audio/mp3" });
  formData.append("audio_file", file);
  const data = await fetch(WHISPER_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: {
      'Access-Control-Allow-Origin': "*",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return data;
}
