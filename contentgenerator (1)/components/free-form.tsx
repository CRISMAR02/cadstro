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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PlusCircle,
  Trash2,
  ImagePlus,
  Youtube,
  Type,
  List,
  Table,
  Grid,
  ArrowUp,
  ArrowDown,
  Layout,
  Palette,
  Sliders,
  MoveVertical,
  ImageIcon,
  Video,
  X,
} from "lucide-react"
import { generateYouTubeEmbedUrl } from "@/utils/youtube-helper"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { v4 as uuidv4 } from "uuid"

// Tipos de secciones disponibles
const sectionTypes = [
  { id: "hero", name: "Encabezado", icon: <Layout className="h-4 w-4" /> },
  { id: "text", name: "Texto", icon: <Type className="h-4 w-4" /> },
  { id: "image", name: "Imagen", icon: <ImagePlus className="h-4 w-4" /> },
  { id: "video", name: "Video", icon: <Youtube className="h-4 w-4" /> },
  { id: "features", name: "Características", icon: <List className="h-4 w-4" /> },
  { id: "gallery", name: "Galería", icon: <Grid className="h-4 w-4" /> },
  { id: "specs", name: "Especificaciones", icon: <Table className="h-4 w-4" /> },
  { id: "cta", name: "Llamada a la acción", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "grid", name: "Grid de Imágenes/Videos", icon: <Grid className="h-4 w-4" /> },
]

// Temas predefinidos
const colorThemes = {
  dark: {
    name: "Oscuro",
    backgroundColor: "#0a0a0a",
    cardBackgroundColor: "#1a1a1a",
    textColor: "#ffffff",
    accentColor: "#3b82f6",
    highlightColor: "#f97316",
    borderColor: "#2a2a2a",
  },
  light: {
    name: "Claro",
    backgroundColor: "#f8fafc",
    cardBackgroundColor: "#ffffff",
    textColor: "#0f172a",
    accentColor: "#3b82f6",
    highlightColor: "#f97316",
    borderColor: "#e2e8f0",
  },
  blue: {
    name: "Azul",
    backgroundColor: "#0c4a6e",
    cardBackgroundColor: "#0e7490",
    textColor: "#f0f9ff",
    accentColor: "#38bdf8",
    highlightColor: "#fb923c",
    borderColor: "#0369a1",
  },
  green: {
    name: "Verde",
    backgroundColor: "#064e3b",
    cardBackgroundColor: "#065f46",
    textColor: "#ecfdf5",
    accentColor: "#10b981",
    highlightColor: "#f59e0b",
    borderColor: "#047857",
  },
  purple: {
    name: "Púrpura",
    backgroundColor: "#2e1065",
    cardBackgroundColor: "#4c1d95",
    textColor: "#f5f3ff",
    accentColor: "#a855f7",
    highlightColor: "#fb7185",
    borderColor: "#6d28d9",
  },
  red: {
    name: "Rojo",
    backgroundColor: "#7f1d1d",
    cardBackgroundColor: "#991b1b",
    textColor: "#fef2f2",
    accentColor: "#ef4444",
    highlightColor: "#3b82f6",
    borderColor: "#b91c1c",
  },
  orange: {
    name: "Naranja",
    backgroundColor: "#7c2d12",
    cardBackgroundColor: "#9a3412",
    textColor: "#ffedd5",
    accentColor: "#f97316",
    highlightColor: "#fbbf24",
    borderColor: "#c2410c",
  },
  teal: {
    name: "Turquesa",
    backgroundColor: "#134e4a",
    cardBackgroundColor: "#115e59",
    textColor: "#f0fdfa",
    accentColor: "#14b8a6",
    highlightColor: "#0ea5e9",
    borderColor: "#0f766e",
  },
}

// Estilos de diseño
const layoutStyles = [
  { id: "minimal", name: "Minimalista" },
  { id: "gradient", name: "Gradientes" },
  { id: "material", name: "Material Design" },
  { id: "vibrant", name: "Vibrante" },
  { id: "elegant", name: "Elegante" },
  { id: "clean", name: "Limpio" },
]

// Estilos de animación
const animationStyles = [
  { id: "fade", name: "Desvanecer" },
  { id: "slide", name: "Deslizar" },
  { id: "expand", name: "Expandir" },
  { id: "bounce", name: "Rebotar" },
  { id: "zoom", name: "Zoom" },
]

// Tipos de secciones
interface Section {
  id: string
  type: string
  content: any
}

// Tipos de características
interface Feature {
  id: string
  icon: string
  title: string
  description: string
}

// Tipos de elementos de galería
interface GalleryItem {
  id: string
  type: "image" | "video"
  url: string
  caption: string
}

// Tipos de especificaciones
interface Spec {
  id: string
  name: string
  value: string
}

interface FreeFormProps {
  onGenerate: (code: string) => void
}

