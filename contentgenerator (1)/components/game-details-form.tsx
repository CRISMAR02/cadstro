"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Importar el componente DynamicElementAdder y sus tipos
import DynamicElementAdder, { type DynamicElement, generateElementsHTML } from "@/components/dynamic-element-adder"
// Importar el componente DynamicGridAdder y sus tipos
import DynamicGridAdder, { type Grid, generateGridsHTML, gridStyles } from "@/components/dynamic-grid-adder"

interface GameDetailsFormProps {
  onGenerate: (code: string) => void
}

export default function GameDetailsForm({ onGenerate }: GameDetailsFormProps) {
  const [formData, setFormData] = useState({
    backgroundImage: "",
    logoImage: "",
    gameVideo: "",
    characterImage: "",
    logoFooter: "",
    gameDescription: "",
    footerImage1: "",
    footerImage2: "",
    backgroundColor: "#0f172a",
    cardBackgroundColor: "#1e293b",
    textColor: "#e2e8f0",
    accentColor: "#3b82f6",
    shadowColor: "#3b82f6",
  })

  // Agregar estado para elementos dinámicos después del estado de formData
  const [dynamicElements, setDynamicElements] = useState<DynamicElement[]>([])
  // Añadir estado para los grids después de los otros estados
  const [grids, setGrids] = useState<Grid[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Modificar la función generateGameDetails para incluir los elementos dinámicos
  const generateGameDetails = () => {
    const {
      backgroundImage,
      logoImage,
      gameVideo,
      characterImage,
      logoFooter,
      gameDescription,
      footerImage1,
      footerImage2,
      backgroundColor,
      cardBackgroundColor,
      textColor,
      accentColor,
      shadowColor,
    } = formData

    // Generar el HTML de los elementos dinámicos
    const dynamicElementsHTML = generateElementsHTML(dynamicElements, textColor, accentColor)
    // Generar el HTML de los grids
    const gridsHTML = generateGridsHTML(grids, textColor, accentColor)

    const gameDetailsHtml = `
      <style>
        .game-details-container {
          width: 100%;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
          color: ${textColor};
          background-color: ${backgroundColor};
          box-sizing: border-box;
        }
        .game-details-bg {
          background-image: url('${backgroundImage}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding: 40px 20px;
          position: relative;
        }
        .game-details-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${backgroundColor}dd;
          z-index: 1;
        }
        .game-details-content {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 20px;
          padding: 20px;
          width: 100%;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .game-details-card {
          flex: 1;
          min-width: 300px;
          max-width: 800px;
          width: 100%;
          padding: 30px;
          background-color: ${cardBackgroundColor}cc;
          box-shadow: 
            0 0 30px ${shadowColor}33,
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5);
          background-image: url('${characterImage}');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          border-radius: 30px;
          margin: 10px;
          backdrop-filter: blur(5px);
          border: 1px solid ${accentColor}33;
        }
        .game-details-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          width: 100%;
          background-color: ${backgroundColor}cc;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5);
          border: 1px solid ${accentColor}22;
        }
        .game-logo {
          width: 100%;
          max-width: 600px;
          transition: transform 0.3s ease-in-out;
        }
        .game-logo:hover {
          transform: scale(1.03);
        }
        .game-logo img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: 
            0 20px 20px rgba(0, 0, 0, 0.5),
            0 10px 10px rgba(0, 0, 0, 0.4),
            0 5px 5px ${shadowColor}33;
        }
        .game-video {
          width: 100%;
          max-width: 600px;
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
        }
        .game-video iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 10px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.6),
            0 8px 16px ${shadowColor}33,
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          border: 1px solid ${accentColor}33;
        }
        .game-character {
          width: 100%;
          max-width: 600px;
        }
        .game-character img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.5),
            0 5px 15px ${shadowColor}33;
          border: 1px solid ${accentColor}33;
        }
        .game-description {
          background: linear-gradient(to bottom, ${cardBackgroundColor}cc, ${backgroundColor}cc);
          padding: 25px;
          border-radius: 15px;
          font-size: 1.1em;
          line-height: 1.8;
          text-align: justify;
          color: ${textColor};
          width: 100%;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5);
          border: 1px solid ${accentColor}22;
        }
        .game-footer {
          width: 100%;
          max-width: 600px;
        }
        .game-footer img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 5px 15px ${shadowColor}33;
        }
        .footer-images img {
          width: 100%;
          height: auto;
          margin-top: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          position: relative;
          z-index: 2;
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
          .game-details-content {
            padding: 15px;
          }
          
          .game-details-card {
            padding: 15px;
            min-width: auto;
          }
          
          .game-details-inner {
            padding: 15px;
            gap: 20px;
          }
          
          .game-description {
            padding: 15px;
            font-size: 0.9rem;
            line-height: 1.6;
          }
          
          .game-video {
            height: 200px;
          }
        }
        /* Estilos para los grids */
        ${gridStyles}
      </style>
      <div class="game-details-container">
        <div class="game-details-bg">
          <div class="game-details-content">
            <div class="game-details-card">
              <div class="game-details-inner">
                <div class="game-logo">
                  <img src="${logoImage}" alt="Game Logo">
                </div>
                <div class="game-video">
                  <iframe src="https://www.youtube.com/embed/${gameVideo}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div class="game-character">
                  <img src="${characterImage}" alt="Game Character">
                </div>
                <div class="game-description">
                  ${gameDescription}
                </div>
                <div class="game-footer">
                  <img src="${logoFooter}" alt="Game Logo Footer">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-images">
          <img src="${footerImage1}" alt="Footer Image 1">
          <img src="${footerImage2}" alt="Footer Image 2">
        </div>
      </div>
      
      ${dynamicElementsHTML}
      <!-- Grids de imágenes/videos -->
      ${gridsHTML}
    </div>
  `

    onGenerate(gameDetailsHtml)
  }

  return (
    <div className="space-y-6 skeuomorphic-section p-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="backgroundImage" className="text-blue-300 font-medium">
            URL de la imagen de fondo
          </Label>
          <Input
            id="backgroundImage"
            placeholder="URL de la imagen de fondo"
            value={formData.backgroundImage}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="logoImage" className="text-blue-300 font-medium">
            URL del logo del juego
          </Label>
          <Input
            id="logoImage"
            placeholder="URL del logo"
            value={formData.logoImage}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gameVideo" className="text-blue-300 font-medium">
            ID del video de YouTube
          </Label>
          <Input
            id="gameVideo"
            placeholder="ID del video de YouTube"
            value={formData.gameVideo}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="characterImage" className="text-blue-300 font-medium">
            URL de la imagen del personaje
          </Label>
          <Input
            id="characterImage"
            placeholder="URL de la imagen del personaje"
            value={formData.characterImage}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="logoFooter" className="text-blue-300 font-medium">
            URL del logo para el pie
          </Label>
          <Input
            id="logoFooter"
            placeholder="URL del logo del pie"
            value={formData.logoFooter}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gameDescription" className="text-blue-300 font-medium">
            Descripción del juego
          </Label>
          <Textarea
            id="gameDescription"
            placeholder="Descripción del juego"
            value={formData.gameDescription}
            onChange={handleChange}
            rows={4}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="footerImage1" className="text-blue-300 font-medium">
            URL de la primera imagen del pie
          </Label>
          <Input
            id="footerImage1"
            placeholder="URL de la primera imagen del pie"
            value={formData.footerImage1}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="footerImage2" className="text-blue-300 font-medium">
            URL de la segunda imagen del pie
          </Label>
          <Input
            id="footerImage2"
            placeholder="URL de la segunda imagen del pie"
            value={formData.footerImage2}
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
              <Label htmlFor="shadowColor" className="text-blue-300 font-medium">
                Color de sombra
              </Label>
              <div className="color-input-wrapper">
                <input
                  id="shadowColor"
                  type="color"
                  value={formData.shadowColor}
                  onChange={handleChange}
                  className="color-input"
                />
                <div className="color-preview" style={{ backgroundColor: formData.shadowColor }}>
                  {formData.shadowColor}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 text-blue-300">Elementos Adicionales</h3>
          <p className="text-sm text-gray-400 mb-4">
            Agrega elementos personalizados como textos, imágenes, videos o HTML personalizado que aparecerán al final
            de la presentación del juego.
          </p>
          <DynamicElementAdder elements={dynamicElements} onChange={setDynamicElements} />
        </CardContent>
      </Card>
      <Card className="skeuomorphic-card mt-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 text-blue-300">Grids de Imágenes/Videos</h3>
          <p className="text-sm text-gray-400 mb-4">
            Agrega grids de imágenes o videos para mostrar capturas de pantalla, trailers o cualquier contenido visual
            del juego.
          </p>
          <DynamicGridAdder grids={grids} onChange={setGrids} />
        </CardContent>
      </Card>

      <Button onClick={generateGameDetails} className="w-full skeuomorphic-button">
        Generar Contenido
      </Button>
    </div>
  )
}

