import RecorderControls from "./components/recorder-controls";
import RecordingsList from "./components/recordings-list";
import useRecorder from "./hooks/use-recorder";
import { UseRecorder } from "types/recorder";
import "app.css";
import { useEffect, useState } from "react";

export default function App() {
  const [defaultDevice, setDefaultDevice] = useState<string>("");
  const { recorderState, ...handlers }: UseRecorder = useRecorder(defaultDevice);
  const { audio } = recorderState;

  useEffect(() => {
    console.log(defaultDevice);
  }, [defaultDevice]);

  return (
    <section className="voice-recorder">
      <h1 className="title">Kassandra Voice Module</h1>
      <div className="recorder-container">
        <RecorderControls setDefaultDevice={setDefaultDevice} recorderState={recorderState} handlers={handlers}/>
        <RecordingsList audio={audio} />
      </div>
    </section>
  );
}
