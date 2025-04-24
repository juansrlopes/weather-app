import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Hero from "./components/Layout/Hero";
import Weather from "./components/Weather";

const App: React.FC = () => {
  return (
    <main className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Header />
      <Hero />
      <Weather />
      <Footer />
    </main>
  );
};

export default App;
