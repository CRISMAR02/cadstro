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
import {
  PlusCircle,
  Trash2,
  ImagePlus,
  Youtube,
  Smartphone,
  Cpu,
  Battery,
  Camera,
  Wifi,
  MemoryStickIcon as Memory,
} from "lucide-react"
import ThemeSelector from "@/components/theme-selector"
import DynamicElementAdder, { type DynamicElement, generateElementsHTML } from "@/components/dynamic-element-adder"

// Importar el componente DynamicGridAdder y sus tipos
import DynamicGridAdder, { type Grid, generateGridsHTML, gridStyles } from "@/components/dynamic-grid-adder"

// Temas predefinidos para smartphones
const smartphoneThemes = {
  modern: {
    name: "Moderno",
    backgroundColor: "#f8fafc",
    cardBackgroundColor: "#ffffff",
    textColor: "#0f172a",
    accentColor: "#3b82f6",
    highlightColor: "#60a5fa",
    borderColor: "#e2e8f0",
  },
  dark: {
    name: "Oscuro",
    backgroundColor: "#0f172a",
    cardBackgroundColor: "#1e293b",
    textColor: "#f8fafc",
    accentColor: "#3b82f6",
    highlightColor: "#60a5fa",
    borderColor: "#334155",
  },
  minimal: {
    name: "Minimalista",
    backgroundColor: "#ffffff",
    cardBackgroundColor: "#f8fafc",
    textColor: "#0f172a",
    accentColor: "#94a3b8",
    highlightColor: "#cbd5e1",
    borderColor: "#e2e8f0",
  },
  vibrant: {
    name: "Vibrante",
    backgroundColor: "#581c87",
    cardBackgroundColor: "#7e22ce",
    textColor: "#f5f3ff",
    accentColor: "#d946ef",
    highlightColor: "#e879f9",
    borderColor: "#a855f7",
  },
  corporate: {
    name: "Corporativo",
    backgroundColor: "#0c4a6e",
    cardBackgroundColor: "#0e7490",
    textColor: "#ecfeff",
    accentColor: "#06b6d4",
    highlightColor: "#22d3ee",
    borderColor: "#0891b2",
  },
  eco: {
    name: "Ecológico",
    backgroundColor: "#14532d",
    cardBackgroundColor: "#166534",
    textColor: "#f0fdf4",
    accentColor: "#22c55e",
    highlightColor: "#4ade80",
    borderColor: "#15803d",
  },
}

// Iconos predefinidos para características
const featureIcons = [
  { name: "Smartphone", icon: <Smartphone className="h-5 w-5" /> },
  { name: "Procesador", icon: <Cpu className="h-5 w-5" /> },
  { name: "Batería", icon: <Battery className="h-5 w-5" /> },
  { name: "Cámara", icon: <Camera className="h-5 w-5" /> },
  { name: "Conectividad", icon: <Wifi className="h-5 w-5" /> },
  { name: "Memoria", icon: <Memory className="h-5 w-5" /> },
]

