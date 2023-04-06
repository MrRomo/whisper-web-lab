import { SetRecorder } from "types/recorder";

export async function startRecording(setRecorderState: SetRecorder, deviceId: string) {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId } });

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      };
    });
  } catch (err) {
    console.log(err);
  }
}

export function saveRecording(recorder: any) {
  if (recorder.state !== "inactive") recorder.stop();
}
