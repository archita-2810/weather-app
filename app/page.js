import Navbar from './components/Navbar'
import Hero from './components/Hero';
import WeatherShowcase from './components/weathershowcase';

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Hero />
      </div>
      <div>
        <WeatherShowcase />
      </div>
    </div>
  );
}
