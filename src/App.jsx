import { useState, useEffect, useRef } from "react";
import Dropzone from "react-dropzone";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createWorker } from "tesseract.js";
function App() {
  const [Text, setText] = useState("Text would be displayed here");
  const [count, setCount] = useState(0);

  const handleFile = (file) => {
    const blob = new Blob([file[0]], { type: file[0].type });
    const temp = URL.createObjectURL(blob);
    converIntoText(temp);
  };
  let worker;
  useEffect(() => {
    async function callfunc() {
      worker = await createWorker("eng");
    }
    callfunc();
  }, []);
  const converIntoText = async (temp) => {
    const ret = await worker.recognize(temp);
    console.log(ret.data.text);
    setText(ret.data.text);
    await worker.terminate();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{
            height: "400px",
            width: "400px",
            borderWidth: "50px",
            borderColor: "red",
            backgroundColor: "pink",
            padding: "40px",
            borderRadius: "50%",
          }}
        >
          <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div
          style={{
            height: "400px",
            width: "400px",
            borderWidth: "50px",
            borderColor: "red",
            backgroundColor: "pink",
            padding: "40px",
          }}
        >
          {Text}
        </div>
      </div>
    </>
  );
}

export default App;