export default function FreeForm({ onGenerate }: FreeFormProps) {
  // Estado global
  const [globalSettings, setGlobalSettings] = useState({
    backgroundColor: "#0a0a0a",
    cardBackgroundColor: "#1a1a1a",
    textColor: "#ffffff",
    accentColor: "#3b82f6",
    highlightColor: "#f97316",
    borderColor: "#2a2a2a",
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    selectedTheme: "dark",
    layoutStyle: "minimal",
    animationStyle: "fade",
    showAnimations: true,
    showGlowEffect: true,
    showParallaxEffect: false,
    productName: "Mi Producto",
    productTagline: "Una descripción breve y atractiva",
  })

  // Estado de las secciones
  const [sections, setSections] = useState<Section[]>([
    {
      id: "section-1",
      type: "hero",
      content: {
        title: "Mi Producto",
        subtitle: "Una descripción breve y atractiva",
        description: "Descripción más detallada del producto y sus beneficios principales.",
        mainImage: "",
        logoImage: "",
        heroVideo: "",
        showLogo: true,
        showMainImage: true,
        showVideo: false,
      },
    },
  ])

  // Añade esto junto a los otros estados al inicio del componente
  const [grids, setGrids] = useState<
    Array<{
      id: string
      title: string
      columns: number
      items: Array<{
        id: string
        type: "image" | "video"
        url: string
        caption: string
      }>
    }>
  >([])

  // Función para añadir una nueva sección
  const addSection = (type: string) => {
    const newId = `section-${sections.length + 1}-${Date.now()}`
    let newContent = {}

    // Configurar contenido inicial según el tipo
    switch (type) {
      case "hero":
        newContent = {
          title: globalSettings.productName,
          subtitle: globalSettings.productTagline,
          description: "Descripción más detallada del producto y sus beneficios principales.",
          mainImage: "",
          logoImage: "",
          heroVideo: "",
          showLogo: true,
          showMainImage: true,
          showVideo: false,
        }
        break
      case "text":
        newContent = {
          title: "Título de la sección",
          content:
            "Contenido detallado de esta sección. Puedes describir características, beneficios o cualquier información relevante sobre tu producto.",
          alignment: "center",
          showTitle: true,
        }
        break
      case "image":
        newContent = {
          imageUrl: "",
          caption: "Descripción de la imagen",
          alignment: "center",
          showCaption: true,
          imageSize: "medium",
        }
        break
      case "video":
        newContent = {
          videoUrl: "",
          caption: "Descripción del video",
          showCaption: true,
        }
        break
      case "features":
        newContent = {
          title: "Características",
          features: [
            {
              id: `feature-1-${Date.now()}`,
              icon: "⭐",
              title: "Característica 1",
              description: "Descripción de la característica 1",
            },
            {
              id: `feature-2-${Date.now()}`,
              icon: "🚀",
              title: "Característica 2",
              description: "Descripción de la característica 2",
            },
          ],
          layout: "grid",
          showTitle: true,
        }
        break
      case "gallery":
        newContent = {
          title: "Galería",
          items: [
            {
              id: `gallery-1-${Date.now()}`,
              type: "image",
              url: "",
              caption: "Imagen 1",
            },
          ],
          showTitle: true,
        }
        break
      case "specs":
        newContent = {
          title: "Especificaciones",
          specs: [
            {
              id: `spec-1-${Date.now()}`,
              name: "Especificación 1",
              value: "Valor 1",
            },
            {
              id: `spec-2-${Date.now()}`,
              name: "Especificación 2",
              value: "Valor 2",
            },
          ],
          showTitle: true,
        }
        break
      case "cta":
        newContent = {
          title: "¿Listo para comenzar?",
          subtitle: "Adquiere tu producto ahora",
          buttonText: "Comprar ahora",
          buttonLink: "#",
          showTitle: true,
          showSubtitle: true,
          backgroundColor: globalSettings.accentColor,
        }
        break
    }

    setSections([...sections, { id: newId, type, content: newContent }])
  }

  // Función para eliminar una sección
  const removeSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))
  }

  // Función para actualizar el contenido de una sección
  const updateSectionContent = (id: string, content: any) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, content: { ...section.content, ...content } } : section,
      ),
    )
  }

  // Función para mover una sección hacia arriba
  const moveSectionUp = (index: number) => {
    if (index === 0) return
    const newSections = [...sections]
    const temp = newSections[index]
    newSections[index] = newSections[index - 1]
    newSections[index - 1] = temp
    setSections(newSections)
  }

  // Función para mover una sección hacia abajo
  const moveSectionDown = (index: number) => {
    if (index === sections.length - 1) return
    const newSections = [...sections]
    const temp = newSections[index]
    newSections[index] = newSections[index + 1]
    newSections[index + 1] = temp
    setSections(newSections)
  }

  // Función para manejar el drag and drop
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSections(items)
  }

  // Función para manejar cambios en el tema global
  const handleThemeChange = (theme: string) => {
    const selectedTheme = colorThemes[theme as keyof typeof colorThemes]
    setGlobalSettings({
      ...globalSettings,
      selectedTheme: theme,
      backgroundColor: selectedTheme.backgroundColor,
      cardBackgroundColor: selectedTheme.cardBackgroundColor,
      textColor: selectedTheme.textColor,
      accentColor: selectedTheme.accentColor,
      highlightColor: selectedTheme.highlightColor,
      borderColor: selectedTheme.borderColor,
    })
  }

  // Función para manejar cambios en los ajustes globales
  const handleGlobalSettingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    setGlobalSettings({ ...globalSettings, [id]: value })
  }

  // Función para manejar cambios en los switches globales
  const handleGlobalSwitchChange = (id: string, checked: boolean) => {
    setGlobalSettings({ ...globalSettings, [id]: checked })
  }

  const addGridItem = (gridId: string, type: "image" | "video") => {
    setGrids(
      grids.map((grid) => {
        if (grid.id === gridId) {
          return {
            ...grid,
            items: [
              ...grid.items,
              {
                id: uuidv4(),
                type,
                url: "",
                caption: "",
              },
            ],
          }
        }
        return grid
      }),
    )
  }

  const updateGridItem = (gridId: string, itemId: string, field: string, value: string) => {
    setGrids(
      grids.map((grid) => {
        if (grid.id === gridId) {
          return {
            ...grid,
            items: grid.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, [field]: value }
              }
              return item
            }),
          }
        }
        return grid
      }),
    )
  }

  const removeGridItem = (gridId: string, itemId: string) => {
    setGrids(
      grids.map((grid) => {
        if (grid.id === gridId) {
          return {
            ...grid,
            items: grid.items.filter((item) => item.id !== itemId),
          }
        }
        return grid
      }),
    )
  }

  const updateGrid = (id: string, field: string, value: any) => {
    setGrids(
      grids.map((grid) => {
        if (grid.id === id) {
          return { ...grid, [field]: value }
        }
        return grid
      }),
    )
  }

  const removeGrid = (id: string) => {
    setGrids(grids.filter((grid) => grid.id !== id))
  }

  // Función para generar el código HTML
  const generateFreeContent = () => {
    const {
      backgroundColor,
      cardBackgroundColor,
      textColor,
      accentColor,
      highlightColor,
      borderColor,
      fontFamily,
      layoutStyle,
      animationStyle,
      showAnimations,
      showGlowEffect,
      showParallaxEffect,
    } = globalSettings

    // Generar estilos específicos según el diseño seleccionado
    const generateLayoutStyles = () => {
      let styles = ""

      // Estilos de layout según el tipo
      if (layoutStyle === "minimal") {
        styles += `
          .section {
            padding: 60px 40px;
          }
          .card {
            background: ${cardBackgroundColor}80;
            backdrop-filter: blur(10px);
          }
        `
      } else if (layoutStyle === "gradient") {
        styles += `
          .section:nth-child(odd) {
            background: linear-gradient(135deg, ${backgroundColor}, ${cardBackgroundColor});
          }
          .section:nth-child(even) {
            background: linear-gradient(135deg, ${cardBackgroundColor}, ${backgroundColor});
          }
        `
      } else if (layoutStyle === "material") {
        styles += `
          .section {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .card {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        `
      } else if (layoutStyle === "vibrant") {
        styles += `
          .section:nth-child(odd) {
            background: ${backgroundColor};
          }
          .section:nth-child(even) {
            background: ${accentColor}20;
          }
        `
      } else if (layoutStyle === "elegant") {
        styles += `
          .section {
            border-bottom: 1px solid ${borderColor};
          }
          .card {
            border: 1px solid ${borderColor};
          }
        `
      } else if (layoutStyle === "clean") {
        styles += `
          .section {
            background: ${backgroundColor};
          }
          .card {
            background: ${cardBackgroundColor};
          }
        `
      }

      // Estilos de animación
      if (animationStyle === "fade" && showAnimations) {
        styles += `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate {
            animation: fadeIn 1s ease-out;
          }
        `
      } else if (animationStyle === "slide" && showAnimations) {
        styles += `
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate {
            animation: slideUp 1s ease-out;
          }
        `
      } else if (animationStyle === "expand" && showAnimations) {
        styles += `
          @keyframes expand {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate {
            animation: expand 1s ease-out;
          }
        `
      } else if (animationStyle === "bounce" && showAnimations) {
        styles += `
          @keyframes bounce {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          .animate-bounce {
            animation: bounce 3s infinite ease-in-out;
          }
        `
      } else if (animationStyle === "zoom" && showAnimations) {
        styles += `
          @keyframes zoom {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate {
            animation: zoom 1s ease-out;
          }
        `
      }

      return styles
    }

    // Generar HTML para cada sección
    const generateSectionHTML = (section: Section, index: number) => {
      const { type, content } = section
      let sectionHTML = ""

      switch (type) {
        case "hero":
          sectionHTML = `
            <section class="section hero-section ${showAnimations ? "animate" : ""}">
              ${showParallaxEffect ? '<div class="parallax-bg"></div>' : ""}
              <div class="container">
                ${content.showLogo && content.logoImage ? `<img src="${content.logoImage}" alt="Logo" class="logo">` : ""}
                <h1 class="title">${content.title}</h1>
                <p class="subtitle">${content.subtitle}</p>
                <p class="description">${content.description}</p>
                ${
                  content.showMainImage && content.mainImage
                    ? `
                  <div class="main-image-container">
                    <img src="${content.mainImage}" alt="${content.title}" class="main-image ${showAnimations ? "animate-bounce" : ""}">
                  </div>
                `
                    : ""
                }
                ${
                  content.showVideo && content.heroVideo
                    ? `
                  <div class="video-container">
                    <iframe class="video" src="${generateYouTubeEmbedUrl(content.heroVideo)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                `
                    : ""
                }
              </div>
            </section>
          `
          break
        case "text":
          sectionHTML = `
            <section class="section text-section ${showAnimations ? "animate" : ""}">
              <div class="container text-${content.alignment}">
                ${content.showTitle ? `<h2 class="section-title">${content.title}</h2>` : ""}
                <div class="text-content">
                  ${content.content}
                </div>
              </div>
            </section>
          `
          break
        case "image":
          sectionHTML = `
            <section class="section image-section ${showAnimations ? "animate" : ""}">
              <div class="container text-${content.alignment}">
                <div class="image-container image-size-${content.imageSize}">
                  <img src="${content.imageUrl}" alt="${content.caption}" class="image">
                  ${content.showCaption ? `<p class="image-caption">${content.caption}</p>` : ""}
                </div>
              </div>
            </section>
          `
          break
        case "video":
          sectionHTML = `
            <section class="section video-section ${showAnimations ? "animate" : ""}">
              <div class="container">
                <div class="video-container">
                  <iframe class="video" src="${generateYouTubeEmbedUrl(content.videoUrl)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  ${content.showCaption ? `<p class="video-caption">${content.caption}</p>` : ""}
                </div>
              </div>
            </section>
          `
          break
        case "features":
          sectionHTML = `
            <section class="section features-section ${showAnimations ? "animate" : ""}">
              <div class="container">
                ${content.showTitle ? `<h2 class="section-title">${content.title}</h2>` : ""}
                <div class="features-layout-${content.layout}">
                  ${content.features
                    .map(
                      (feature: Feature, i: number) => `
                    <div class="feature-card" style="${showAnimations ? `animation-delay: ${i * 0.1}s;` : ""}">
                      <div class="feature-icon">${feature.icon}</div>
                      <h3 class="feature-title">${feature.title}</h3>
                      <p class="feature-description">${feature.description}</p>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            </section>
          `
          break
        case "gallery":
          sectionHTML = `
            <section class="section gallery-section ${showAnimations ? "animate" : ""}">
              <div class="container">
                ${content.showTitle ? `<h2 class="section-title">${content.title}</h2>` : ""}
                <div class="gallery-grid">
                  ${content.items
                    .map(
                      (item: GalleryItem, i: number) => `
                    <div class="gallery-item" style="${showAnimations ? `animation-delay: ${i * 0.1}s;` : ""}">
                      ${
                        item.type === "image"
                          ? `<img src="${item.url}" alt="${item.caption}" class="gallery-image">`
                          : `<iframe class="gallery-video" src="${generateYouTubeEmbedUrl(item.url)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                      }
                      <div class="gallery-caption">${item.caption}</div>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            </section>
          `
          break
        case "specs":
          sectionHTML = `
            <section class="section specs-section ${showAnimations ? "animate" : ""}">
              <div class="container">
                ${content.showTitle ? `<h2 class="section-title">${content.title}</h2>` : ""}
                <table class="specs-table">
                  <tbody>
                    ${content.specs
                      .map(
                        (spec: Spec) => `
                      <tr>
                        <th>${spec.name}</th>
                        <td>${spec.value}</td>
                      </tr>
                    `,
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </section>
          `
          break
        case "cta":
          sectionHTML = `
            <section class="section cta-section ${showAnimations ? "animate" : ""}" style="background-color: ${content.backgroundColor};">
              <div class="container text-center">
                ${content.showTitle ? `<h2 class="cta-title">${content.title}</h2>` : ""}
                ${content.showSubtitle ? `<p class="cta-subtitle">${content.subtitle}</p>` : ""}
                <a href="${content.buttonLink}" class="cta-button">${content.buttonText}</a>
              </div>
            </section>
          `
          break
      }

      return sectionHTML
    }

    // Generar el HTML completo
    const freeContentHtml = `
      <style>
        /* Estilos globales */
        .free-content-container {
          font-family: ${fontFamily};
          width: 100%;
          margin: 0 auto;
          background-color: ${backgroundColor};
          color: ${textColor};
          overflow: hidden;
          box-sizing: border-box;
        }

        .section {
          padding: 60px 40px;
          position: relative;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Estilos de parallax */
        ${
          showParallaxEffect
            ? `
        .parallax-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 50%, ${accentColor}10 5%, transparent 30%),
                    radial-gradient(circle at 70% 70%, ${highlightColor}10 5%, transparent 30%);
          opacity: 0.6;
          z-index: 1;
        }
        `
            : ""
        }

        /* Estilos de sección Hero */
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 80px 40px;
          background: linear-gradient(135deg, ${backgroundColor}, ${cardBackgroundColor});
          min-height: 500px;
        }

        .logo {
          max-width: 180px;
          margin-bottom: 30px;
        }

        .title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 15px;
          background: linear-gradient(to right, ${textColor}, ${accentColor});
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .subtitle {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .description {
          max-width: 700px;
          margin: 0 auto 40px;
          line-height: 1.6;
          font-size: 1.1rem;
          opacity: 0.8;
        }

        .main-image-container {
          width: 100%;
          max-width: 500px;
          margin: 20px auto;
        }

        .main-image {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          ${showGlowEffect ? `filter: drop-shadow(0 0 20px ${accentColor}60);` : ""}
        }

        /* Estilos de sección de texto */
        .text-section {
          background-color: ${backgroundColor};
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: ${accentColor};
          text-align: center;
        }

        .text-content {
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .text-center {
          text-align: center;
        }

        .text-left {
          text-align: left;
        }

        .text-right {
          text-align: right;
        }

        /* Estilos de sección de imagen */
        .image-section {
          background-color: ${cardBackgroundColor};
        }

        .image-container {
          margin: 0 auto;
        }

        .image-size-small {
          max-width: 300px;
        }

        .image-size-medium {
          max-width: 500px;
        }

        .image-size-large {
          max-width: 800px;
        }

        .image {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .image-caption, .video-caption {
          margin-top: 15px;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Estilos de sección de video */
        .video-section {
          background-color: ${backgroundColor};
        }

        .video-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .video {
          width: 100%;
          height: 450px;
          border: none;
        }

        /* Estilos de sección de características */
        .features-section {
          background-color: ${cardBackgroundColor};
        }

        .features-layout-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .features-layout-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .feature-card {
          background: linear-gradient(145deg, ${backgroundColor}80, ${cardBackgroundColor});
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid ${borderColor};
          transition: all 0.3s ease;
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

        /* Estilos de sección de galería */
        .gallery-section {
          background-color: ${backgroundColor};
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

        /* Estilos de sección de especificaciones */
        .specs-section {
          background-color: ${cardBackgroundColor};
        }

        .specs-table {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          border-collapse: collapse;
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

        /* Estilos de sección de llamada a la acción */
        .cta-section {
          text-align: center;
          padding: 80px 40px;
        }

        .cta-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: ${textColor};
        }

        .cta-subtitle {
          font-size: 1.5rem;
          margin-bottom: 40px;
          opacity: 0.9;
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
        }

        .cta-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px ${accentColor}60;
        }

        /* Estilos específicos de layout y animaciones */
        ${generateLayoutStyles()}

        /* Responsive */
        @media (max-width: 768px) {
          .section {
            padding: 40px 20px;
          }

          .title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1.2rem;
          }

          .description {
            font-size: 1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .video {
            height: 300px;
          }

          .feature-card {
            padding: 20px;
          }

          .cta-title {
            font-size: 2.5rem;
          }

          .cta-subtitle {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .section {
            padding: 30px 15px;
          }

          .title {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .description {
            font-size: 0.9rem;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .video {
            height: 200px;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .features-layout-grid {
            grid-template-columns: 1fr;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-subtitle {
            font-size: 1rem;
          }

          .cta-button {
            padding: 12px 30px;
            font-size: 1rem;
          }
        }

        /* Grid Layout Styles */
        .grid-container {
          display: grid;
          gap: 10px;
          width: 100%;
          grid-template-areas:
            "big-left top-middle top-middle top-right"
            "big-left middle-left middle-right bottom-right"
            "big-left bottom-left bottom-middle bottom-right";
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
        }

        .grid-item {
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          min-height: 200px;
        }

        .grid-item img, .grid-item iframe {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }

        .grid-item:nth-child(1) {
          grid-area: big-left;
        }

        .grid-item:nth-child(2) {
          grid-area: top-middle;
        }

        .grid-item:nth-child(3) {
          grid-area: top-right;
        }

        .grid-item:nth-child(4) {
          grid-area: middle-left;
        }

        .grid-item:nth-child(5) {
          grid-area: middle-right;
        }

        .grid-item:nth-child(6) {
          grid-area: bottom-left;
        }

        .grid-item:nth-child(7) {
          grid-area: bottom-middle;
        }

        .grid-item:nth-child(8) {
          grid-area: bottom-right;
        }

        .grid-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .grid-container {
            grid-template-areas:
              "big-left big-left"
              "top-middle top-right"
              "middle-left middle-right"
              "bottom-left bottom-middle"
              "bottom-right bottom-right";
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
        }

        @media (max-width: 480px) {
          .grid-container {
            grid-template-areas:
              "big-left"
              "top-middle"
              "top-right"
              "middle-left"
              "middle-right"
              "bottom-left"
              "bottom-middle"
              "bottom-right";
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="free-content-container">
        ${sections.map((section, index) => generateSectionHTML(section, index)).join("")}
        ${grids
          .map(
            (grid) => `
  <div class="grid-section">
    <h3 class="grid-title">${grid.title}</h3>
    <div class="grid-container">
      ${grid.items
        .map(
          (item) => `
        <div class="grid-item">
          ${
            item.type === "image"
              ? `<img src="${item.url}" alt="${item.caption}" loading="lazy">`
              : `<iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>`
          }
          ${item.caption ? `<div class="grid-caption">${item.caption}</div>` : ""}
        </div>
      `,
        )
        .join("")}
    </div>
  </div>
`,
          )
          .join("")}
      </div>
    `

    onGenerate(freeContentHtml)
  }

  // Renderizar el editor de secciones
  const renderSectionEditor = (section: Section, index: number) => {
    const { type, content } = section

    switch (type) {
      case "hero":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label className="text-blue-300">Título</Label>
              <Input
                value={content.title}
                onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                className="skeuomorphic-input"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Subtítulo</Label>
              <Input
                value={content.subtitle}
                onChange={(e) => updateSectionContent(section.id, { subtitle: e.target.value })}
                className="skeuomorphic-input"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Descripción</Label>
              <Textarea
                value={content.description}
                onChange={(e) => updateSectionContent(section.id, { description: e.target.value })}
                rows={3}
                className="skeuomorphic-input"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Logo (opcional)</Label>
                <Switch
                  checked={content.showLogo}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showLogo: checked })}
                />
              </div>
              {content.showLogo && (
                <Input
                  value={content.logoImage}
                  onChange={(e) => updateSectionContent(section.id, { logoImage: e.target.value })}
                  placeholder="URL del logo"
                  className="skeuomorphic-input"
                />
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Imagen principal</Label>
                <Switch
                  checked={content.showMainImage}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showMainImage: checked })}
                />
              </div>
              {content.showMainImage && (
                <Input
                  value={content.mainImage}
                  onChange={(e) => updateSectionContent(section.id, { mainImage: e.target.value })}
                  placeholder="URL de la imagen principal"
                  className="skeuomorphic-input"
                />
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Video (opcional)</Label>
                <Switch
                  checked={content.showVideo}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showVideo: checked })}
                />
              </div>
              {content.showVideo && (
                <Input
                  value={content.heroVideo}
                  onChange={(e) => updateSectionContent(section.id, { heroVideo: e.target.value })}
                  placeholder="ID o URL de YouTube"
                  className="skeuomorphic-input"
                />
              )}
            </div>
          </div>
        )
      case "text":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Título</Label>
                <Switch
                  checked={content.showTitle}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showTitle: checked })}
                />
              </div>
              {content.showTitle && (
                <Input
                  value={content.title}
                  onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                  className="skeuomorphic-input"
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Contenido</Label>
              <Textarea
                value={content.content}
                onChange={(e) => updateSectionContent(section.id, { content: e.target.value })}
                rows={5}
                className="skeuomorphic-input"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Alineación</Label>
              <Select
                value={content.alignment}
                onValueChange={(value) => updateSectionContent(section.id, { alignment: value })}
              >
                <SelectTrigger className="skeuomorphic-input">
                  <SelectValue placeholder="Seleccionar alineación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Izquierda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Derecha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "image":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label className="text-blue-300">URL de la imagen</Label>
              <Input
                value={content.imageUrl}
                onChange={(e) => updateSectionContent(section.id, { imageUrl: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="skeuomorphic-input"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Descripción</Label>
                <Switch
                  checked={content.showCaption}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showCaption: checked })}
                />
              </div>
              {content.showCaption && (
                <Input
                  value={content.caption}
                  onChange={(e) => updateSectionContent(section.id, { caption: e.target.value })}
                  className="skeuomorphic-input"
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Alineación</Label>
              <Select
                value={content.alignment}
                onValueChange={(value) => updateSectionContent(section.id, { alignment: value })}
              >
                <SelectTrigger className="skeuomorphic-input">
                  <SelectValue placeholder="Seleccionar alineación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Izquierda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Derecha</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Tamaño</Label>
              <Select
                value={content.imageSize}
                onValueChange={(value) => updateSectionContent(section.id, { imageSize: value })}
              >
                <SelectTrigger className="skeuomorphic-input">
                  <SelectValue placeholder="Seleccionar tamaño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeño</SelectItem>
                  <SelectItem value="medium">Mediano</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "video":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label className="text-blue-300">URL o ID del video de YouTube</Label>
              <Input
                value={content.videoUrl}
                onChange={(e) => updateSectionContent(section.id, { videoUrl: e.target.value })}
                placeholder="dQw4w9WgXcQ o https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="skeuomorphic-input"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Descripción</Label>
                <Switch
                  checked={content.showCaption}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showCaption: checked })}
                />
              </div>
              {content.showCaption && (
                <Input
                  value={content.caption}
                  onChange={(e) => updateSectionContent(section.id, { caption: e.target.value })}
                  className="skeuomorphic-input"
                />
              )}
            </div>
          </div>
        )
      case "features":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Título</Label>
                <Switch
                  checked={content.showTitle}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showTitle: checked })}
                />
              </div>
              {content.showTitle && (
                <Input
                  value={content.title}
                  onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                  className="skeuomorphic-input"
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Diseño</Label>
              <Select
                value={content.layout}
                onValueChange={(value) => updateSectionContent(section.id, { layout: value })}
              >
                <SelectTrigger className="skeuomorphic-input">
                  <SelectValue placeholder="Seleccionar diseño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Cuadrícula</SelectItem>
                  <SelectItem value="list">Lista</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-blue-300">Características</Label>
                <Button
                  onClick={() => {
                    const newFeatures = [
                      ...content.features,
                      {
                        id: `feature-${content.features.length + 1}-${Date.now()}`,
                        icon: "⭐",
                        title: `Característica ${content.features.length + 1}`,
                        description: `Descripción de la característica ${content.features.length + 1}`,
                      },
                    ]
                    updateSectionContent(section.id, { features: newFeatures })
                  }}
                  className="skeuomorphic-button-secondary flex items-center gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Agregar
                </Button>
              </div>
              {content.features.map((feature: Feature, featureIndex: number) => (
                <div key={feature.id} className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-md font-medium text-blue-300">Característica {featureIndex + 1}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newFeatures = content.features.filter((f: Feature) => f.id !== feature.id)
                        updateSectionContent(section.id, { features: newFeatures })
                      }}
                      className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label className="text-blue-300">Icono</Label>
                      <Input
                        value={feature.icon}
                        onChange={(e) => {
                          const newFeatures = [...content.features]
                          newFeatures[featureIndex] = { ...feature, icon: e.target.value }
                          updateSectionContent(section.id, { features: newFeatures })
                        }}
                        className="skeuomorphic-input"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-blue-300">Título</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => {
                          const newFeatures = [...content.features]
                          newFeatures[featureIndex] = { ...feature, title: e.target.value }
                          updateSectionContent(section.id, { features: newFeatures })
                        }}
                        className="skeuomorphic-input"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-blue-300">Descripción</Label>
                      <Input
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...content.features]
                          newFeatures[featureIndex] = { ...feature, description: e.target.value }
                          updateSectionContent(section.id, { features: newFeatures })
                        }}
                        className="skeuomorphic-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "gallery":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Título</Label>
                <Switch
                  checked={content.showTitle}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showTitle: checked })}
                />
              </div>
              {content.showTitle && (
                <Input
                  value={content.title}
                  onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                  className="skeuomorphic-input"
                />
              )}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-blue-300">Elementos de la galería</Label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      const newItems = [
                        ...content.items,
                        {
                          id: `gallery-${content.items.length + 1}-${Date.now()}`,
                          type: "image",
                          url: "",
                          caption: `Imagen ${content.items.length + 1}`,
                        },
                      ]
                      updateSectionContent(section.id, { items: newItems })
                    }}
                    className="skeuomorphic-button-secondary flex items-center gap-2"
                  >
                    <ImagePlus className="h-4 w-4" />
                    Agregar Imagen
                  </Button>
                  <Button
                    onClick={() => {
                      const newItems = [
                        ...content.items,
                        {
                          id: `gallery-${content.items.length + 1}-${Date.now()}`,
                          type: "video",
                          url: "",
                          caption: `Video ${content.items.length + 1}`,
                        },
                      ]
                      updateSectionContent(section.id, { items: newItems })
                    }}
                    className="skeuomorphic-button-secondary flex items-center gap-2"
                  >
                    <Youtube className="h-4 w-4" />
                    Agregar Video
                  </Button>
                </div>
              </div>
              {content.items.map((item: GalleryItem, itemIndex: number) => (
                <div key={item.id} className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-md font-medium text-blue-300">
                      {item.type === "image" ? "Imagen" : "Video"} {itemIndex + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newItems = content.items.filter((i: GalleryItem) => i.id !== item.id)
                        updateSectionContent(section.id, { items: newItems })
                      }}
                      className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label className="text-blue-300">
                        {item.type === "image" ? "URL de la imagen" : "ID o URL del video de YouTube"}
                      </Label>
                      <Input
                        value={item.url}
                        onChange={(e) => {
                          const newItems = [...content.items]
                          newItems[itemIndex] = { ...item, url: e.target.value }
                          updateSectionContent(section.id, { items: newItems })
                        }}
                        placeholder={item.type === "image" ? "https://ejemplo.com/imagen.jpg" : "dQw4w9WgXcQ"}
                        className="skeuomorphic-input"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-blue-300">Descripción</Label>
                      <Input
                        value={item.caption}
                        onChange={(e) => {
                          const newItems = [...content.items]
                          newItems[itemIndex] = { ...item, caption: e.target.value }
                          updateSectionContent(section.id, { items: newItems })
                        }}
                        className="skeuomorphic-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "specs":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Título</Label>
                <Switch
                  checked={content.showTitle}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showTitle: checked })}
                />
              </div>
              {content.showTitle && (
                <Input
                  value={content.title}
                  onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                  className="skeuomorphic-input"
                />
              )}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-blue-300">Especificaciones</Label>
                <Button
                  onClick={() => {
                    const newSpecs = [
                      ...content.specs,
                      {
                        id: `spec-${content.specs.length + 1}-${Date.now()}`,
                        name: `Especificación ${content.specs.length + 1}`,
                        value: `Valor ${content.specs.length + 1}`,
                      },
                    ]
                    updateSectionContent(section.id, { specs: newSpecs })
                  }}
                  className="skeuomorphic-button-secondary flex items-center gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Agregar
                </Button>
              </div>
              {content.specs.map((spec: Spec, specIndex: number) => (
                <div key={spec.id} className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-md font-medium text-blue-300">Especificación {specIndex + 1}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newSpecs = content.specs.filter((s: Spec) => s.id !== spec.id)
                        updateSectionContent(section.id, { specs: newSpecs })
                      }}
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
                        onChange={(e) => {
                          const newSpecs = [...content.specs]
                          newSpecs[specIndex] = { ...spec, name: e.target.value }
                          updateSectionContent(section.id, { specs: newSpecs })
                        }}
                        className="skeuomorphic-input"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-blue-300">Valor</Label>
                      <Input
                        value={spec.value}
                        onChange={(e) => {
                          const newSpecs = [...content.specs]
                          newSpecs[specIndex] = { ...spec, value: e.target.value }
                          updateSectionContent(section.id, { specs: newSpecs })
                        }}
                        className="skeuomorphic-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "cta":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Título</Label>
                <Switch
                  checked={content.showTitle}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showTitle: checked })}
                />
              </div>
              {content.showTitle && (
                <Input
                  value={content.title}
                  onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                  className="skeuomorphic-input"
                />
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-blue-300">Subtítulo</Label>
                <Switch
                  checked={content.showSubtitle}
                  onCheckedChange={(checked) => updateSectionContent(section.id, { showSubtitle: checked })}
                />
              </div>
              {content.showSubtitle && (
                <Input
                  value={content.subtitle}
                  onChange={(e) => updateSectionContent(section.id, { subtitle: e.target.value })}
                  className="skeuomorphic-input"
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Texto del botón</Label>
              <Input
                value={content.buttonText}
                onChange={(e) => updateSectionContent(section.id, { buttonText: e.target.value })}
                className="skeuomorphic-input"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Enlace del botón</Label>
              <Input
                value={content.buttonLink}
                onChange={(e) => updateSectionContent(section.id, { buttonLink: e.target.value })}
                className="skeuomorphic-input"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-300">Color de fondo</Label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={content.backgroundColor}
                  onChange={(e) => updateSectionContent(section.id, { backgroundColor: e.target.value })}
                  className="color-input"
                />
                <div className="color-preview" style={{ backgroundColor: content.backgroundColor }}>
                  {content.backgroundColor}
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 skeuomorphic-section p-6">
      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 text-blue-300">Configuración Global</h3>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 skeuomorphic-tabs">
              <TabsTrigger value="basic" className="skeuomorphic-tab">
                <Layout className="h-4 w-4 mr-2" />
                Información Básica
              </TabsTrigger>
              <TabsTrigger value="appearance" className="skeuomorphic-tab">
                <Palette className="h-4 w-4 mr-2" />
                Apariencia
              </TabsTrigger>
              <TabsTrigger value="effects" className="skeuomorphic-tab">
                <Sliders className="h-4 w-4 mr-2" />
                Efectos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="productName" className="text-blue-300 font-medium">
                  Nombre del Producto
                </Label>
                <Input
                  id="productName"
                  value={globalSettings.productName}
                  onChange={handleGlobalSettingChange}
                  className="skeuomorphic-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="productTagline" className="text-blue-300 font-medium">
                  Eslogan del Producto
                </Label>
                <Input
                  id="productTagline"
                  value={globalSettings.productTagline}
                  onChange={handleGlobalSettingChange}
                  className="skeuomorphic-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fontFamily" className="text-blue-300 font-medium">
                  Fuente
                </Label>
                <Select
                  value={globalSettings.fontFamily}
                  onValueChange={(value) => setGlobalSettings({ ...globalSettings, fontFamily: value })}
                >
                  <SelectTrigger className="skeuomorphic-input">
                    <SelectValue placeholder="Seleccionar fuente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif">
                      Sistema (Segoe UI, Roboto)
                    </SelectItem>
                    <SelectItem value="'Poppins', sans-serif">Poppins</SelectItem>
                    <SelectItem value="'Montserrat', sans-serif">Montserrat</SelectItem>
                    <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                    <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
                    <SelectItem value="'Roboto Mono', monospace">Roboto Mono</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-blue-300 font-medium">Tema de Color</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {Object.entries(colorThemes).map(([key, theme]) => (
                    <button
                      key={key}
                      type="button"
                      className={`p-2 rounded-md transition-all ${
                        globalSettings.selectedTheme === key ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: theme.backgroundColor,
                        border: `1px solid ${theme.accentColor}`,
                      }}
                      onClick={() => handleThemeChange(key)}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: theme.accentColor }}></div>
                        <div
                          className="w-full h-2 rounded-full"
                          style={{ backgroundColor: theme.highlightColor }}
                        ></div>
                        <span className="text-xs font-medium mt-1" style={{ color: theme.textColor }}>
                          {theme.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="layoutStyle" className="text-blue-300 font-medium">
                  Estilo de Diseño
                </Label>
                <Select
                  value={globalSettings.layoutStyle}
                  onValueChange={(value) => setGlobalSettings({ ...globalSettings, layoutStyle: value })}
                >
                  <SelectTrigger className="skeuomorphic-input">
                    <SelectValue placeholder="Seleccionar estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    {layoutStyles.map((style) => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="backgroundColor" className="text-blue-300 font-medium">
                    Color de fondo
                  </Label>
                  <div className="color-input-wrapper">
                    <input
                      id="backgroundColor"
                      type="color"
                      value={globalSettings.backgroundColor}
                      onChange={handleGlobalSettingChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: globalSettings.backgroundColor }}>
                      {globalSettings.backgroundColor}
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
                      value={globalSettings.cardBackgroundColor}
                      onChange={handleGlobalSettingChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: globalSettings.cardBackgroundColor }}>
                      {globalSettings.cardBackgroundColor}
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
                      value={globalSettings.textColor}
                      onChange={handleGlobalSettingChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: globalSettings.textColor }}>
                      {globalSettings.textColor}
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
                      value={globalSettings.accentColor}
                      onChange={handleGlobalSettingChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: globalSettings.accentColor }}>
                      {globalSettings.accentColor}
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
                      value={globalSettings.highlightColor}
                      onChange={handleGlobalSettingChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: globalSettings.highlightColor }}>
                      {globalSettings.highlightColor}
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
                      value={globalSettings.borderColor}
                      onChange={handleGlobalSettingChange}
                      className="color-input"
                    />
                    <div className="color-preview" style={{ backgroundColor: globalSettings.borderColor }}>
                      {globalSettings.borderColor}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="effects" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="animationStyle" className="text-blue-300 font-medium">
                  Estilo de Animación
                </Label>
                <Select
                  value={globalSettings.animationStyle}
                  onValueChange={(value) => setGlobalSettings({ ...globalSettings, animationStyle: value })}
                >
                  <SelectTrigger className="skeuomorphic-input">
                    <SelectValue placeholder="Seleccionar animación" />
                  </SelectTrigger>
                  <SelectContent>
                    {animationStyles.map((style) => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showAnimations" className="text-blue-300 font-medium">
                      Mostrar Animaciones
                    </Label>
                    <p className="text-sm text-muted-foreground">Agrega animaciones a los elementos</p>
                  </div>
                  <Switch
                    id="showAnimations"
                    checked={globalSettings.showAnimations}
                    onCheckedChange={(checked) => handleGlobalSwitchChange("showAnimations", checked)}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showGlowEffect" className="text-blue-300 font-medium">
                      Efecto de Brillo
                    </Label>
                    <p className="text-sm text-muted-foreground">Agrega un brillo suave alrededor de las imágenes</p>
                  </div>
                  <Switch
                    id="showGlowEffect"
                    checked={globalSettings.showGlowEffect}
                    onCheckedChange={(checked) => handleGlobalSwitchChange("showGlowEffect", checked)}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showParallaxEffect" className="text-blue-300 font-medium">
                      Efecto Parallax
                    </Label>
                    <p className="text-sm text-muted-foreground">Agrega un efecto de fondo con parallax</p>
                  </div>
                  <Switch
                    id="showParallaxEffect"
                    checked={globalSettings.showParallaxEffect}
                    onCheckedChange={(checked) => handleGlobalSwitchChange("showParallaxEffect", checked)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-blue-300">Secciones</h3>
            <Select
              onValueChange={(value) => {
                if (value === "grid") {
                  setGrids([
                    ...grids,
                    {
                      id: uuidv4(),
                      title: "Galería",
                      columns: 2,
                      items: [],
                    },
                  ])
                } else {
                  addSection(value)
                }
              }}
            >
              <SelectTrigger className="skeuomorphic-input w-[200px]">
                <SelectValue placeholder="Agregar sección" />
              </SelectTrigger>
              <SelectContent>
                {/* Aquí se muestran todas las opciones de secciones, incluyendo grids para todos los productos */}
                {sectionTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center gap-2">
                      {type.icon}
                      {type.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {sections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <div {...provided.dragHandleProps} className="cursor-move p-1">
                                <MoveVertical className="h-5 w-5 text-gray-500" />
                              </div>
                              <h4 className="text-md font-medium text-blue-300">
                                {sectionTypes.find((type) => type.id === section.type)?.name || section.type}{" "}
                                {index + 1}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveSectionUp(index)}
                                disabled={index === 0}
                                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveSectionDown(index)}
                                disabled={index === sections.length - 1}
                                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSection(section.id)}
                                className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {renderSectionEditor(section, index)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>

      {grids.map((grid) => (
        <div key={grid.id} className="mb-6 p-4 border rounded-lg bg-card">
          <div className="flex justify-between items-center mb-4">
            <Input
              value={grid.title}
              onChange={(e) => updateGrid(grid.id, "title", e.target.value)}
              placeholder="Título de la galería"
              className="font-medium skeuomorphic-input"
            />
            <div className="flex items-center gap-2">
              <Select
                value={grid.columns.toString()}
                onValueChange={(value) => updateGrid(grid.id, "columns", Number.parseInt(value))}
              >
                <SelectTrigger className="w-[180px] skeuomorphic-input">
                  <SelectValue placeholder="Columnas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Columna</SelectItem>
                  <SelectItem value="2">2 Columnas</SelectItem>
                  <SelectItem value="3">3 Columnas</SelectItem>
                  <SelectItem value="4">4 Columnas</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeGrid(grid.id)}
                className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className={`grid grid-cols-${grid.columns} gap-4 mb-4`}>
            {grid.items.map((item) => (
              <div key={item.id} className="border rounded-lg p-3 bg-gray-900/50 shadow-inner">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-300">
                    {item.type === "image" ? "Imagen" : "Video"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGridItem(grid.id, item.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={item.url}
                  onChange={(e) => updateGridItem(grid.id, item.id, "url", e.target.value)}
                  placeholder={item.type === "image" ? "URL de la imagen" : "URL del video"}
                  className="mb-2 skeuomorphic-input"
                />
                <Input
                  value={item.caption}
                  onChange={(e) => updateGridItem(grid.id, item.id, "caption", e.target.value)}
                  placeholder="Descripción"
                  className="skeuomorphic-input"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addGridItem(grid.id, "image")}
              className="skeuomorphic-button-secondary"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Añadir Imagen
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addGridItem(grid.id, "video")}
              className="skeuomorphic-button-secondary"
            >
              <Video className="h-4 w-4 mr-2" />
              Añadir Video
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={generateFreeContent} className="w-full skeuomorphic-button">
        Generar Contenido
      </Button>
    </div>
  )
}

