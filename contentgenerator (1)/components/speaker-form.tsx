"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Trash2, ImagePlus, Youtube, Volume2, Bluetooth, Zap, Music, Radio, Mic } from "lucide-react"
import ThemeSelector from "@/components/theme-selector"
import { Slider } from "@/components/ui/slider"
// Primero, importar el componente DynamicElementAdder y sus tipos
import DynamicElementAdder, { type DynamicElement, generateElementsHTML } from "@/components/dynamic-element-adder"

// Temas predefinidos para speakers relacionados con música
const speakerThemes = {
  rock: {
    name: "Rock",
    backgroundColor: "#18181b",
    cardBackgroundColor: "#27272a",
    textColor: "#f4f4f5",
    accentColor: "#ef4444",
    highlightColor: "#f59e0b",
    borderColor: "#3f3f46",
    waveColor: "#ef4444",
    equalizerColor: "#f59e0b",
  },
  jazz: {
    name: "Jazz",
    backgroundColor: "#1e1b4b",
    cardBackgroundColor: "#312e81",
    textColor: "#e0e7ff",
    accentColor: "#8b5cf6",
    highlightColor: "#f59e0b",
    borderColor: "#4338ca",
    waveColor: "#8b5cf6",
    equalizerColor: "#f59e0b",
  },
  electronic: {
    name: "Electrónica",
    backgroundColor: "#0f172a",
    cardBackgroundColor: "#1e293b",
    textColor: "#e2e8f0",
    accentColor: "#06b6d4",
    highlightColor: "#3b82f6",
    borderColor: "#334155",
    waveColor: "#06b6d4",
    equalizerColor: "#3b82f6",
  },
  classical: {
    name: "Clásica",
    backgroundColor: "#292524",
    cardBackgroundColor: "#44403c",
    textColor: "#f5f5f4",
    accentColor: "#a8a29e",
    highlightColor: "#d6d3d1",
    borderColor: "#57534e",
    waveColor: "#a8a29e",
    equalizerColor: "#d6d3d1",
  },
  hiphop: {
    name: "Hip Hop",
    backgroundColor: "#0c0a09",
    cardBackgroundColor: "#1c1917",
    textColor: "#f5f5f4",
    accentColor: "#eab308",
    highlightColor: "#a16207",
    borderColor: "#292524",
    waveColor: "#eab308",
    equalizerColor: "#a16207",
  },
  pop: {
    name: "Pop",
    backgroundColor: "#701a75",
    cardBackgroundColor: "#86198f",
    textColor: "#fae8ff",
    accentColor: "#ec4899",
    highlightColor: "#d946ef",
    borderColor: "#a21caf",
    waveColor: "#ec4899",
    equalizerColor: "#d946ef",
  },
}

// Iconos predefinidos para características
const featureIcons = [
  { name: "Volumen", icon: <Volume2 className="h-5 w-5" /> },
  { name: "Bluetooth", icon: <Bluetooth className="h-5 w-5" /> },
  { name: "Potencia", icon: <Zap className="h-5 w-5" /> },
  { name: "Música", icon: <Music className="h-5 w-5" /> },
  { name: "Radio", icon: <Radio className="h-5 w-5" /> },
  { name: "Micrófono", icon: <Mic className="h-5 w-5" /> },
]

interface SpeakerFormProps {
  onGenerate: (code: string) => void
}

interface Feature {
  id: string
  icon: string
  title: string
  description: string
}

interface GalleryItem {
  id: string
  type: "image" | "video"
  url: string
  caption: string
}

