import { faMicrophone, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RecorderControlsProps } from "types/recorder";
import { formatMinutes, formatSeconds } from "../../utils/format-time";
import "./styles.css";
import { useEffect, useState } from "react";

export default function RecorderControls({ recorderState, handlers, setDefaultDevice }: RecorderControlsProps) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter((device) => device.kind === "audioinput");
      setDevices(audioDevices);
      setDefaultDevice(audioDevices[0].deviceId)
    };
    getDevices()
  }, []);

  const handleChange = (e: any) => {
    setDefaultDevice(e.target.value);
  };

  return (
    <div className="controls-container">
      <div className="controls-selector">
        <select name="" id="" onChange={handleChange}>
          {devices.map((device) => {
            return <option key={device.deviceId} value={device.deviceId}>{device.label}</option>;
          })
          }
        </select>
      </div>
      <div className="recorder-display">
        <div className="recording-time">
          {initRecording && <div className="recording-indicator"></div>}
          <span>{formatMinutes(recordingMinutes)}</span>
          <span>:</span>
          <span>{formatSeconds(recordingSeconds)}</span>
        </div>
        {initRecording && (
          <div className="cancel-button-container">
            <button className="cancel-button" title="Cancel recording" onClick={cancelRecording}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}
      </div>
      <div className="start-button-container">
        {initRecording ? (
          <button
            className="start-button"
            title="Save recording"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            <FontAwesomeIcon icon={faSave} size="2x" />
          </button>
        ) : (
          <button className="start-button" title="Start recording" onClick={startRecording}>
            <FontAwesomeIcon icon={faMicrophone} size="2x" />
          </button>
        )}
      </div>
    </div>
  );
}