interface SmartphoneFormProps {
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

export default function SmartphoneForm({ onGenerate }: SmartphoneFormProps) {
  const [formData, setFormData] = useState({
    smartphoneName: "",
    smartphoneTagline: "",
    smartphoneDescription: "",
    mainImage: "",
    logoImage: "",
    heroVideo: "",
    price: "",
    ctaText: "Comprar ahora",
    ctaLink: "#",
    backgroundColor: "#f8fafc",
    cardBackgroundColor: "#ffffff",
    textColor: "#0f172a",
    accentColor: "#3b82f6",
    highlightColor: "#60a5fa",
    borderColor: "#e2e8f0",
    selectedTheme: "modern",
    showHeroSection: true,
    showFeaturesSection: true,
    showGallerySection: true,
    showSpecsSection: true,
    showPriceSection: true,
    showAnimations: true,
  })

  // Estado para elementos dinámicos
  const [dynamicElements, setDynamicElements] = useState<DynamicElement[]>([])

  // Añadir estado para los grids después de los otros estados
  const [grids, setGrids] = useState<Grid[]>([])

  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "feature-1",
      icon: "procesador",
      title: "Procesador de última generación",
      description: "Rendimiento excepcional para todas tus aplicaciones",
    },
    {
      id: "feature-2",
      icon: "cámara",
      title: "Cámara profesional",
      description: "Captura momentos increíbles con calidad excepcional",
    },
    {
      id: "feature-3",
      icon: "batería",
      title: "Batería de larga duración",
      description: "Hasta 24 horas de uso continuo",
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
    { id: "spec-1", name: "Procesador", value: "Octa-core 2.8 GHz" },
    { id: "spec-2", name: "Memoria RAM", value: "8 GB" },
    { id: "spec-3", name: "Almacenamiento", value: "128 GB" },
    { id: "spec-4", name: "Pantalla", value: "6.5 pulgadas AMOLED" },
    { id: "spec-5", name: "Batería", value: "5000 mAh" },
    { id: "spec-6", name: "Cámara principal", value: "48 MP + 12 MP + 8 MP" },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }))
  }

  const handleThemeChange = (theme: string) => {
    const selectedTheme = smartphoneThemes[theme as keyof typeof smartphoneThemes]
    setFormData((prev) => ({
      ...prev,
      selectedTheme: theme,
      backgroundColor: selectedTheme.backgroundColor,
      cardBackgroundColor: selectedTheme.cardBackgroundColor,
      textColor: selectedTheme.textColor,
      accentColor: selectedTheme.accentColor,
      highlightColor: selectedTheme.highlightColor,
      borderColor: selectedTheme.borderColor,
    }))
  }

  // Funciones para manejar características
  const addFeature = () => {
    const newId = `feature-${features.length + 1}-${Date.now()}`
    setFeatures([
      ...features,
      {
        id: newId,
        icon: "smartphone",
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

  // Modificar la función generateSmartphone para incluir los grids
  const generateSmartphone = () => {
    const {
      smartphoneName,
      smartphoneTagline,
      smartphoneDescription,
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
      showHeroSection,
      showFeaturesSection,
      showGallerySection,
      showSpecsSection,
      showPriceSection,
      showAnimations,
    } = formData

    // Generar el HTML de los elementos dinámicos
    const dynamicElementsHTML = generateElementsHTML(dynamicElements, textColor, accentColor)

    // Generar el HTML de los grids
    const gridsHTML = generateGridsHTML(grids, textColor, accentColor)

    const smartphoneHtml = `
      <style>
        .smartphone-container {
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

        .smartphone-section {
          padding: 60px 40px;
          position: relative;
        }

        .smartphone-hero {
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

        .smartphone-content {
          position: relative;
          z-index: 3;
          width: 100%;
        }

        .smartphone-logo {
          max-width: 180px;
          margin-bottom: 30px;
          ${showAnimations ? "animation: fadeIn 1s ease-out;" : ""}
        }

        .smartphone-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 15px;
          background: linear-gradient(to right, ${textColor}, ${accentColor});
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          ${showAnimations ? "animation: slideUp 0.8s ease-out;" : ""}
        }

        .smartphone-tagline {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 30px;
          opacity: 0.9;
          ${showAnimations ? "animation: slideUp 1s ease-out;" : ""}
        }

        .smartphone-description {
          max-width: 700px;
          margin: 0 auto 40px;
          line-height: 1.6;
          font-size: 1.1rem;
          opacity: 0.8;
          ${showAnimations ? "animation: fadeIn 1.2s ease-out;" : ""}
        }

        .smartphone-main-image {
          max-width: 100%;
          height: auto;
          margin: 20px 0;
          border-radius: 10px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          ${showAnimations ? "animation: pulseSmartphone 3s ease-in-out infinite;" : ""}
          position: relative;
          z-index: 4;
        }

        @keyframes pulseSmartphone {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        .smartphone-video-container {
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

        .smartphone-video {
          width: 100%;
          height: 450px;
          border: none;
        }

        .smartphone-features {
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

        .smartphone-gallery {
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

        .smartphone-specs {
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

        .smartphone-price {
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
          .smartphone-section {
            padding: 40px 20px;
          }

          .smartphone-hero {
            padding: 60px 20px;
          }

          .smartphone-title {
            font-size: 2.5rem;
          }

          .smartphone-tagline {
            font-size: 1.2rem;
          }

          .smartphone-video {
            height: 300px;
          }

          .feature-card {
            padding: 20px;
          }

          .price-tag {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .smartphone-title {
            font-size: 1.8rem;
          }
          
          .smartphone-tagline {
            font-size: 1rem;
          }
          
          .smartphone-description {
            font-size: 0.9rem;
          }
          
          .smartphone-section {
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

          .smartphone-title {
            font-size: 2rem;
          }

          .smartphone-video {
            height: 200px;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
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

        /* Estilos para los grids */
        ${gridStyles}
      </style>

      <div class="smartphone-container">
        ${
          showHeroSection
            ? `
        <section class="smartphone-hero">
          <div class="smartphone-content">
            ${logoImage ? `<img src="${logoImage}" alt="Logo" class="smartphone-logo">` : ""}
            <h1 class="smartphone-title">${smartphoneName}</h1>
            <p class="smartphone-tagline">${smartphoneTagline}</p>
            <p class="smartphone-description">${smartphoneDescription}</p>
            ${mainImage ? `<img src="${mainImage}" alt="${smartphoneName}" class="smartphone-main-image">` : ""}
            ${
              heroVideo
                ? `
            <div class="smartphone-video-container">
              <iframe class="smartphone-video" src="https://www.youtube.com/embed/${heroVideo}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
        <section class="smartphone-features">
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
        <section class="smartphone-gallery">
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
        <section class="smartphone-specs">
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
        <section class="smartphone-price">
          <div class="price-tag">
            <span class="price-currency">$</span>${price}
          </div>
          <a href="${ctaLink}" class="cta-button">${ctaText}</a>
        </section>
        `
            : ""
        }
        ${dynamicElementsHTML}

        <!-- Grids de imágenes/videos -->
        ${gridsHTML}
      </div>
    `

    onGenerate(smartphoneHtml)
  }

  return (
    <div className="space-y-6 skeuomorphic-section p-6">
      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 text-blue-300">Seleccionar Tema</h3>
          <ThemeSelector
            themes={smartphoneThemes}
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
                <Label htmlFor="smartphoneName" className="text-blue-300 font-medium">
                  Nombre del Smartphone
                </Label>
                <Input
                  id="smartphoneName"
                  placeholder="Ej: UltraPhone Pro"
                  value={formData.smartphoneName}
                  onChange={handleChange}
                  className="skeuomorphic-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="smartphoneTagline" className="text-blue-300 font-medium">
                  Eslogan
                </Label>
                <Input
                  id="smartphoneTagline"
                  placeholder="Ej: Tecnología que transforma tu vida"
                  value={formData.smartphoneTagline}
                  onChange={handleChange}
                  className="skeuomorphic-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="smartphoneDescription" className="text-blue-300 font-medium">
                  Descripción
                </Label>
                <Textarea
                  id="smartphoneDescription"
                  placeholder="Descripción detallada del smartphone"
                  value={formData.smartphoneDescription}
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
                  placeholder="https://ejemplo.com/smartphone.jpg"
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
                    placeholder="Ej: 999.99"
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
                    <p className="text-sm text-muted-foreground">Muestra las características del smartphone</p>
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

          <Card className="skeuomorphic-card mt-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 text-blue-300">Grids de Imágenes/Videos</h3>
              <p className="text-sm text-gray-400 mb-4">
                Agrega grids de imágenes o videos para mostrar diferentes ángulos, características o contenido visual
                del smartphone.
              </p>
              <DynamicGridAdder grids={grids} onChange={setGrids} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={generateSmartphone} className="w-full skeuomorphic-button">
        Generar Contenido
      </Button>
    </div>
  )
}

