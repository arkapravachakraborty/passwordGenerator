import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const[length, setLength] = useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[characterAllowed, setCharacterAllowed] = useState(false);
  const[password, setPassword] = useState("");

  //UseRef Hook
  const passwordRef  = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"

    if(characterAllowed) str += "!@#$%^&*()_-+={}[]~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password);
  }, [password])
  
  return (
    <>
      <div className='w-full max-w-xl mx-auto shadow-lg rounded-xl px-6 py-6 my-10 text-orange-500 bg-gray-700 '>
        <h1 className='text-white text-center text-4xl font-bold mb-4'>Random Password Generator</h1>
        <div className='flex shadow-lg rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={password}
          className='outline-white w-full py-2 px-4 bg-white text-black text-lg font-semibold'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />

          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-5 py-2 text-lg shrink-0 hover:bg-blue-500 active:bg-blue-700 
          transition duration-200 cursor-pointer'>Copy</button>
        </div>
        <div className='flex flex-col sm:flex-row text-lg gap-y-3 gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length} 
            className='cursor-pointer w-full'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input 
            type="checkbox"
            defaultChecked = {numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-2'>
          <input
              type="checkbox"
              defaultChecked = {characterAllowed}
              id="characterInput"
              onChange={() => {
                  setCharacterAllowed((prev) => !prev );
              }} />
          <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
