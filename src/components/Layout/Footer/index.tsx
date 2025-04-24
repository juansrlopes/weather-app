const Footer = () => {
  return (
    <footer className="sticky z-1 bottom-0 w-full bg-gray-100">
      <div className="p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-black">
          © 2025{" - "}This site uses{" "}
          <a
            href="https://openweathermap.org/"
            className="hover:underline text-black"
            target="_blank"
          >
            Open Weather Map
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
