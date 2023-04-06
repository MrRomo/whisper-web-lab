import { useEffect, useState } from "react";
import "./styles.css";

export default function RecorderSelector({ setDefaultDevice }: any) {

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
    <div className="controls-selector">
      <select name="" id="" onChange={handleChange}>
        {devices.map((device) => {
          return <option key={device.deviceId} value={device.deviceId}>{device.label}</option>;
        })
        }
      </select>
    </div>
  );
}
