import { CloudMoon } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-blue-600 py-4 shadow-md">
      <h1 className="flex align-center justify-center text-4xl font-extrabold text-center text-white">
        <CloudMoon size={32} />
        Weather App
      </h1>
    </header>
  );
};

export default Header;
