import ToggleTheme from "../components/ToggleTheme";
function LogoTalking() {
  return (
    <div className="flex items-center h-16 justify-between px-4 md:px-12 fixed w-full bg-gray-200 dark:bg-gray-950">
      <span></span>
      <div className="flex items-center justify-center">
        <h1 className="bg-clip-text bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent  font-extrabold text-3xl">
          Transcription
        </h1>
      </div>
      <ToggleTheme />
    </div>
    
  );
}

export default LogoTalking;
