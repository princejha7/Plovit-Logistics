import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import slideOne from "../assets/images/aboutUs/ocean.png"
import slideSecond from "../assets/images/aboutUs/shipp.png"
import slideThree from "../assets/images/aboutUs/domesticc.png"

import {
  ArrowRight,
  Globe,
  Package,
  Users,
  Headphones,
} from "lucide-react";

const slides = [
  {
    id: 1,
    image:slideOne,
    heading: "Delivering Logistics Solutions",
    accent: "with Vitality & Velocity",
    subtext:
      "End-to-end logistics services across the globe, driven by innovation, executed with precision, and powered by a passion to deliver more.",
  },
  {
    id: 2,
    image:slideSecond,
    heading: "Global Freight Services",
    accent: "Fast, Reliable & On Time",
    subtext:
      "Time-critical shipments demand speed and precision. Our freight network spans the globe to deliver your cargo when it matters most.",
  },
  {
    id: 3,
    image:slideThree,
    heading: "Connecting Supply Chains",
    accent: "Across Every Mile",
    subtext:
      "From road freight to warehousing, we provide complete logistics solutions tailored to your business needs.",
  },
];

const features = [
  { icon: Globe, label: "Global Network" },
  { icon: Package, label: "End-to-End Solutions" },
  { icon: Users, label: "Expert Support" },
];

function AnimatedStatValue({ value }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const element = counterRef.current;

    if (!element) return undefined;

    const target = Number.parseInt(value, 10);
    const duration = 1800;

    let frameId;

    const animate = () => {
      const startTime = performance.now();

      const update = (currentTime) => {
        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setCount(Math.floor(target * easedProgress));

        if (progress < 1) {
          frameId = requestAnimationFrame(update);
        } else {
          setCount(target);
        }
      };

      frameId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [value]);

  return <span ref={counterRef}>{count}+</span>;
}

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const [animatedHeading, setAnimatedHeading] = useState("");
  const [animatedAccent, setAnimatedAccent] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const navigate = useNavigate();

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 10000);

    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  useEffect(() => {
    let headingTimer;
    let accentTimer;
    let descriptionTimer;
    let actionsTimer;

    let headingIndex = 0;
    let accentIndex = 0;

    setAnimatedHeading("");
    setAnimatedAccent("");
    setShowDescription(false);
    setShowActions(false);

    headingTimer = setInterval(() => {
      headingIndex += 1;

      setAnimatedHeading(
        slide.heading.slice(0, headingIndex)
      );

      if (headingIndex >= slide.heading.length) {
        clearInterval(headingTimer);

        accentTimer = setInterval(() => {
          accentIndex += 1;

          setAnimatedAccent(
            slide.accent.slice(0, accentIndex)
          );

          if (accentIndex >= slide.accent.length) {
            clearInterval(accentTimer);

            descriptionTimer = setTimeout(
              () => setShowDescription(true),
              120
            );

            actionsTimer = setTimeout(
              () => setShowActions(true),
              380
            );
          }
        }, 28);
      }
    }, 28);

    return () => {
      clearInterval(headingTimer);
      clearInterval(accentTimer);
      clearTimeout(descriptionTimer);
      clearTimeout(actionsTimer);
    };
  }, [slide]);

  const scrollToConnect = () => {
    const el = document.getElementById("lets-connect");

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/contact-us");
    }
  };

  return (
    <section
      className="relative pt-16 pb-5 md:pt-20"
      aria-label="Hero Section"
    >
      {/* Main Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[75vh] py-10 md:py-14">

          {/* =========================
              Left Content
          ========================== */}

          <div
            className="
              space-y-6
              z-10

              /* IMPORTANT:
                 Reserve space on mobile so
                 slide changes don't move
                 the image or sections below.
              */
              min-h-[430px]
              sm:min-h-[400px]
              md:min-h-[410px]
              lg:min-h-0
            "
          >
            <div
              className="
                min-h-[145px]
                sm:min-h-[140px]
                md:min-h-[150px]
                xl:min-h-[165px]
              "
            >
              <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-black text-brand-blue leading-tight">
                {animatedHeading}
              </h1>

              <h2 className="text-4xl md:text-5xl xl:text-[3.5rem] font-black text-brand-orange leading-tight">
                {animatedAccent}
              </h2>
            </div>

            <div className="w-10 h-0.5 bg-brand-orange" />

            {/* Description */}
            <div className="min-h-[100px]">
              <p
                className={`text-gray-500 text-base md:text-lg leading-relaxed max-w-md transition-all duration-500 ${
                  showDescription
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {slide.subtext}
              </p>
            </div>

            {/* Buttons */}
            <div
              className={`flex flex-wrap gap-4 min-h-[42px] transition-all duration-500 ${
                showActions
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              <button
                onClick={() => navigate("/our-services")}
                className="btn-primary rounded-sm bg-brand-blue hover:outline-brand-blue hover:outline hover:outline-2 hover:bg-white hover:text-brand-blue transition-colors duration-200"
                aria-label="Explore Services"
              >
                OUR SERVICES
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => navigate("/contact-us")}
                className="btn-outline hover:bg-brand-orange rounded-sm hover:text-white transition-colors duration-200"
                aria-label="Get a Quote"
              >
                GET A QUOTE
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Feature Pills */}
            <div
              className={`flex flex-wrap gap-4 pt-1 transition-all duration-500 ${
                showActions
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <Icon
                      size={13}
                      className="text-brand-blue"
                    />
                  </div>

                  <span className="font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =========================
              Right Image Carousel
          ========================== */}

          <div
            className="
              relative
              h-72
              sm:h-80
              md:h-96
              lg:h-[520px]
              rounded-2xl
              overflow-hidden
              shadow-2xl
            "
          >
            {slides.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt={s.heading}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === current
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent" />

            {/* Let's Connect Float */}
            <button
              onClick={scrollToConnect}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-brand-blue text-white flex flex-col items-center gap-1.5 px-2.5 py-4 text-[10px] hover:bg-brand-orange font-bold tracking-wide hover:bg-brand-blue-mid transition-colors duration-200 rounded-l-lg shadow-lg"
              aria-label="Let us Connect"
            >
              <Headphones size={16} />

              <span
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {"Let's Connect"}
              </span>
            </button>

            {/* Slide Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2 bg-brand-orange"
                      : "w-2 h-2 bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}