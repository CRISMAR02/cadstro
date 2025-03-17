"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import ThemeSelector from "@/components/theme-selector"
// Primero, importar el componente DynamicElementAdder y sus tipos
import DynamicElementAdder, { type DynamicElement, generateElementsHTML } from "@/components/dynamic-element-adder"

// Temas predefinidos para perfumes
const perfumeThemes = {
  elegant: {
    name: "Elegante",
    backgroundColor: "#0f172a",
    cardBackgroundColor: "#1e293b",
    textColor: "#e2e8f0",
    accentColor: "#3b82f6",
    headerShadowColor: "#3b82f6",
    detailShadowColor: "#3b82f6",
  },
  luxury: {
    name: "Lujo",
    backgroundColor: "#1a1a1a",
    cardBackgroundColor: "#2a2a2a",
    textColor: "#f5f5f5",
    accentColor: "#d4af37",
    headerShadowColor: "#d4af37",
    detailShadowColor: "#d4af37",
  },
  nature: {
    name: "Natural",
    backgroundColor: "#1e3a2f",
    cardBackgroundColor: "#2d4f41",
    textColor: "#f0f9f6",
    accentColor: "#6ee7b7",
    headerShadowColor: "#6ee7b7",
    detailShadowColor: "#6ee7b7",
  },
  romantic: {
    name: "Romántico",
    backgroundColor: "#4a1942",
    cardBackgroundColor: "#6b2e5a",
    textColor: "#fdf2f8",
    accentColor: "#fb7185",
    headerShadowColor: "#fb7185",
    detailShadowColor: "#fb7185",
  },
  modern: {
    name: "Moderno",
    backgroundColor: "#0f1729",
    cardBackgroundColor: "#1e293b",
    textColor: "#f8fafc",
    accentColor: "#38bdf8",
    headerShadowColor: "#38bdf8",
    detailShadowColor: "#38bdf8",
  },
  classic: {
    name: "Clásico",
    backgroundColor: "#292524",
    cardBackgroundColor: "#44403c",
    textColor: "#f5f5f4",
    accentColor: "#a8a29e",
    headerShadowColor: "#a8a29e",
    detailShadowColor: "#a8a29e",
  },
}

interface PerfumeFormProps {
  onGenerate: (code: string) => void
}

