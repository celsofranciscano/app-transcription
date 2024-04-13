import ToggleTheme from "../components/ToggleTheme";
function LogoTalking() {
  return (
    <div className="flex items-center justify-between px-4 md:px-12 fixed w-full bg-gray-200 dark:bg-gray-950">
      <span></span>
      <div className="flex items-center   h-16 justify-center ">
        <div className="animationTalking bg-blue-600 w-1.5 h-1.5 rounded-md mx-1"></div>
        <div className="animationTalking bg-blue-600 w-1.5 h-1.5 rounded-md mx-1"></div>
        <div className="animationTalking bg-blue-600 w-1.5 h-1.5 rounded-md mx-1"></div>
        <div className="animationTalking bg-blue-600 w-1.5 h-1.5 rounded-md mx-1"></div>
        <h1 className="bg-clip-text bg-gradient-to-tr from-blue-600 to-red-600 text-transparent  font-bold text-3xl">
          Transcription
        </h1>
      </div>
        <ToggleTheme />
    </div>
  );
}

export default LogoTalking;
