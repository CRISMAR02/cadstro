"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Trash2 } from "lucide-react"

// Primero, importar el componente DynamicElementAdder y sus tipos
import DynamicElementAdder, { type DynamicElement, generateElementsHTML } from "@/components/dynamic-element-adder"
// Importar el componente DynamicGridAdder y sus tipos
import DynamicGridAdder, { type Grid, generateGridsHTML, gridStyles } from "@/components/dynamic-grid-adder"

// Update the themes to be more notebook-specific
const colorThemes = {
  dark: {
    name: "Oscuro",
    backgroundColor: "#0a0a0a",
    cardBackgroundColor: "#1a1a1a",
    textColor: "#ffffff",
    accentColor: "#4299e1",
    highlightColor: "#f97316",
  },
  light: {
    name: "Claro",
    backgroundColor: "#f8fafc",
    cardBackgroundColor: "#ffffff",
    textColor: "#0f172a",
    accentColor: "#3b82f6",
    highlightColor: "#f97316",
  },
  blue: {
    name: "Azul",
    backgroundColor: "#0c4a6e",
    cardBackgroundColor: "#0e7490",
    textColor: "#f0f9ff",
    accentColor: "#38bdf8",
    highlightColor: "#fb923c",
  },
  gaming: {
    name: "Gaming",
    backgroundColor: "#18181b",
    cardBackgroundColor: "#27272a",
    textColor: "#f4f4f5",
    accentColor: "#22c55e",
    highlightColor: "#f43f5e",
  },
  professional: {
    name: "Profesional",
    backgroundColor: "#1e293b",
    cardBackgroundColor: "#334155",
    textColor: "#f8fafc",
    accentColor: "#64748b",
    highlightColor: "#94a3b8",
  },
  creative: {
    name: "Creativo",
    backgroundColor: "#4a1d96",
    cardBackgroundColor: "#6d28d9",
    textColor: "#f5f3ff",
    accentColor: "#8b5cf6",
    highlightColor: "#c084fc",
  },
}

interface FormDataType {
  notebookImage: string
  notebookLogo: string
  notebookSlogan: string
  notebookTagline: string
  notebookModel: string
  processorInfo: string
  graphicsInfo: string
  ramInfo: string
  storageInfo: string
  displayInfo: string
  portsInfo: string
  batteryInfo: string
  osInfo: string
  weightInfo: string
  feature1: string
  feature2: string
  feature3: string
  backgroundColor: string
  accentColor: string
  textColor: string
  highlightColor: string
  buttonText: string
  buttonLink: string
  showParticles: boolean
  showFloatingEffect: boolean
  showGlowEffect: boolean
  showSpecTable: boolean
  showColorOptions: boolean
  selectedTheme: string
}

interface ColorOptionType {
  id: string
  name: string
  hexCode: string
  imageUrl: string
}

interface ImageType {
  id: string
  url: string
  caption: string
}

interface NotebookFormProps {
  onGenerate: (code: string) => void
}

interface ThemeSelectorProps {
  themes: { [key: string]: any }
  selectedTheme: string
  onThemeChange: (theme: string) => void
}