export default function PerfumeForm({ onGenerate }: PerfumeFormProps) {
  // Agregar dynamicElements al estado del formulario
  const [formData, setFormData] = useState({
    perfumeImage: "",
    perfumeName: "",
    perfumeDescription: "",
    backgroundColor: "#0f172a",
    cardBackgroundColor: "#1e293b",
    textColor: "#e2e8f0",
    accentColor: "#3b82f6",
    headerShadowColor: "#3b82f6",
    detailShadowColor: "#3b82f6",
    topNoteImage: "",
    topNoteDescription: "",
    heartNoteImage: "",
    heartNoteDescription: "",
    baseNoteImage: "",
    baseNoteDescription: "",
    selectedTheme: "elegant",
  })

  // Agregar estado para elementos dinámicos
  const [dynamicElements, setDynamicElements] = useState<DynamicElement[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleThemeChange = (theme: string) => {
    const selectedTheme = perfumeThemes[theme as keyof typeof perfumeThemes]
    setFormData((prev) => ({
      ...prev,
      selectedTheme: theme,
      backgroundColor: selectedTheme.backgroundColor,
      cardBackgroundColor: selectedTheme.cardBackgroundColor,
      textColor: selectedTheme.textColor,
      accentColor: selectedTheme.accentColor,
      headerShadowColor: selectedTheme.headerShadowColor,
      detailShadowColor: selectedTheme.detailShadowColor,
    }))
  }

  // Modificar la función generatePerfume para incluir los elementos dinámicos
  const generatePerfume = () => {
    const {
      perfumeImage,
      perfumeName,
      perfumeDescription,
      backgroundColor,
      cardBackgroundColor,
      textColor,
      accentColor,
      headerShadowColor,
      detailShadowColor,
      topNoteImage,
      topNoteDescription,
      heartNoteImage,
      heartNoteDescription,
      baseNoteImage,
      baseNoteDescription,
    } = formData

    // Generar el HTML de los elementos dinámicos
    const dynamicElementsHTML = generateElementsHTML(dynamicElements, textColor, accentColor)

    // Insertar los elementos dinámicos después de las notas pero antes de cerrar el div principal
    const perfumeHtml = `
      <style>
        .xerjoff-product {
          font-family: 'Poppins', sans-serif;
          width: 100%;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(to bottom, ${backgroundColor}, ${backgroundColor}dd);
          color: ${textColor};
          box-sizing: border-box;
        }
        .xerjoff-product-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
          padding: 30px;
          border-radius: 15px;
          background: linear-gradient(to bottom, ${cardBackgroundColor}, ${backgroundColor});
          transition: all 0.3s ease;
          box-shadow: 
            0 10px 25px ${headerShadowColor}33,
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 0 20px rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .xerjoff-product-header:hover {
          transform: translateY(-5px);
        }
        .xerjoff-product-header:hover img {
          transform: scale(1.05);
          box-shadow: 
            0 15px 35px ${headerShadowColor}66,
            0 5px 15px rgba(0, 0, 0, 0.3);
        }
        .xerjoff-product-header img {
          max-width: 300px;
          height: auto;
          border-radius: 10px;
          transition: all 0.3s ease;
          box-shadow: 
            0 5px 15px rgba(0, 0, 0, 0.3),
            0 3px 5px rgba(0, 0, 0, 0.2);
        }
        .xerjoff-product-description {
          text-align: center;
          margin-top: 20px;
        }
        .xerjoff-product-description h1 {
          font-size: 28px;
          margin-bottom: 15px;
          color: ${accentColor};
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .xerjoff-product-description p {
          font-size: 16px;
          line-height: 1.6;
          color: ${textColor};
        }
        .xerjoff-product-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        .xerjoff-detail-box {
          background: linear-gradient(to bottom, ${cardBackgroundColor}, ${backgroundColor});
          border-radius: 15px;
          padding: 25px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 
            0 5px 15px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .xerjoff-detail-box:hover {
          transform: translateY(-10px);
          box-shadow: 
            0 20px 40px ${detailShadowColor}33,
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .xerjoff-detail-box img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 15px;
          transition: all 0.3s ease;
          box-shadow: 
            0 5px 10px rgba(0, 0, 0, 0.3),
            0 2px 5px rgba(0, 0, 0, 0.2);
          border: 4px solid ${cardBackgroundColor};
        }
        .xerjoff-detail-box:hover img {
          transform: scale(1.1);
          box-shadow: 
            0 12px 25px ${detailShadowColor}40,
            0 5px 10px rgba(0, 0, 0, 0.3);
        }
        .xerjoff-detail-box h3 {
          font-size: 18px;
          margin-bottom: 10px;
          color: ${accentColor};
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .xerjoff-detail-box p {
          font-size: 14px;
          line-height: 1.5;
          color: ${textColor};
        }
        /* Mejoras de responsividad */
        * {
          box-sizing: border-box;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        @media (max-width: 600px) {
          .xerjoff-product-header {
            padding: 15px;
          }
          
          .xerjoff-product-header img {
            max-width: 100%;
          }
          
          .xerjoff-product-description h1 {
            font-size: 24px;
          }
          
          .xerjoff-product-description p {
            font-size: 14px;
          }
          
          .xerjoff-product-details {
            grid-template-columns: 1fr;
          }
          
          .xerjoff-detail-box {
            padding: 15px;
          }
        }
      </style>
      <div class="xerjoff-product">
        <div class="xerjoff-product-header">
          <img src="${perfumeImage}" alt="${perfumeName}">
          <div class="xerjoff-product-description">
            <h1>${perfumeName}</h1>
            <p>${perfumeDescription}</p>
          </div>
        </div>

        <div class="xerjoff-product-details">
          <div class="xerjoff-detail-box">
            <img src="${topNoteImage}" alt="Notas de Salida">
            <h3>Notas de Salida</h3>
            <p>${topNoteDescription}</p>
          </div>

          <div class="xerjoff-detail-box">
            <img src="${heartNoteImage}" alt="Notas de Corazón">
            <h3>Notas de Corazón</h3>
            <p>${heartNoteDescription}</p>
          </div>

          <div class="xerjoff-detail-box">
            <img src="${baseNoteImage}" alt="Notas de Fondo">
            <h3>Notas de Fondo</h3>
            <p>${baseNoteDescription}</p>
          </div>
        </div>

        ${dynamicElementsHTML}
      </div>
    `

    onGenerate(perfumeHtml)
  }

  return (
    <div className="space-y-6 skeuomorphic-section p-6">
      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 text-blue-300">Seleccionar Tema</h3>
          <ThemeSelector
            themes={perfumeThemes}
            selectedTheme={formData.selectedTheme}
            onThemeChange={handleThemeChange}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="perfumeImage" className="text-blue-300 font-medium">
            URL de la imagen del perfume
          </Label>
          <Input
            id="perfumeImage"
            placeholder="https://ejemplo.com/perfume.jpg"
            value={formData.perfumeImage}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="perfumeName" className="text-blue-300 font-medium">
            Nombre del perfume
          </Label>
          <Input
            id="perfumeName"
            placeholder="Nombre del perfume"
            value={formData.perfumeName}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="perfumeDescription" className="text-blue-300 font-medium">
            Descripción del perfume
          </Label>
          <Textarea
            id="perfumeDescription"
            placeholder="Descripción del perfume"
            value={formData.perfumeDescription}
            onChange={handleChange}
            rows={3}
            className="skeuomorphic-input"
          />
        </div>
      </div>

      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 text-blue-300">Personalización de Colores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="backgroundColor" className="text-blue-300 font-medium">
                Color de fondo
              </Label>
              <div className="flex gap-2">
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
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cardBackgroundColor" className="text-blue-300 font-medium">
                Color de fondo de tarjetas
              </Label>
              <div className="flex gap-2">
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
            </div>

            <div className="grid gap-2">
              <Label htmlFor="textColor" className="text-blue-300 font-medium">
                Color de texto
              </Label>
              <div className="flex gap-2">
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
            </div>

            <div className="grid gap-2">
              <Label htmlFor="accentColor" className="text-blue-300 font-medium">
                Color de acento
              </Label>
              <div className="flex gap-2">
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
            </div>

            <div className="grid gap-2">
              <Label htmlFor="headerShadowColor" className="text-blue-300 font-medium">
                Color de sombra del encabezado
              </Label>
              <div className="flex gap-2">
                <div className="color-input-wrapper">
                  <input
                    id="headerShadowColor"
                    type="color"
                    value={formData.headerShadowColor}
                    onChange={handleChange}
                    className="color-input"
                  />
                  <div className="color-preview" style={{ backgroundColor: formData.headerShadowColor }}>
                    {formData.headerShadowColor}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="detailShadowColor" className="text-blue-300 font-medium">
                Color de sombra de las cajas de detalles
              </Label>
              <div className="flex gap-2">
                <div className="color-input-wrapper">
                  <input
                    id="detailShadowColor"
                    type="color"
                    value={formData.detailShadowColor}
                    onChange={handleChange}
                    className="color-input"
                  />
                  <div className="color-preview" style={{ backgroundColor: formData.detailShadowColor }}>
                    {formData.detailShadowColor}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="bg-gray-700" />

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-300">Notas de Salida</h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="topNoteImage" className="text-blue-300 font-medium">
              URL de la imagen
            </Label>
            <Input
              id="topNoteImage"
              placeholder="https://ejemplo.com/top-note.jpg"
              value={formData.topNoteImage}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="topNoteDescription" className="text-blue-300 font-medium">
              Descripción
            </Label>
            <Input
              id="topNoteDescription"
              placeholder="Notas de salida"
              value={formData.topNoteDescription}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>
        </div>

        <h3 className="text-lg font-medium text-blue-300">Notas de Corazón</h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="heartNoteImage" className="text-blue-300 font-medium">
              URL de la imagen
            </Label>
            <Input
              id="heartNoteImage"
              placeholder="https://ejemplo.com/heart-note.jpg"
              value={formData.heartNoteImage}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="heartNoteDescription" className="text-blue-300 font-medium">
              Descripción
            </Label>
            <Input
              id="heartNoteDescription"
              placeholder="Notas de corazón"
              value={formData.heartNoteDescription}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>
        </div>

        <h3 className="text-lg font-medium text-blue-300">Notas de Fondo</h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="baseNoteImage" className="text-blue-300 font-medium">
              URL de la imagen
            </Label>
            <Input
              id="baseNoteImage"
              placeholder="https://ejemplo.com/base-note.jpg"
              value={formData.baseNoteImage}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="baseNoteDescription" className="text-blue-300 font-medium">
              Descripción
            </Label>
            <Input
              id="baseNoteDescription"
              placeholder="Notas de fondo"
              value={formData.baseNoteDescription}
              onChange={handleChange}
              className="skeuomorphic-input"
            />
          </div>
        </div>
      </div>

      <Button onClick={generatePerfume} className="w-full skeuomorphic-button">
        Generar Contenido
      </Button>
      <div className="mt-6">
        <Separator className="bg-gray-700 mb-6" />
        <h3 className="text-lg font-medium mb-4 text-blue-300">Elementos Adicionales</h3>
        <p className="text-sm text-gray-400 mb-4">
          Agrega elementos adicionales que aparecerán después de las notas de tu perfume.
        </p>
        <DynamicElementAdder elements={dynamicElements} onChange={setDynamicElements} />
      </div>
    </div>
  )
}