export default function SpeakerForm({ onGenerate }: SpeakerFormProps) {
  const [formData, setFormData] = useState({
    speakerName: "",
    speakerTagline: "",
    speakerDescription: "",
    mainImage: "",
    logoImage: "",
    heroVideo: "",
    price: "",
    ctaText: "Comprar ahora",
    ctaLink: "#",
    backgroundColor: "#18181b",
    cardBackgroundColor: "#27272a",
    textColor: "#f4f4f5",
    accentColor: "#ef4444",
    highlightColor: "#f59e0b",
    borderColor: "#3f3f46",
    waveColor: "#ef4444",
    equalizerColor: "#f59e0b",
    selectedTheme: "rock",
    showHeroSection: true,
    showFeaturesSection: true,
    showGallerySection: true,
    showSpecsSection: true,
    showPriceSection: true,
    showWaveAnimation: true,
    showEqualizer: true,
    showAnimations: true,
    waveDensity: 5,
    equalizerBars: 8,
  })

  // Agregar estado para elementos dinámicos
  const [dynamicElements, setDynamicElements] = useState<DynamicElement[]>([])

  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "feature-1",
      icon: "volumen",
      title: "Sonido de alta fidelidad",
      description: "Disfruta de un audio cristalino con graves profundos",
    },
    {
      id: "feature-2",
      icon: "bluetooth",
      title: "Conectividad Bluetooth 5.0",
      description: "Conexión estable hasta 10 metros de distancia",
    },
    {
      id: "feature-3",
      icon: "potencia",
      title: "Batería de larga duración",
      description: "Hasta 20 horas de reproducción continua",
    },
  ])

  const [gallery, setGallery] = useState<GalleryItem[]>([
    {
      id: "gallery-1",
      type: "image",
      url: "",
      caption: "Vista frontal",
    },
  ])

  const [specs, setSpecs] = useState<{ id: string; name: string; value: string }[]>([
    { id: "spec-1", name: "Potencia", value: "30W RMS" },
    { id: "spec-2", name: "Respuesta de frecuencia", value: "20Hz - 20kHz" },
    { id: "spec-3", name: "Conectividad", value: "Bluetooth 5.0, AUX, USB" },
    { id: "spec-4", name: "Batería", value: "5000mAh" },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }))
  }

  const handleSliderChange = (id: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [id]: value[0] }))
  }

  const handleThemeChange = (theme: string) => {
    const selectedTheme = speakerThemes[theme as keyof typeof speakerThemes]
    setFormData((prev) => ({
      ...prev,
      selectedTheme: theme,
      backgroundColor: selectedTheme.backgroundColor,
      cardBackgroundColor: selectedTheme.cardBackgroundColor,
      textColor: selectedTheme.textColor,
      accentColor: selectedTheme.accentColor,
      highlightColor: selectedTheme.highlightColor,
      borderColor: selectedTheme.borderColor,
      waveColor: selectedTheme.waveColor,
      equalizerColor: selectedTheme.equalizerColor,
    }))
  }

  // Funciones para manejar características
  const addFeature = () => {
    const newId = `feature-${features.length + 1}-${Date.now()}`
    setFeatures([
      ...features,
      {
        id: newId,
        icon: "volumen",
        title: "Nueva característica",
        description: "Descripción de la característica",
      },
    ])
  }

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    setFeatures(features.map((feature) => (feature.id === id ? { ...feature, [field]: value } : feature)))
  }

  const removeFeature = (id: string) => {
    setFeatures(features.filter((feature) => feature.id !== id))
  }

  // Funciones para manejar galería
  const addGalleryItem = (type: "image" | "video") => {
    const newId = `gallery-${gallery.length + 1}-${Date.now()}`
    setGallery([
      ...gallery,
      {
        id: newId,
        type,
        url: "",
        caption: type === "image" ? "Nueva imagen" : "Nuevo video",
      },
    ])
  }

  const updateGalleryItem = (id: string, field: keyof GalleryItem, value: string) => {
    setGallery(gallery.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeGalleryItem = (id: string) => {
    setGallery(gallery.filter((item) => item.id !== id))
  }

  // Funciones para manejar especificaciones
  const addSpec = () => {
    const newId = `spec-${specs.length + 1}-${Date.now()}`
    setSpecs([...specs, { id: newId, name: "Nueva especificación", value: "Valor" }])
  }

  const updateSpec = (id: string, field: "name" | "value", value: string) => {
    setSpecs(specs.map((spec) => (spec.id === id ? { ...spec, [field]: value } : spec)))
  }

  const removeSpec = (id: string) => {
    setSpecs(specs.filter((spec) => spec.id !== id))
  }

  // Modificar la función generateSpeaker para incluir los elementos dinámicos
  const generateSpeaker = () => {
    // Funciones para generar las ondas y el ecualizador
    const generateWaves = () => {
      let wavesHTML = ""
      for (let i = 0; i < formData.waveDensity; i++) {
        wavesHTML += `<div class="wave" style="animation-delay: ${i * 0.1}s;"></div>`
      }
      return wavesHTML
    }

    const generateEqualizer = () => {
      let equalizerHTML = ""
      for (let i = 0; i < formData.equalizerBars; i++) {
        equalizerHTML += `<div class="equalizer-bar" style="animation-delay: ${i * 0.2}s;"></div>`
      }
      return equalizerHTML
    }

    const {
      speakerName,
      speakerTagline,
      speakerDescription,
      mainImage,
      logoImage,
      heroVideo,
      price,
      ctaText,
      ctaLink,
      backgroundColor,
      cardBackgroundColor,
      textColor,
      accentColor,
      highlightColor,
      borderColor,
      waveColor,
      equalizerColor,
      showHeroSection,
      showFeaturesSection,
      showGallerySection,
      showSpecsSection,
      showPriceSection,
      showWaveAnimation,
      showEqualizer,
      showAnimations,
      waveDensity,
      equalizerBars,
    } = formData

    // Generar el HTML de los elementos dinámicos
    const dynamicElementsHTML = generateElementsHTML(dynamicElements, textColor, accentColor)

    const speakerHtml = `
      <style>
        .speaker-container {
          font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
          width: 100%;
          margin: 0 auto;
          background-color: ${backgroundColor};
          color: ${textColor};
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          position: relative;
          box-sizing: border-box;
        }

        .speaker-section {
          padding: 60px 40px;
          position: relative;
        }

        .speaker-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 80px 40px;
          background: linear-gradient(135deg, ${backgroundColor}, ${cardBackgroundColor});
          position: relative;
          overflow: hidden;
          min-height: 600px;
        }

        /* Ondas de sonido */
        ${
          showWaveAnimation
            ? `
        .sound-waves {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 5px;
          z-index: 1;
          padding: 0 20px;
        }

        .wave {
          width: 8px;
          background: ${waveColor};
          border-radius: 4px;
          opacity: 0.7;
          ${
            showAnimations
              ? `
          animation: wave-animation 1.5s infinite ease-in-out alternate;
          `
              : ""
          }
        }

        @keyframes wave-animation {
          0% { height: 10px; }
          100% { height: 80px; }
        }
        `
            : ""
        }

        /* Ecualizador */
        ${
          showEqualizer
            ? `
        .equalizer {
          position: absolute;
          top: 20%;
          right: 10%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 3px;
          z-index: 1;
          width: 120px;
          height: 100px;
        }

        .equalizer-bar {
          flex: 1;
          background: linear-gradient(to top, ${equalizerColor}, ${highlightColor});
          border-radius: 2px;
          ${
            showAnimations
              ? `
          animation: equalizer-animation 1s infinite ease-in-out alternate;
          `
              : ""
          }
        }

        @keyframes equalizer-animation {
          0% { height: 10px; }
          100% { height: 100%; }
        }
        `
            : ""
        }

        .speaker-content {
          position: relative;
          z-index: 3;
          width: 100%;
        }

        .speaker-logo {
          max-width: 180px;
          margin-bottom: 30px;
          ${showAnimations ? "animation: fadeIn 1s ease-out;" : ""}
        }

        .speaker-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 15px;
          background: linear-gradient(to right, ${textColor}, ${accentColor});
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          ${showAnimations ? "animation: slideUp 0.8s ease-out;" : ""}
        }

        .speaker-tagline {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 30px;
          opacity: 0.9;
          ${showAnimations ? "animation: slideUp 1s ease-out;" : ""}
        }

        .speaker-description {
          max-width: 700px;
          margin: 0 auto 40px;
          line-height: 1.6;
          font-size: 1.1rem;
          opacity: 0.8;
          ${showAnimations ? "animation: fadeIn 1.2s ease-out;" : ""}
        }

        .speaker-main-image {
          max-width: 100%;
          height: auto;
          margin: 20px 0;
          border-radius: 10px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          ${showAnimations ? "animation: pulseSpeaker 3s ease-in-out infinite;" : ""}
          position: relative;
          z-index: 4;
        }

        @keyframes pulseSpeaker {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        .speaker-video-container {
          width: 100%;
          max-width: 800px;
          margin: 40px auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          ${showAnimations ? "animation: scaleIn 1.2s ease-out;" : ""}
          position: relative;
          z-index: 4;
        }

        .speaker-video {
          width: 100%;
          height: 450px;
          border: none;
        }

        .speaker-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          padding: 60px 40px;
          background-color: ${cardBackgroundColor};
          position: relative;
          z-index: 5;
        }

        .feature-card {
          background: linear-gradient(145deg, ${backgroundColor}80, ${cardBackgroundColor});
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid ${borderColor};
          transition: all 0.3s ease;
          ${showAnimations ? "animation: fadeInUp 0.8s ease-out;" : ""}
          animation-fill-mode: both;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          border-color: ${accentColor}80;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background-color: ${accentColor};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 24px;
          color: ${backgroundColor};
          box-shadow: 0 10px 20px ${accentColor}40;
        }

        .feature-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: ${accentColor};
        }

        .feature-description {
          font-size: 1rem;
          line-height: 1.6;
          opacity: 0.8;
        }

        .speaker-gallery {
          padding: 60px 40px;
          background: linear-gradient(135deg, ${backgroundColor}, ${cardBackgroundColor}80);
          position: relative;
          z-index: 5;
        }

        .gallery-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 40px;
          text-align: center;
          color: ${accentColor};
          ${showAnimations ? "animation: fadeIn 0.8s ease-out;" : ""}
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          ${showAnimations ? "animation: fadeIn 1s ease-out;" : ""}
          animation-fill-mode: both;
        }

        .gallery-item:hover {
          transform: scale(1.03);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .gallery-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .gallery-video {
          width: 100%;
          height: 200px;
          border: none;
        }

        .gallery-caption {
          padding: 15px;
          background-color: ${cardBackgroundColor};
          font-size: 0.9rem;
          text-align: center;
        }

        .speaker-specs {
          padding: 60px 40px;
          background-color: ${backgroundColor};
          position: relative;
          z-index: 5;
        }

        .specs-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 40px;
          text-align: center;
          color: ${accentColor};
          ${showAnimations ? "animation: fadeIn 0.8s ease-out;" : ""}
        }

        .specs-table {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          border-collapse: collapse;
          ${showAnimations ? "animation: fadeIn 1s ease-out;" : ""}
        }

        .specs-table tr {
          border-bottom: 1px solid ${borderColor};
          transition: all 0.3s ease;
        }

        .specs-table tr:hover {
          background-color: ${cardBackgroundColor}50;
        }

        .specs-table th,
        .specs-table td {
          padding: 15px 20px;
          text-align: left;
        }

        .specs-table th {
          font-weight: 600;
          color: ${accentColor};
          width: 40%;
        }

        .speaker-price {
          padding: 80px 40px;
          text-align: center;
          background: linear-gradient(135deg, ${backgroundColor}, ${cardBackgroundColor});
          position: relative;
          z-index: 5;
        }

        .price-tag {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 30px;
          color: ${textColor};
          ${showAnimations ? "animation: pulseScale 2s infinite;" : ""}
        }

        .price-currency {
          font-size: 2rem;
          vertical-align: super;
          margin-right: 5px;
          opacity: 0.8;
        }

        .cta-button {
          display: inline-block;
          padding: 15px 40px;
          background: linear-gradient(to right, ${accentColor}, ${highlightColor});
          color: ${textColor};
          font-size: 1.2rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 50px;
          box-shadow: 0 10px 30px ${accentColor}40;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          ${showAnimations ? "animation: pulseLight 2s infinite;" : ""}
        }

        .cta-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px ${accentColor}60;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulseScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes pulseLight {
          0% { box-shadow: 0 10px 30px ${accentColor}40; }
          50% { box-shadow: 0 10px 30px ${accentColor}70; }
          100% { box-shadow: 0 10px 30px ${accentColor}40; }
        }

        @media (max-width: 768px) {
          .speaker-section {
            padding: 40px 20px;
          }

          .speaker-hero {
            padding: 60px 20px;
          }

          .speaker-title {
            font-size: 2.5rem;
          }

          .speaker-tagline {
            font-size: 1.2rem;
          }

          .speaker-video {
            height: 300px;
          }

          .feature-card {
            padding: 20px;
          }

          .price-tag {
            font-size: 2.5rem;
          }

          .equalizer {
            top: 10%;
            right: 5%;
            width: 80px;
          }
        }

        @media (max-width: 480px) {
          .speaker-title {
            font-size: 1.8rem;
          }
          
          .speaker-tagline {
            font-size: 1rem;
          }
          
          .speaker-description {
            font-size: 0.9rem;
          }
          
          .speaker-section {
            padding: 30px 15px;
          }
          
          .feature-card {
            padding: 15px;
          }
          
          .feature-icon {
            width: 50px;
            height: 50px;
          }
          
          .feature-title {
            font-size: 1.2rem;
          }
          
          .specs-table th, .specs-table td {
            padding: 10px;
            font-size: 0.9rem;
          }
          
          .sound-waves {
            height: 60px;
          }
          
          .equalizer {
            width: 80px;
            height: 80px;
          }

          .speaker-title {
            font-size: 2rem;
          }

          .speaker-video {
            height: 200px;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .equalizer {
            display: none;
          }
        }

        /* Mejoras de responsividad */
        * {
          box-sizing: border-box;
        }

        img {
          max-width: 100%;
          height: auto;
        }
      </style>

      <div class="speaker-container">
        ${
          showHeroSection
            ? `
        <section class="speaker-hero">
          ${
            showEqualizer
              ? `
          <div class="equalizer">
            ${generateEqualizer()}
          </div>
          `
              : ""
          }
          
          ${
            showWaveAnimation
              ? `
          <div class="sound-waves">
            ${generateWaves()}
          </div>
          `
              : ""
          }
          
          <div class="speaker-content">
            ${logoImage ? `<img src="${logoImage}" alt="Logo" class="speaker-logo">` : ""}
            <h1 class="speaker-title">${speakerName}</h1>
            <p class="speaker-tagline">${speakerTagline}</p>
            <p class="speaker-description">${speakerDescription}</p>
            ${mainImage ? `<img src="${mainImage}" alt="${speakerName}" class="speaker-main-image">` : ""}
            ${
              heroVideo
                ? `
            <div class="speaker-video-container">
              <iframe class="speaker-video" src="https://www.youtube.com/embed/${heroVideo}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            `
                : ""
            }
          </div>
        </section>
        `
            : ""
        }

        ${
          showFeaturesSection && features.length > 0
            ? `
        <section class="speaker-features">
          ${features
            .map(
              (feature, index) => `
          <div class="feature-card" style="${showAnimations ? `animation-delay: ${index * 0.1}s;` : ""}">
            <div class="feature-icon">${feature.icon}</div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
          </div>
          `,
            )
            .join("")}
        </section>
        `
            : ""
        }

        ${
          showGallerySection && gallery.length > 0
            ? `
        <section class="speaker-gallery">
          <h2 class="gallery-title">Galería</h2>
          <div class="gallery-grid">
            ${gallery
              .map(
                (item, index) => `
            <div class="gallery-item" style="${showAnimations ? `animation-delay: ${index * 0.1}s;` : ""}">
              ${
                item.type === "image"
                  ? `<img src="${item.url}" alt="${item.caption}" class="gallery-image">`
                  : `<iframe class="gallery-video" src="https://www.youtube.com/embed/${item.url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
              }
              <div class="gallery-caption">${item.caption}</div>
            </div>
            `,
              )
              .join("")}
          </div>
        </section>
        `
            : ""
        }

        ${
          showSpecsSection && specs.length > 0
            ? `
        <section class="speaker-specs">
          <h2 class="specs-title">Especificaciones</h2>
          <table class="specs-table">
            <tbody>
              ${specs
                .map(
                  (spec) => `
              <tr>
                <th>${spec.name}</th>
                <td>${spec.value}</td>
              </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </section>
        `
            : ""
        }

        ${
          showPriceSection && price
            ? `
        <section class="speaker-price">
          <div class="price-tag">
            <span class="price-currency">$</span>${price}
          </div>
          <a href="${ctaLink}" class="cta-button">${ctaText}</a>
        </section>
        `
            : ""
        }
        ${dynamicElementsHTML}
      </div>
    `

    onGenerate(speakerHtml)
  }

  return (
    <div className="space-y-6 skeuomorphic-section p-6">
      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 text-blue-300">Seleccionar Tema Musical</h3>
          <ThemeSelector
            themes={speakerThemes}
            selectedTheme={formData.selectedTheme}
            onThemeChange={handleThemeChange}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6 skeuomorphic-tabs">
          <TabsTrigger value="basic" className="skeuomorphic-tab">
            Información Básica
          </TabsTrigger>
          <TabsTrigger value="features" className="skeuomorphic-tab">
            Características
          </TabsTrigger>
          <TabsTrigger value="gallery" className="skeuomorphic-tab">
            Galería
          </TabsTrigger>
          <TabsTrigger value="specs" className="skeuomorphic-tab">
            Especificaciones
          </TabsTrigger>
          <TabsTrigger value="settings" className="skeuomorphic-tab">
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="skeuomorphic-card">
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="speakerName" className="text-blue-300 font-medium">
                  Nombre del Speaker
                </Label>
                <Input
                  id="speakerName"
                  placeholder="Ej: SoundBlast Pro"
                  value={formData.speakerName}
                  onChange={handleChange}
                  className="skeuomorphic-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="speakerTagline" className="text-blue-300 font-medium">
                  Eslogan
                </Label>
                <Input
                  id="speakerTagline"
                  placeholder="Ej: Sonido que transforma tu experiencia"
                  value={formData.speakerTagline}
                  onChange={handleChange}
                  className="skeuomorphic-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="speakerDescription" className="text-blue-300 font-medium">
                  Descripción
                </Label>
                <Textarea
                  id="speakerDescription"
                  placeholder="Descripción detallada del speaker"
                  value={formData.speakerDescription}
                  onChange={handleChange}
                  rows={4}
                  className="skeuomorphic-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mainImage" className="text-blue-300 font-medium">
                  URL de la imagen principal
                </Label>
                <Input
                  id="mainImage"
                  placeholder="https://ejemplo.com/speaker.jpg"
                  value={formData.mainImage}
                  onChange={handleChange}
                  className="skeuomorphic-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="logoImage" className="text-blue-300 font-medium">
                  URL del logo (opcional)
                </Label>
                <Input
                  id="logoImage"
                  placeholder="https://ejemplo.com/logo.png"
                  value={formData.logoImage}
                  onChange={handleChange}
                  className="skeuomorphic-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="heroVideo" className="text-blue-300 font-medium">
                  ID del video de YouTube (opcional)
                </Label>
                <Input
                  id="heroVideo"
                  placeholder="Ej: dQw4w9WgXcQ"
                  value={formData.heroVideo}
                  onChange={handleChange}
                  className="skeuomorphic-input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price" className="text-blue-300 font-medium">
                    Precio
                  </Label>
                  <Input
                    id="price"
                    placeholder="Ej: 199.99"
                    value={formData.price}
                    onChange={handleChange}
                    className="skeuomorphic-input"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="ctaText" className="text-blue-300 font-medium">
                    Texto del botón de acción
                  </Label>
                  <Input
                    id="ctaText"
                    placeholder="Ej: Comprar ahora"
                    value={formData.ctaText}
                    onChange={handleChange}
                    className="skeuomorphic-input"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ctaLink" className="text-blue-300 font-medium">
                  Enlace del botón de acción
                </Label>
                <Input
                  id="ctaLink"
                  placeholder="Ej: https://tienda.com/comprar"
                  value={formData.ctaLink}
                  onChange={handleChange}
                  className="skeuomorphic-input"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-blue-300">Características</h3>
                <Button onClick={addFeature} className="skeuomorphic-button-secondary flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Agregar
                </Button>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={feature.id} className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-md font-medium text-blue-300">Característica {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(feature.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label className="text-blue-300">Icono</Label>
                        <select
                          value={feature.icon}
                          onChange={(e) => updateFeature(feature.id, "icon", e.target.value)}
                          className="skeuomorphic-input"
                        >
                          {featureIcons.map((icon) => (
                            <option key={icon.name} value={icon.name.toLowerCase()}>
                              {icon.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-blue-300">Título</Label>
                        <Input
                          value={feature.title}
                          onChange={(e) => updateFeature(feature.id, "title", e.target.value)}
                          className="skeuomorphic-input"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-blue-300">Descripción</Label>
                        <Input
                          value={feature.description}
                          onChange={(e) => updateFeature(feature.id, "description", e.target.value)}
                          className="skeuomorphic-input"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {features.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No hay características. Haz clic en "Agregar" para crear una.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-blue-300">Galería</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => addGalleryItem("image")}
                    className="skeuomorphic-button-secondary flex items-center gap-2"
                  >
                    <ImagePlus className="h-4 w-4" />
                    Agregar Imagen
                  </Button>
                  <Button
                    onClick={() => addGalleryItem("video")}
                    className="skeuomorphic-button-secondary flex items-center gap-2"
                  >
                    <Youtube className="h-4 w-4" />
                    Agregar Video
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {gallery.map((item, index) => (
                  <div key={item.id} className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-md font-medium text-blue-300">
                        {item.type === "image" ? "Imagen" : "Video"} {index + 1}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeGalleryItem(item.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label className="text-blue-300">
                          {item.type === "image" ? "URL de la imagen" : "ID del video de YouTube"}
                        </Label>
                        <Input
                          value={item.url}
                          onChange={(e) => updateGalleryItem(item.id, "url", e.target.value)}
                          placeholder={item.type === "image" ? "https://ejemplo.com/imagen.jpg" : "dQw4w9WgXcQ"}
                          className="skeuomorphic-input"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-blue-300">Título/Descripción</Label>
                        <Input
                          value={item.caption}
                          onChange={(e) => updateGalleryItem(item.id, "caption", e.target.value)}
                          className="skeuomorphic-input"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {gallery.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No hay elementos en la galería. Haz clic en "Agregar Imagen" o "Agregar Video" para crear uno.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs" className="space-y-6">
          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-blue-300">Especificaciones Técnicas</h3>
                <Button onClick={addSpec} className="skeuomorphic-button-secondary flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Agregar
                </Button>
              </div>

              <div className="space-y-4">
                {specs.map((spec, index) => (
                  <div key={spec.id} className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-md font-medium text-blue-300">Especificación {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpec(spec.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label className="text-blue-300">Nombre</Label>
                        <Input
                          value={spec.name}
                          onChange={(e) => updateSpec(spec.id, "name", e.target.value)}
                          className="skeuomorphic-input"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-blue-300">Valor</Label>
                        <Input
                          value={spec.value}
                          onChange={(e) => updateSpec(spec.id, "value", e.target.value)}
                          className="skeuomorphic-input"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 text-blue-300">Elementos Musicales</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showWaveAnimation" className="text-blue-300 font-medium">
                      Mostrar Ondas de Sonido
                    </Label>
                    <p className="text-sm text-muted-foreground">Añade ondas de sonido animadas en la parte inferior</p>
                  </div>
                  <Switch
                    id="showWaveAnimation"
                    checked={formData.showWaveAnimation}
                    onCheckedChange={(checked) => handleSwitchChange("showWaveAnimation", checked)}
                  />
                </div>

                {formData.showWaveAnimation && (
                  <div className="pl-6 border-l border-gray-700 mt-2">
                    <Label htmlFor="waveDensity" className="text-blue-300 font-medium">
                      Densidad de ondas: {formData.waveDensity}
                    </Label>
                    <Slider
                      id="waveDensity"
                      min={3}
                      max={15}
                      step={1}
                      value={[formData.waveDensity]}
                      onValueChange={(value) => handleSliderChange("waveDensity", value)}
                      className="mt-2"
                    />
                  </div>
                )}

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showEqualizer" className="text-blue-300 font-medium">
                      Mostrar Ecualizador
                    </Label>
                    <p className="text-sm text-muted-foreground">Añade un ecualizador gráfico animado</p>
                  </div>
                  <Switch
                    id="showEqualizer"
                    checked={formData.showEqualizer}
                    onCheckedChange={(checked) => handleSwitchChange("showEqualizer", checked)}
                  />
                </div>

                {formData.showEqualizer && (
                  <div className="pl-6 border-l border-gray-700 mt-2">
                    <Label htmlFor="equalizerBars" className="text-blue-300 font-medium">
                      Número de barras: {formData.equalizerBars}
                    </Label>
                    <Slider
                      id="equalizerBars"
                      min={3}
                      max={12}
                      step={1}
                      value={[formData.equalizerBars]}
                      onValueChange={(value) => handleSliderChange("equalizerBars", value)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 text-blue-300">Personalización de Colores</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="backgroundColor" className="text-blue-300 font-medium">
                    Color de fondo
                  </Label>
                  <div className="color-input-wrapper">
                    <input
                      id="backgroundColor"
                      type="color"
                      value={formData.backgroundColor}
                      onChange={handleChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: formData.backgroundColor }}>
                      {formData.backgroundColor}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cardBackgroundColor" className="text-blue-300 font-medium">
                    Color de fondo de tarjetas
                  </Label>
                  <div className="color-input-wrapper">
                    <input
                      id="cardBackgroundColor"
                      type="color"
                      value={formData.cardBackgroundColor}
                      onChange={handleChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: formData.cardBackgroundColor }}>
                      {formData.cardBackgroundColor}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="textColor" className="text-blue-300 font-medium">
                    Color de texto
                  </Label>
                  <div className="color-input-wrapper">
                    <input
                      id="textColor"
                      type="color"
                      value={formData.textColor}
                      onChange={handleChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: formData.textColor }}>
                      {formData.textColor}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accentColor" className="text-blue-300 font-medium">
                    Color de acento
                  </Label>
                  <div className="color-input-wrapper">
                    <input
                      id="accentColor"
                      type="color"
                      value={formData.accentColor}
                      onChange={handleChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: formData.accentColor }}>
                      {formData.accentColor}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="waveColor" className="text-blue-300 font-medium">
                    Color de ondas de sonido
                  </Label>
                  <div className="color-input-wrapper">
                    <input
                      id="waveColor"
                      type="color"
                      value={formData.waveColor}
                      onChange={handleChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: formData.waveColor }}>
                      {formData.waveColor}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="equalizerColor" className="text-blue-300 font-medium">
                    Color del ecualizador
                  </Label>
                  <div className="color-input-wrapper">
                    <input
                      id="equalizerColor"
                      type="color"
                      value={formData.equalizerColor}
                      onChange={handleChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: formData.equalizerColor }}>
                      {formData.equalizerColor}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="highlightColor" className="text-blue-300 font-medium">
                    Color de resaltado
                  </Label>
                  <div className="color-input-wrapper">
                    <input
                      id="highlightColor"
                      type="color"
                      value={formData.highlightColor}
                      onChange={handleChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: formData.highlightColor }}>
                      {formData.highlightColor}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="borderColor" className="text-blue-300 font-medium">
                    Color de borde
                  </Label>
                  <div className="color-input-wrapper">
                    <input
                      id="borderColor"
                      type="color"
                      value={formData.borderColor}
                      onChange={handleChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: formData.borderColor }}>
                      {formData.borderColor}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 text-blue-300">Secciones a Mostrar</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showHeroSection" className="text-blue-300 font-medium">
                      Sección Hero
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Muestra la sección principal con título, descripción e imagen
                    </p>
                  </div>
                  <Switch
                    id="showHeroSection"
                    checked={formData.showHeroSection}
                    onCheckedChange={(checked) => handleSwitchChange("showHeroSection", checked)}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showFeaturesSection" className="text-blue-300 font-medium">
                      Sección de Características
                    </Label>
                    <p className="text-sm text-muted-foreground">Muestra las características del speaker</p>
                  </div>
                  <Switch
                    id="showFeaturesSection"
                    checked={formData.showFeaturesSection}
                    onCheckedChange={(checked) => handleSwitchChange("showFeaturesSection", checked)}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showGallerySection" className="text-blue-300 font-medium">
                      Sección de Galería
                    </Label>
                    <p className="text-sm text-muted-foreground">Muestra la galería de imágenes y videos</p>
                  </div>
                  <Switch
                    id="showGallerySection"
                    checked={formData.showGallerySection}
                    onCheckedChange={(checked) => handleSwitchChange("showGallerySection", checked)}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showSpecsSection" className="text-blue-300 font-medium">
                      Sección de Especificaciones
                    </Label>
                    <p className="text-sm text-muted-foreground">Muestra la tabla de especificaciones técnicas</p>
                  </div>
                  <Switch
                    id="showSpecsSection"
                    checked={formData.showSpecsSection}
                    onCheckedChange={(checked) => handleSwitchChange("showSpecsSection", checked)}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showPriceSection" className="text-blue-300 font-medium">
                      Sección de Precio
                    </Label>
                    <p className="text-sm text-muted-foreground">Muestra el precio y botón de compra</p>
                  </div>
                  <Switch
                    id="showPriceSection"
                    checked={formData.showPriceSection}
                    onCheckedChange={(checked) => handleSwitchChange("showPriceSection", checked)}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showAnimations" className="text-blue-300 font-medium">
                      Mostrar Animaciones
                    </Label>
                    <p className="text-sm text-muted-foreground">Agrega animaciones a los elementos (solo CSS)</p>
                  </div>
                  <Switch
                    id="showAnimations"
                    checked={formData.showAnimations}
                    onCheckedChange={(checked) => handleSwitchChange("showAnimations", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 text-blue-300">Elementos Adicionales</h3>
              <p className="text-sm text-gray-400 mb-4">
                Agrega elementos personalizados como textos, imágenes o videos que aparecerán después del contenido
                principal.
              </p>
              <DynamicElementAdder elements={dynamicElements} onChange={setDynamicElements} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={generateSpeaker} className="w-full skeuomorphic-button">
        Generar Contenido
      </Button>
    </div>
  )
}

