import { useCallback, useEffect, useState } from "@lynx-js/react";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import "./components/RowInput.jsx";
import RowInput from "./components/RowInput.jsx";

export function App(props) {
  const [alterLogo, setAlterLogo] = useState(false);
  const [numRows, setNumRows] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.info("Hello, ReactLynx");
  }, []);
  props.onRender?.();

  const onTap = useCallback(() => {
    "background only";
    setAlterLogo((prevAlterLogo) => !prevAlterLogo);
  }, []);

  return (
    <view className="App">
      {isLoading && (
        <view>
          {" "}
          <text className="Title">🪄 Create your video with AI!</text>
          <RowInput numRows={numRows} />
          <view bindtap={(e) => setNumRows(numRows + 1)} className="Button">
            <text className="AddButton">+ Add Row</text>
          </view>
          <view bindtap={(e) => setNumRows(numRows + 1)} className="Button">
            <text className="AddButton">Submit</text>
          </view>
        </view>
      )}
    </view>
  );
}