function ThemeSelector({ themes, selectedTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="selectedTheme" className="text-blue-300 font-medium">
          Tema de colores
        </Label>
        <Select value={selectedTheme} onValueChange={onThemeChange}>
          <SelectTrigger className="skeuomorphic-input">
            <SelectValue placeholder="Seleccionar tema" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(themes).map(([key, theme]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accentColor }}></div>
                  {theme.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            type="button"
            className={`p-2 rounded-md transition-all ${
              selectedTheme === key ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
            }`}
            style={{
              backgroundColor: theme.backgroundColor,
              border: `1px solid ${theme.accentColor}`,
            }}
            onClick={() => onThemeChange(key)}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: theme.accentColor }}></div>
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: theme.highlightColor }}></div>
              <span className="text-xs font-medium mt-1" style={{ color: theme.textColor }}>
                {theme.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function NotebookForm({ onGenerate }: NotebookFormProps) {
  // Initialize state with default values
  const defaultFormData: FormDataType = {
    notebookImage: "",
    notebookLogo: "",
    notebookSlogan: "Rendimiento extraordinario",
    notebookTagline: "Diseñado para profesionales",
    notebookModel: "ProBook X5",
    processorInfo: "Intel Core i7-12700H",
    graphicsInfo: "NVIDIA RTX 3060 6GB",
    ramInfo: "16GB DDR4 3200MHz",
    storageInfo: "512GB NVMe SSD",
    displayInfo: '15.6" FHD IPS 144Hz',
    portsInfo: "USB-C, HDMI, USB 3.0",
    batteryInfo: "6 celdas, hasta 8 horas",
    osInfo: "Windows 11 Pro",
    weightInfo: "1.8 kg",
    feature1: "Procesador ultrarrápido",
    feature2: "Gráficos de alta definición",
    feature3: "Batería de larga duración",
    backgroundColor: "#0a0a0a",
    accentColor: "#4299e1",
    textColor: "#ffffff",
    highlightColor: "#f97316",
    buttonText: "Descubre más",
    buttonLink: "#",
    showParticles: true,
    showFloatingEffect: true,
    showGlowEffect: true,
    showSpecTable: true,
    showColorOptions: true,
    selectedTheme: "dark",
  }

  const defaultColorOptions: ColorOptionType[] = [
    { id: "color-1", name: "Negro", hexCode: "#000000", imageUrl: "" },
    { id: "color-2", name: "Plata", hexCode: "#C0C0C0", imageUrl: "" },
  ]

  const defaultAdditionalImages: ImageType[] = [{ id: "image-1", url: "", caption: "Vista lateral" }]

  const [formData, setFormData] = useState<FormDataType>(defaultFormData)
  const [colorOptions, setColorOptions] = useState<ColorOptionType[]>(defaultColorOptions)
  const [additionalImages, setAdditionalImages] = useState<ImageType[]>(defaultAdditionalImages)
  const [dynamicElements, setDynamicElements] = useState<DynamicElement[]>([])
  // Añadir estado para los grids después de los otros estados
  const [grids, setGrids] = useState<Grid[]>([])

  // Add function to handle color options
  const addColorOption = () => {
    const newId = `color-${colorOptions.length + 1}-${Date.now()}`
    setColorOptions([...colorOptions, { id: newId, name: "Nuevo color", hexCode: "#cccccc", imageUrl: "" }])
  }

  const updateColorOption = (id: string, field: string, value: string) => {
    setColorOptions(colorOptions.map((option) => (option.id === id ? { ...option, [field]: value } : option)))
  }

  const removeColorOption = (id: string) => {
    setColorOptions(colorOptions.filter((option) => option.id !== id))
  }

  // Add function to handle additional images
  const addAdditionalImage = () => {
    const newId = `image-${additionalImages.length + 1}-${Date.now()}`
    setAdditionalImages([...additionalImages, { id: newId, url: "", caption: "Nueva imagen" }])
  }

  const updateAdditionalImage = (id: string, field: string, value: string) => {
    setAdditionalImages(additionalImages.map((image) => (image.id === id ? { ...image, [field]: value } : image)))
  }

  const removeAdditionalImage = (id: string) => {
    setAdditionalImages(additionalImages.filter((image) => image.id !== id))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }))
  }

  const handleThemeChange = (theme: string) => {
    const selectedTheme = colorThemes[theme as keyof typeof colorThemes]
    setFormData((prev) => ({
      ...prev,
      selectedTheme: theme,
      backgroundColor: selectedTheme.backgroundColor,
      accentColor: selectedTheme.accentColor,
      textColor: selectedTheme.textColor,
      highlightColor: selectedTheme.highlightColor,
    }))
  }

  // Modify the generateNotebook function to include the new fields
  const generateNotebook = () => {
    const {
      notebookImage,
      notebookLogo,
      notebookSlogan,
      notebookTagline,
      notebookModel,
      processorInfo,
      graphicsInfo,
      ramInfo,
      storageInfo,
      displayInfo,
      portsInfo,
      batteryInfo,
      osInfo,
      weightInfo,
      feature1,
      feature2,
      feature3,
      backgroundColor,
      accentColor,
      textColor,
      highlightColor,
      buttonText,
      buttonLink,
      showParticles,
      showFloatingEffect,
      showGlowEffect,
      showSpecTable,
      showColorOptions,
    } = formData

    // Generate the HTML of the elements dinámicos
    const dynamicElementsHTML = generateElementsHTML(dynamicElements, textColor, accentColor)
    // Generar el HTML de los grids
    const gridsHTML = generateGridsHTML(grids, textColor, accentColor)

    // Generate color options HTML
    const colorOptionsHTML =
      showColorOptions && colorOptions.length > 0
        ? `
      <div class="notebook-color-options">
        <h3 class="section-title">Opciones de color</h3>
        <div class="color-options-container">
          ${colorOptions
            .map(
              (option) => `
            <div class="color-option">
              <div class="color-swatch" style="background-color: ${option.hexCode}"></div>
              <div class="color-info">
                <span class="color-name">${option.name}</span>
                ${option.imageUrl ? `<img src="${option.imageUrl}" alt="${option.name}" class="color-variant-image">` : ""}
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `
        : ""

    // Generate additional images HTML
    const additionalImagesHTML =
      additionalImages.length > 0
        ? `
      <div class="notebook-additional-images">
        <h3 class="section-title">Más imágenes</h3>
        <div class="additional-images-container">
          ${additionalImages
            .map(
              (image) => `
            <div class="additional-image">
              <img src="${image.url}" alt="${image.caption}" class="notebook-image">
              <p class="image-caption">${image.caption}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `
        : ""

    // Generate specifications table HTML
    const specTableHTML = showSpecTable
      ? `
      <div class="notebook-specs">
        <h3 class="section-title">Especificaciones técnicas</h3>
        <table class="specs-table">
          <tr>
            <th>Modelo</th>
            <td>${notebookModel}</td>
          </tr>
          <tr>
            <th>Procesador</th>
            <td>${processorInfo}</td>
          </tr>
          <tr>
            <th>Gráficos</th>
            <td>${graphicsInfo}</td>
          </tr>
          <tr>
            <th>Memoria RAM</th>
            <td>${ramInfo}</td>
          </tr>
          <tr>
            <th>Almacenamiento</th>
            <td>${storageInfo}</td>
          </tr>
          <tr>
            <th>Pantalla</th>
            <td>${displayInfo}</td>
          </tr>
          <tr>
            <th>Puertos</th>
            <td>${portsInfo}</td>
          </tr>
          <tr>
            <th>Batería</th>
            <td>${batteryInfo}</td>
          </tr>
          <tr>
            <th>Sistema Operativo</th>
            <td>${osInfo}</td>
          </tr>
          <tr>
            <th>Peso</th>
            <td>${weightInfo}</td>
          </tr>
        </table>
      </div>
    `
      : ""

    const notebookHtml = `
      <style>
        .notebook-ad-container {
          max-width: 100%;
          margin: 0 auto;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          padding: 20px;
          background: linear-gradient(to bottom, ${backgroundColor}, ${backgroundColor}dd);
          border-radius: 15px;
          box-shadow: 
            0 10px 30px ${accentColor}33,
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
          border: 1px solid ${accentColor}66;
          color: ${textColor};
        }
        
        ${
          showParticles
            ? `
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          display: block;
          pointer-events: none;
          width: 6px;
          height: 6px;
          background-color: ${accentColor};
          border-radius: 50%;
          opacity: 0.3;
          animation: float-particle 15s infinite linear;
        }
        
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-500px) translateX(200px) rotate(360deg);
            opacity: 0;
          }
        }
        `
            : ""
        }
        
        .notebook-ad-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 40px;
          text-align: center;
        }
        
        .notebook-logo {
          max-width: 180px;
          margin-bottom: 20px;
          ${showGlowEffect ? `filter: drop-shadow(0 0 10px ${accentColor}80);` : ""}
        }
        
        .notebook-slogan {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 15px;
          background: linear-gradient(to right, ${textColor}, ${accentColor});
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: ${showGlowEffect ? `0 0 20px ${accentColor}40` : "none"};
          letter-spacing: -0.5px;
        }
        
        .notebook-tagline {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 40px;
          color: ${textColor}cc;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        .notebook-image-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          ${
            showFloatingEffect
              ? `
          animation: float 6s ease-in-out infinite;
          `
              : ""
          }
        }
        
        ${
          showFloatingEffect
            ? `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        `
            : ""
        }
        
        .notebook-image {
          width: 100%;
          height: auto;
          ${
            showGlowEffect
              ? `
          filter: drop-shadow(0 0 20px ${accentColor}60);
          `
              : ""
          }
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        
        .notebook-image:hover {
          transform: scale(1.05) rotateY(5deg);
        }
        
        .notebook-features {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 40px;
          flex-wrap: wrap;
        }
        
        .feature {
          background: ${backgroundColor}aa;
          backdrop-filter: blur(10px);
          padding: 15px 25px;
          border-radius: 50px;
          border: 1px solid ${accentColor}40;
          color: ${textColor};
          font-weight: 500;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          animation: feature-pulse 3s infinite;
        }
        
        .feature:nth-child(1) {
          animation-delay: 0s;
        }
        
        .feature:nth-child(2) {
          animation-delay: 1s;
        }
        
        .feature:nth-child(3) {
          animation-delay: 2s;
        }
        
        @keyframes feature-pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px ${accentColor}60;
          }
          100% {
            transform: scale(1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
        }
        
        .feature:hover {
          background: ${accentColor};
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .cta-button {
          margin-top: 40px;
          display: inline-block;
          padding: 15px 40px;
          background: linear-gradient(to right, ${accentColor}, ${highlightColor});
          color: ${textColor};
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          border-radius: 50px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .cta-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: 0.5s;
        }
        
        .cta-button:hover:before {
          left: 100%;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .cta-button:active {
          transform: translateY(0);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 40px 0 20px;
          color: ${accentColor};
          text-shadow: ${showGlowEffect ? `0 0 10px ${accentColor}40` : "none"};
        }
        
        .specs-table {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          border-collapse: collapse;
          margin-bottom: 40px;
        }
        
        .specs-table th, .specs-table td {
          padding: 12px 20px;
          text-align: left;
          border-bottom: 1px solid ${accentColor}30;
        }
        
        .specs-table th {
          color: ${accentColor};
          font-weight: 600;
          width: 40%;
        }
        
        .specs-table tr:hover {
          background-color: ${backgroundColor}80;
        }
        
        .color-options-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        
        .color-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        
        .color-option:hover {
          transform: translateY(-5px);
        }
        
        .color-swatch {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid ${textColor}40;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .color-name {
          font-size: 0.9rem;
          color: ${textColor};
        }
        
        .color-variant-image {
          width: 100px;
          height: auto;
          margin-top: 10px;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .additional-images-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        
        .additional-image {
          width: 200px;
          transition: all 0.3s ease;
        }
        
        .additional-image:hover {
          transform: scale(1.05);
        }
        
        .image-caption {
          margin-top: 10px;
          font-size: 0.9rem;
          color: ${textColor}cc;
        }
        
        @media (max-width: 768px) {
          .notebook-ad-container {
            height: auto;
            min-height: 600px;
          }
          
          .notebook-ad-content {
            padding: 30px 20px;
          }
          
          .notebook-slogan {
            font-size: 2rem;
          }
          
          .notebook-tagline {
            font-size: 1.2rem;
            margin-bottom: 30px;
          }
          
          .notebook-features {
            flex-direction: column;
            gap: 15px;
            align-items: center;
          }
          
          .feature {
            width: 80%;
          }
          
          .specs-table th, .specs-table td {
            padding: 8px 10px;
            font-size: 0.9rem;
          }
          
          .section-title {
            font-size: 1.5rem;
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

        .notebook-image-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 480px) {
          .notebook-ad-container {
            min-height: auto;
          }
          
          .notebook-slogan {
            font-size: 1.5rem;
          }
          
          .notebook-tagline {
            font-size: 1rem;
          }
          
          .notebook-features {
            flex-direction: column;
            gap: 10px;
          }
          
          .feature {
            width: 100%;
            text-align: center;
          }
          
          .cta-button {
            padding: 12px 30px;
            font-size: 1rem;
          }
          
          .color-options-container, .additional-images-container {
            flex-direction: column;
            align-items: center;
          }
        }

        /* Estilos para los grids */
        ${gridStyles}
      </style>
      
      <div class="notebook-ad-container">
        ${
          showParticles
            ? `
        <div class="particles">
          ${Array.from({ length: 20 })
            .map((_, i) => {
              const size = Math.random() * 5 + 3
              const posX = Math.random() * 100
              const posY = Math.random() * 100
              const duration = Math.random() * 20 + 10
              const delay = Math.random() * 5

              return `<div class="particle" style="
              left: ${posX}%;
              top: ${posY}%;
              width: ${size}px;
              height: ${size}px;
              animation-duration: ${duration}s;
              animation-delay: ${delay}s;
            "></div>`
            })
            .join("")}
        </div>
        `
            : ""
        }
        
        <div class="notebook-ad-content">
          ${notebookLogo ? `<img src="${notebookLogo}" alt="Logo" class="notebook-logo">` : ""}
          
          <h1 class="notebook-slogan">${notebookSlogan}</h1>
          <p class="notebook-tagline">${notebookTagline}</p>
          
          <div class="notebook-image-container">
            <img src="${notebookImage}" alt="Notebook" class="notebook-image">
          </div>
          
          <div class="notebook-features">
            <div class="feature">${feature1}</div>
            <div class="feature">${feature2}</div>
            <div class="feature">${feature3}</div>
          </div>
          
          ${specTableHTML}
          
          ${colorOptionsHTML}
          
          ${additionalImagesHTML}
          
          <a href="${buttonLink}" class="cta-button">${buttonText}</a>
        </div>

        ${dynamicElementsHTML}

        <!-- Grids de imágenes/videos -->
        ${gridsHTML}
      </div>
    `

    onGenerate(notebookHtml)
  }

  // Agregar el componente al final, antes del botón de generación
  return (
    <div className="space-y-6 skeuomorphic-section p-6">
      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 text-blue-300">Seleccionar Tema</h3>
          <ThemeSelector
            themes={colorThemes}
            selectedTheme={formData.selectedTheme}
            onThemeChange={handleThemeChange}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-6 mb-6 skeuomorphic-tabs">
          <TabsTrigger value="basic" className="skeuomorphic-tab">
            Básico
          </TabsTrigger>
          <TabsTrigger value="specs" className="skeuomorphic-tab">
            Especificaciones
          </TabsTrigger>
          <TabsTrigger value="features" className="skeuomorphic-tab">
            Características
          </TabsTrigger>
          <TabsTrigger value="colors" className="skeuomorphic-tab">
            Colores
          </TabsTrigger>
          <TabsTrigger value="images" className="skeuomorphic-tab">
            Imágenes
          </TabsTrigger>
          <TabsTrigger value="effects" className="skeuomorphic-tab">
            Efectos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="notebookImage" className="text-blue-300 font-medium">
              URL de la imagen principal del notebook
            </Label>
            <Input
              id="notebookImage"
              placeholder="https://ejemplo.com/notebook.jpg"
              value={formData.notebookImage}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notebookLogo" className="text-blue-300 font-medium">
              URL del logo (opcional)
            </Label>
            <Input
              id="notebookLogo"
              placeholder="https://ejemplo.com/logo.png"
              value={formData.notebookLogo}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notebookModel" className="text-blue-300 font-medium">
              Modelo del notebook
            </Label>
            <Input
              id="notebookModel"
              placeholder="Ej: ProBook X5"
              value={formData.notebookModel}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="notebookSlogan" className="text-blue-300 font-medium">
                Eslogan principal
              </Label>
              <Input
                id="notebookSlogan"
                placeholder="Rendimiento extraordinario"
                value={formData.notebookSlogan}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notebookTagline" className="text-blue-300 font-medium">
                Frase secundaria
              </Label>
              <Input
                id="notebookTagline"
                placeholder="Diseñado para profesionales"
                value={formData.notebookTagline}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="buttonText" className="text-blue-300 font-medium">
                Texto del botón
              </Label>
              <Input
                id="buttonText"
                placeholder="Descubre más"
                value={formData.buttonText}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="buttonLink" className="text-blue-300 font-medium">
                Enlace del botón
              </Label>
              <Input
                id="buttonLink"
                placeholder="#"
                value={formData.buttonLink}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="specs" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="processorInfo" className="text-blue-300 font-medium">
              Procesador
            </Label>
            <Input
              id="processorInfo"
              placeholder="Ej: Intel Core i7-12700H"
              value={formData.processorInfo}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="graphicsInfo" className="text-blue-300 font-medium">
              Tarjeta gráfica
            </Label>
            <Input
              id="graphicsInfo"
              placeholder="Ej: NVIDIA RTX 3060 6GB"
              value={formData.graphicsInfo}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ramInfo" className="text-blue-300 font-medium">
                Memoria RAM
              </Label>
              <Input
                id="ramInfo"
                placeholder="Ej: 16GB DDR4 3200MHz"
                value={formData.ramInfo}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="storageInfo" className="text-blue-300 font-medium">
                Almacenamiento
              </Label>
              <Input
                id="storageInfo"
                placeholder="Ej: 512GB NVMe SSD"
                value={formData.storageInfo}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="displayInfo" className="text-blue-300 font-medium">
              Pantalla
            </Label>
            <Input
              id="displayInfo"
              placeholder='Ej: 15.6" FHD IPS 144Hz'
              value={formData.displayInfo}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="portsInfo" className="text-blue-300 font-medium">
                Puertos
              </Label>
              <Input
                id="portsInfo"
                placeholder="Ej: USB-C, HDMI, USB 3.0"
                value={formData.portsInfo}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="batteryInfo" className="text-blue-300 font-medium">
                Batería
              </Label>
              <Input
                id="batteryInfo"
                placeholder="Ej: 6 celdas, hasta 8 horas"
                value={formData.batteryInfo}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="osInfo" className="text-blue-300 font-medium">
                Sistema Operativo
              </Label>
              <Input
                id="osInfo"
                placeholder="Ej: Windows 11 Pro"
                value={formData.osInfo}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="weightInfo" className="text-blue-300 font-medium">
                Peso
              </Label>
              <Input
                id="weightInfo"
                placeholder="Ej: 1.8 kg"
                value={formData.weightInfo}
                onChange={handleChange}
                className="skeuomorphic-input"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <Label htmlFor="showSpecTable" className="text-blue-300 font-medium">
                Mostrar tabla de especificaciones
              </Label>
              <p className="text-sm text-muted-foreground">Muestra una tabla detallada con las especificaciones</p>
            </div>
            <Switch
              id="showSpecTable"
              checked={formData.showSpecTable}
              onCheckedChange={(checked) => handleSwitchChange("showSpecTable", checked)}
            />
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 text-blue-300">Características Destacadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="feature1" className="text-blue-300 font-medium">
                    Característica 1
                  </Label>
                  <Input
                    id="feature1"
                    placeholder="Procesador ultrarrápido"
                    value={formData.feature1}
                    onChange={handleChange}
                    className="skeuomorphic-input"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="feature2" className="text-blue-300 font-medium">
                    Característica 2
                  </Label>
                  <Input
                    id="feature2"
                    placeholder="Gráficos de alta definición"
                    value={formData.feature2}
                    onChange={handleChange}
                    className="skeuomorphic-input"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="feature3" className="text-blue-300 font-medium">
                    Característica 3
                  </Label>
                  <Input
                    id="feature3"
                    placeholder="Batería de larga duración"
                    value={formData.feature3}
                    onChange={handleChange}
                    className="skeuomorphic-input"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-blue-300">Opciones de Color</h3>
                <Button onClick={addColorOption} className="skeuomorphic-button-secondary flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Agregar Color
                </Button>
              </div>

              <div className="space-y-4">
                {colorOptions.map((option, index) => (
                  <div key={option.id} className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-md font-medium text-blue-300">Color {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeColorOption(option.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label className="text-blue-300">Nombre del color</Label>
                        <Input
                          value={option.name}
                          onChange={(e) => updateColorOption(option.id, "name", e.target.value)}
                          className="skeuomorphic-input"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-blue-300">Código de color</Label>
                        <div className="flex gap-2">
                          <div className="color-input-wrapper flex-grow">
                            <input
                              type="color"
                              value={option.hexCode}
                              onChange={(e) => updateColorOption(option.id, "hexCode", e.target.value)}
                              className="color-input"
                            />
                            <div className="color-preview" style={{ backgroundColor: option.hexCode }}>
                              {option.hexCode}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-blue-300">URL de imagen (opcional)</Label>
                        <Input
                          value={option.imageUrl}
                          onChange={(e) => updateColorOption(option.id, "imageUrl", e.target.value)}
                          placeholder="https://ejemplo.com/color-variant.jpg"
                          className="skeuomorphic-input"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <Label htmlFor="showColorOptions" className="text-blue-300 font-medium">
                    Mostrar opciones de color
                  </Label>
                  <p className="text-sm text-muted-foreground">Muestra las variantes de color disponibles</p>
                </div>
                <Switch
                  id="showColorOptions"
                  checked={formData.showColorOptions}
                  onCheckedChange={(checked) => handleSwitchChange("showColorOptions", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-blue-300">Imágenes Adicionales</h3>
                <Button onClick={addAdditionalImage} className="skeuomorphic-button-secondary flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Agregar Imagen
                </Button>
              </div>

              <div className="space-y-4">
                {additionalImages.map((image, index) => (
                  <div key={image.id} className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-md font-medium text-blue-300">Imagen {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAdditionalImage(image.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label className="text-blue-300">URL de la imagen</Label>
                        <Input
                          value={image.url}
                          onChange={(e) => updateAdditionalImage(image.id, "url", e.target.value)}
                          placeholder="https://ejemplo.com/imagen.jpg"
                          className="skeuomorphic-input"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-blue-300">Descripción</Label>
                        <Input
                          value={image.caption}
                          onChange={(e) => updateAdditionalImage(image.id, "caption", e.target.value)}
                          placeholder="Vista lateral"
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

        <TabsContent value="effects" className="space-y-4">
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
              </div>
            </CardContent>
          </Card>

          <Card className="skeuomorphic-card">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 text-blue-300">Efectos Visuales</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showParticles" className="text-blue-300 font-medium">
                      Mostrar partículas
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Agrega un efecto de partículas flotantes en el fondo
                    </p>
                  </div>
                  <Switch
                    id="showParticles"
                    checked={formData.showParticles}
                    onCheckedChange={(checked) => handleSwitchChange("showParticles", checked)}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showFloatingEffect" className="text-blue-300 font-medium">
                      Efecto flotante
                    </Label>
                    <p className="text-sm text-muted-foreground">Hace que la imagen del notebook flote suavemente</p>
                  </div>
                  <Switch
                    id="showFloatingEffect"
                    checked={formData.showFloatingEffect}
                    onCheckedChange={(checked) => handleSwitchChange("showFloatingEffect", checked)}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showGlowEffect" className="text-blue-300 font-medium">
                      Efecto de brillo
                    </Label>
                    <p className="text-sm text-muted-foreground">Agrega un brillo suave alrededor de elementos clave</p>
                  </div>
                  <Switch
                    id="showGlowEffect"
                    checked={formData.showGlowEffect}
                    onCheckedChange={(checked) => handleSwitchChange("showGlowEffect", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="skeuomorphic-card mt-6">
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
            Agrega grids de imágenes o videos para mostrar diferentes ángulos, características o contenido visual del
            notebook.
          </p>
          <DynamicGridAdder grids={grids} onChange={setGrids} />
        </CardContent>
      </Card>

      <Button onClick={generateNotebook} className="w-full skeuomorphic-button">
        Generar Contenido
      </Button>
    </div>
  )
}

