import LogoTalking from "./components/LogoTalking";
import Options from "./components/Options";
import { useEffect, useState,useRef } from "react";

function App() {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [loadedFromLocalStorage, setLoadedFromLocalStorage] = useState(false);

  function onChange(e) {
    setText(e.target.value);
  }
  useEffect(() => {
    setText(localStorage.getItem("text"));
    setLoadedFromLocalStorage(true);
  }, []);
  
  useEffect(() => {
    if (loadedFromLocalStorage) {
      localStorage.setItem("text", text);
    }


  }, [text]);

  useEffect(() => {
    // Establecer el foco al final del texto después de que el componente se haya montado
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(text.length, text.length);
    }
  }, [loadedFromLocalStorage]);

  return (
    <>
        <LogoTalking />
      <main className="px-4 md:px-12 pt-20">

        <section className=" h-screen  ">
          <textarea
             ref={textareaRef}
            className="dark:bg-gray-950 bg-gray-200 rounded-md w-full border  dark:placeholder-gray-600 border-gray-600 p-8 focus:outline-none resize-none h-[64%] md:h-[70%]"
            placeholder="Comenzar a hablar..."
            value={text}
            onChange={onChange}
            style={{ scrollbarWidth: "none" }}
          ></textarea>
        </section>
      </main>
      <Options setText={setText} text={text} />
    </>
  );
}

export default App;
