import { useEffect, useState } from "react";
import "./HeroSection.css";

const Bubble = () => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const left = Math.random() * 100;
    const size = Math.random() * 10 + 5; // Varying bubble sizes
    const duration = Math.random() * 10 + 15; // Varying durations
    const delay = Math.random() * -15; // Negative delay for a staggered start
    setStyle({
      left: `${left}vw`,
      width: `${size}px`,
      height: `${size}px`,
      animation: `bubbleY ${duration}s ${delay}s infinite linear`,
    });
  }, []);

  return <div className="bubble-y z-10" style={style} />;
};

export default function HeroSection() {
  const bubbleAmount = 250;

  return (
    <section className="hero-section relative overflow-hidden min-h-screen">
      <div
        className="absolute inset-0 z-30"
        style={{
          backgroundImage: "url('/assets/images/waves/wave-2.svg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          transform: "rotate(180deg)",
        }}
      ></div>
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: "url('/assets/images/waves/wave-4.svg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="gradient-container">
        <div className="gradient"></div>
      </div>
      <div className="bubble-container">
        {[...Array(bubbleAmount)].map((_, i) => (
          <Bubble key={i} />
        ))}
      </div>
      <div className="content-container relative z-50 flex h-screen flex-col items-center justify-center text-center text-white">
        <img
          src="/assets/images/logo.svg"
          alt="data-river logo"
          className="mb-8 w-1/6 animate-pulse"
        />
        <h1 className="mb-4 text-4xl font-bold">Ride the Flow of Innovation</h1>
        <p className="mb-8 text-xl">
          data-river: The Open-Source Framework for Visual Programming and
          Automation
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
          <a
            href="#"
            className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Jump In and Explore
          </a>
          <a
            href="https://github.com/yourusername/data-river"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Star Us on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
