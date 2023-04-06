import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faExclamationCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import useRecordingsList from "../../hooks/use-recordings-list";
import { RecordingsListProps } from "types/recorder";
import "./styles.css";
import { useState } from "react";

export default function RecordingsList({ audio }: RecordingsListProps) {
  const { recordings, deleteAudio, transcriptions, transcribe } = useRecordingsList(audio);
  const [active, setActive] = useState(false);
  return (
    <div className="recordings-container">
      <div className="switch-button">
        <button onClick={() => setActive(!active)}> {active ? 'Audio' : 'Transcription'} </button>
      </div>
      {active ?
        
          recordings.length > 0 ? (
            <>
              <h1>Your recordings</h1>
              <div className="recordings-list">
                {recordings.sort().map((record) => (
                  <div className="record" key={record.key}>
                    <audio controls src={record.audio} />
                    <div className="delete-button-container">
                      <button
                        className="delete-button"
                        title="Delete this audio"
                        onClick={() => deleteAudio(record.key)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                      <button
                        className="delete-button"
                        title="Delete this audio"
                        onClick={() => transcribe(record.key)}
                      >
                        <FontAwesomeIcon icon={faPlayCircle} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-records">
              <FontAwesomeIcon icon={faExclamationCircle} size="2x" color="#f2ea02" />
              <span>You don't have records</span>
            </div>
          )
        :
            transcriptions.length > 0 ? (
              <>
                <h1>Your transcriptions</h1>
                <div className="transcription-list">
                  {transcriptions.reverse().map((t, index) => (
                    <div className="transcription-card" key={index}>
                      <p>{t.date}</p>
                      Local ------------------------- {t.localTime} ms
                      <p>{t.transcriptLocal}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-records">
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" color="#f2ea02" />
                <span>You don't have records</span>
              </div>
            )
        }
    </div>
  );
}
