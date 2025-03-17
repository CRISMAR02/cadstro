"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// Primero, importar el componente DynamicElementAdder y sus tipos
import DynamicElementAdder, { type DynamicElement, generateElementsHTML } from "@/components/dynamic-element-adder"
// Importar el componente DynamicGridAdder y sus tipos
import DynamicGridAdder, { type Grid, generateGridsHTML, gridStyles } from "@/components/dynamic-grid-adder"

interface Feature {
  icon: string
  name: string
  desc: string
}

interface TvFormProps {
  onGenerate: (code: string) => void
}

export default function TvForm({ onGenerate }: TvFormProps) {
  const [formData, setFormData] = useState({
    tvTitle: "",
    tvSubtitle: "",
    tvImage: "",
    tvFooter: "",
    backgroundColor: "#0f172a",
    headerColor: "#1e3a8a",
    textColor: "#e2e8f0",
    accentColor: "#3b82f6",
    cardColor: "#1e293b",
  })

  // Agregar estado para elementos dinámicos
  const [dynamicElements, setDynamicElements] = useState<DynamicElement[]>([])

  const [features, setFeatures] = useState<Feature[]>(
    Array(6).fill({
      icon: "",
      name: "",
      desc: "",
    }),
  )

  // Añadir estado para los grids después de los otros estados
  const [grids, setGrids] = useState<Grid[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setFeatures(newFeatures)
  }

  // Cerrar los selectores de emojis cuando se hace clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const pickers = document.querySelectorAll('[id^="emoji-picker-"]')
      pickers.forEach((picker) => {
        if (
          !picker.contains(event.target as Node) &&
          !(event.target as Element).closest("button")?.textContent?.includes("😊")
        ) {
          ;(picker as HTMLElement).classList.add("hidden")
        }
      })
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Modificar la función generateTV para incluir los grids
  const generateTV = () => {
    const { tvTitle, tvSubtitle, tvImage, tvFooter, backgroundColor, headerColor, textColor, accentColor, cardColor } =
      formData

    // Generar el HTML de los elementos dinámicos
    const dynamicElementsHTML = generateElementsHTML(dynamicElements, textColor, accentColor)

    // Generar el HTML de los grids
    const gridsHTML = generateGridsHTML(grids, textColor, accentColor)

    const tvHtml = `
      <style>
        .tv-presentation {
          width: 100%;
          background: linear-gradient(to bottom, ${backgroundColor}, ${backgroundColor}dd);
          border-radius: 15px;
          box-shadow: 
            0 10px 30px ${accentColor}33,
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
          margin: 0 auto;
          border: 1px solid ${accentColor}33;
          color: ${textColor};
          box-sizing: border-box;
        }
        .tv-header {
          background: linear-gradient(to bottom, ${headerColor}, ${headerColor}dd);
          color: white;
          padding: 30px;
          text-align: center;
          position: relative;
          box-shadow: 
            0 5px 15px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        }
        .tv-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          color: ${textColor};
        }
        .tv-subtitle {
          font-size: 16px;
          font-weight: 400;
          opacity: 0.9;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          color: ${textColor}dd;
        }
        .tv-image-container {
          background: linear-gradient(to bottom, ${cardColor}, ${backgroundColor});
          padding: 40px;
          display: flex;
          justify-content: center;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .tv-image-container img {
          max-width: 100%;
          height: auto;
          transition: transform 0.3s ease;
          box-shadow: 
            0 20px 25px rgba(0, 0, 0, 0.3),
            0 10px 10px rgba(0, 0, 0, 0.2);
          border: 8px solid ${cardColor};
          border-radius: 4px;
        }
        .tv-image-container:hover img {
          transform: scale(1.02);
          box-shadow: 
            0 25px 30px rgba(0, 0, 0, 0.4),
            0 15px 15px rgba(0, 0, 0, 0.3);
        }
        .tv-features {
          background: linear-gradient(to bottom, ${backgroundColor}, ${backgroundColor}dd);
          padding: 40px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .features-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 25px;
          color: ${accentColor};
          border-bottom: 2px solid ${cardColor};
          padding-bottom: 15px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .features-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          padding: 20px;
          background: linear-gradient(to bottom, ${cardColor}, ${backgroundColor}ee);
          border-radius: 12px;
          box-shadow: 
            0 5px 15px rgba(0, 0, 0, 0.3),
            0 3px 5px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid ${accentColor}22;
        }
        .feature-item:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 15px 30px ${accentColor}33,
            0 5px 15px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .feature-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(to bottom, ${headerColor}, ${headerColor}dd);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 15px;
          font-size: 18px;
          color: ${textColor};
          font-weight: bold;
          box-shadow: 
            0 5px 10px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3);
          border: 1px solid ${accentColor}33;
        }
        .feature-text {
          flex: 1;
        }
        .feature-name {
          font-weight: 600;
          margin-bottom: 5px;
          color: ${accentColor};
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .feature-desc {
          font-size: 14px;
          color: ${textColor}dd;
          line-height: 1.4;
        }
        .tv-footer {
          padding: 25px;
          text-align: center;
          background: linear-gradient(to bottom, ${headerColor}, ${headerColor}dd);
          color: white;
          font-size: 14px;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 -5px 15px rgba(0, 0, 0, 0.3);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 768px) {
          .features-list {
            grid-template-columns: repeat(2, 1fr);
          }
          .tv-title {
            font-size: 24px;
          }
          .tv-header, .tv-features {
            padding: 25px;
          }
        }
        @media (max-width: 480px) {
          .features-list {
            grid-template-columns: 1fr;
          }
          .feature-item {
            padding: 15px;
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

        @media (max-width: 480px) {
          .features-list {
            grid-template-columns: 1fr;
          }
          
          .feature-item {
            padding: 12px;
          }
          
          .feature-icon {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
          
          .tv-title {
            font-size: 20px;
          }
          
          .tv-subtitle {
            font-size: 14px;
          }
          
          .tv-header, .tv-features, .tv-image-container {
            padding: 15px;
          }
        }

        /* Estilos para los grids */
        ${gridStyles}
      </style>
      <div class="tv-presentation">
        <div class="tv-header">
          <div class="tv-title">${tvTitle}</div>
          <div class="tv-subtitle">${tvSubtitle}</div>
        </div>
        
        <div class="tv-image-container">
          <img src="${tvImage}" alt="${tvTitle}">
        </div>
        
        <div class="tv-features">
          <div class="features-title">Características Destacadas</div>
          
          <div class="features-list">
            ${features
              .map(
                (feature) => `
              <div class="feature-item">
                <div class="feature-icon">${feature.icon}</div>
                <div class="feature-text">
                  <div class="feature-name">${feature.name}</div>
                  <div class="feature-desc">${feature.desc}</div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
        
        <div class="tv-footer">
          ${tvFooter}
        </div>

      ${dynamicElementsHTML}

      <!-- Grids de imágenes/videos -->
      ${gridsHTML}
    </div>
  `

    onGenerate(tvHtml)
  }

  return (
    <div className="space-y-6 skeuomorphic-section p-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="tvTitle" className="text-blue-300 font-medium">
            Título del TV
          </Label>
          <Input
            id="tvTitle"
            placeholder="Ej: Televisor Serie 8000"
            value={formData.tvTitle}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tvSubtitle" className="text-blue-300 font-medium">
            Subtítulo
          </Label>
          <Input
            id="tvSubtitle"
            placeholder="Ej: Especificaciones técnicas y características"
            value={formData.tvSubtitle}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tvImage" className="text-blue-300 font-medium">
            URL de la imagen del TV
          </Label>
          <Input
            id="tvImage"
            placeholder="URL de la imagen del televisor"
            value={formData.tvImage}
            onChange={handleChange}
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
              <Label htmlFor="headerColor" className="text-blue-300 font-medium">
                Color de encabezado
              </Label>
              <div className="color-input-wrapper">
                <input
                  id="headerColor"
                  type="color"
                  value={formData.headerColor}
                  onChange={handleChange}
                  className="color-input"
                />
                <div className="color-preview" style={{ backgroundColor: formData.headerColor }}>
                  {formData.headerColor}
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
              <Label htmlFor="cardColor" className="text-blue-300 font-medium">
                Color de tarjetas
              </Label>
              <div className="color-input-wrapper">
                <input
                  id="cardColor"
                  type="color"
                  value={formData.cardColor}
                  onChange={handleChange}
                  className="color-input"
                />
                <div className="color-preview" style={{ backgroundColor: formData.cardColor }}>
                  {formData.cardColor}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-blue-300">Características (6 características)</h3>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner"
              >
                <div className="grid gap-2">
                  <Label className="text-blue-300">Ícono</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ej: AI o emoji"
                      value={feature.icon}
                      onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                      className="flex-1 skeuomorphic-input"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="skeuomorphic-button-secondary h-10 w-10"
                      onClick={() => {
                        const emojiPicker = document.getElementById(`emoji-picker-${index}`)
                        if (emojiPicker) {
                          emojiPicker.classList.toggle("hidden")
                        }
                      }}
                    >
                      😊
                    </Button>
                  </div>
                  <div
                    id={`emoji-picker-${index}`}
                    className="hidden absolute z-50 mt-16 p-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg grid grid-cols-8 gap-1 max-h-[200px] overflow-y-auto"
                  >
                    {[
                      "😊",
                      "😃",
                      "😄",
                      "😁",
                      "😆",
                      "😅",
                      "😂",
                      "🤣",
                      "😍",
                      "🥰",
                      "😘",
                      "😗",
                      "😙",
                      "😚",
                      "🙂",
                      "🤗",
                      "🤔",
                      "🤨",
                      "😐",
                      "😑",
                      "😶",
                      "🙄",
                      "😏",
                      "😣",
                      "🧠",
                      "👁️",
                      "👀",
                      "👥",
                      "👤",
                      "🗣️",
                      "👅",
                      "👄",
                      "❤️",
                      "🧡",
                      "💛",
                      "💚",
                      "💙",
                      "💜",
                      "🖤",
                      "💔",
                      "✨",
                      "🎵",
                      "🎶",
                      "👑",
                      "💍",
                      "💎",
                      "🏆",
                      "🥇",
                      "📱",
                      "💻",
                      "⌨️",
                      "🖥️",
                      "🖨️",
                      "📷",
                      "🎮",
                      "🕹️",
                      "🚗",
                      "✈️",
                      "🚀",
                      "🛸",
                      "🏠",
                      "🏢",
                      "🏰",
                      "🌍",
                    ].map((emoji, emojiIndex) => (
                      <button
                        key={emojiIndex}
                        type="button"
                        className="text-xl p-1 hover:bg-gray-800 rounded cursor-pointer"
                        onClick={() => {
                          handleFeatureChange(index, "icon", emoji)
                          const emojiPicker = document.getElementById(`emoji-picker-${index}`)
                          if (emojiPicker) {
                            emojiPicker.classList.add("hidden")
                          }
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-blue-300">Nombre</Label>
                  <Input
                    placeholder="Nombre"
                    value={feature.name}
                    onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                    className="skeuomorphic-input"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-blue-300">Descripción</Label>
                  <Input
                    placeholder="Descripción"
                    value={feature.desc}
                    onChange={(e) => handleFeatureChange(index, "desc", e.target.value)}
                    className="skeuomorphic-input"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-2">
        <Label htmlFor="tvFooter" className="text-blue-300 font-medium">
          Texto del pie
        </Label>
        <Input
          id="tvFooter"
          placeholder="Ej: Serie 8000 - Ficha técnica completa"
          value={formData.tvFooter}
          onChange={handleChange}
          className="skeuomorphic-input"
        />
      </div>

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
            televisor.
          </p>
          <DynamicGridAdder grids={grids} onChange={setGrids} />
        </CardContent>
      </Card>

      <Button onClick={generateTV} className="w-full skeuomorphic-button">
        Generar Contenido
      </Button>
    </div>
  )
}

