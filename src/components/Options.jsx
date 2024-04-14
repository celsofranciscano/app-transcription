import { useEffect, useState } from "react";

function Options({ setText, text }) {
  const [isRecording, setRecording] = useState(false);
  const [reconocimientoVoz, setReconocimientoVoz] = useState(null);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    // Verificar si el navegador soporta la API de Reconocimiento de Voz
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();

      recognition.lang = "es-ES"; // Idioma del reconocimiento de voz
      recognition.continuous = true; // Devolver resultados continuos
      recognition.interimResults = true; // Devolver resultados provisionales
      recognition.maxAlternatives = 1; // Número máximo de alternativas por resultado

      // Eventos
      recognition.onaudiostart = function (event) {
        // console.log("Se ha comenzado a capturar audio");
      };

      recognition.onaudioend = function (event) {
        // console.log("Se ha terminado de capturar audio");
      };

      recognition.onend = function (event) {
        setAnimation(false);
        // console.log("Se ha desconectado el servicio de reconocimiento de voz");
      };

      recognition.onerror = function (event) {
        // console.error("Error de reconocimiento de voz:", event.error);
      };

      recognition.onnomatch = function (event) {
        // console.log("No se encontraron coincidencias significativas");
      };

      // DESDE AQUI SE MANDA LA TRANSCRIPCION DEL AUDIO
      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setText(currentTranscript);
      };

      recognition.onsoundstart = function (event) {
        // console.log("Se ha detectado un sonido");
      };

      recognition.onsoundend = function (event) {
        // console.log("Se ha dejado de detectar cualquier sonido");
      };

      recognition.onspeechstart = function (event) {
        // console.log("Se ha detectado inicio de discurso");
      };

      recognition.onspeechend = function (event) {
        // console.log("Se ha detectado fin de discurso");
      };

      recognition.onstart = function (event) {
        setAnimation(true);
        // console.log("Se ha iniciado el reconocimiento de voz");
      };
      // recognition.abort(); // Detener el reconocimiento de voz actual
      // recognition.stop(); // Detener el reconocimiento de voz
      setReconocimientoVoz(recognition);
    } else {
      alert("Su navegador no soporta el Reconocimiento de voz.");
      console.error("El navegador no soporta la API de Reconocimiento de Voz.");
    }
  }, []);

  function clickMicrophone() {
    if (isRecording) {
      reconocimientoVoz.stop();
    } else {
      reconocimientoVoz.start();
    }
    setRecording(!isRecording); // Cambia el estado de grabación al contrario del estado actual
  }

  function clear() {
    // Vaciar el estado y actualizar el localStorage en el mismo efecto
    setText("");
    localStorage.setItem("text", "");
  }
  function copied() {
    document.getElementById("copy").classList.toggle("hidden");
    document.getElementById("copied").classList.toggle("hidden");

    navigator.clipboard.writeText(text);
    console.log(text);

    // Agregar un retraso de 2 segundos antes de ocultar nuevamente el botón "copy"
    setTimeout(() => {
      document.getElementById("copied")?.classList.toggle("hidden");

      document.getElementById("copy")?.classList.toggle("hidden");
    }, 1000);
  }

  return (
    <div className=" h-24 border-t border-gray-500 text-white  fixed bottom-0 w-full flex items-center justify-center">
      <div className=" flex gap-8">
        <button onClick={clear} className="">
          <svg
            className="w-6 h-6 text-gray-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button  onClick={clickMicrophone}
         class="relative flex hover:scale-95">
          <span class={`${animation?'animate-ping':''} absolute inline-flex size-16 rounded-full bg-blue-500 opacity-30`}></span>
          <span class="relative inline-flex rounded-full size-16 bg-blue-500">
      <img className="rounded-full size-16" src="/icon-192x192.png" alt="" />
         
          </span>
        </button>

      

        <button className=" rounded-full ">
          <span id="copy" onClick={copied}>
            <svg
              className="w-6 h-6 text-gray-600 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="hidden" id="copied">
            <svg
              className="w-6 h-6  text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Options;
