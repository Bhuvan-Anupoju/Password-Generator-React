import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [letterAllowed, setLetterAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    if (letterAllowed)
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "012345678";
    if (charAllowed) str += "%$#@!^&*?{[()]}_-+";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, letterAllowed]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, letterAllowed, passwordGenerator]);
  const copyPasswordToClipboard = useCallback(() => {
    setShowText(true);
    setTimeout(() => {
      setShowText(false);
    }, 1500);
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto  shadow-xl rounded-lg px-4 py-4 my-10 text-black bg-gray-60">
        <h1 className="my-3 text-black">Password Generator</h1>
        <hr />
        <br />
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-gray-200 text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-black-100 px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="'flex flex-col items-center gap-x-2 ">
            <input
              type="range"
              min={6}
              max={18}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <br />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2 mx-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={letterAllowed}
              id="letterInput"
              onChange={() => {
                setLetterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="letterInput">Letters</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput"> Special Characters</label>
          </div>
        </div>
        {showText && <p className="text-green-600">Copied to Clipboard</p>}
      </div>
    </>
  );
}

export default App;
