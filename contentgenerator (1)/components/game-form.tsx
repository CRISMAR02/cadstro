"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// Primero, importar el componente DynamicElementAdder y sus tipos
import DynamicElementAdder, { type DynamicElement, generateElementsHTML } from "@/components/dynamic-element-adder"

interface GameFormProps {
  onGenerate: (code: string) => void
}

export default function GameForm({ onGenerate }: GameFormProps) {
  const [formData, setFormData] = useState({
    gameLogo: "",
    gamePortada: "",
    gameCharacter: "",
    gameGif1: "",
    gameGif2: "",
    gameCursor: "",
    backgroundColor: "#0f172a",
    borderColor: "#1e40af",
    textColor: "#e2e8f0",
    accentColor: "#3b82f6",
    shadowColor: "#3b82f6",
  })

  // Agregar estado para elementos dinámicos
  const [dynamicElements, setDynamicElements] = useState<DynamicElement[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Modificar la función generateGame para incluir los elementos dinámicos
  const generateGame = () => {
    const {
      gameLogo,
      gamePortada,
      gameCharacter,
      gameGif1,
      gameGif2,
      gameCursor,
      backgroundColor,
      borderColor,
      textColor,
      accentColor,
      shadowColor,
    } = formData

    // Generar el HTML de los elementos dinámicos
    const dynamicElementsHTML = generateElementsHTML(dynamicElements, textColor, accentColor)

    const gameHtml = `
      <style>
        .game-container {
          max-width: 100%;
          margin: 0 auto;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          padding: 20px;
          background: linear-gradient(to bottom, ${backgroundColor}, ${backgroundColor}dd);
          border-radius: 15px;
          box-shadow: 
            0 10px 30px ${shadowColor}33,
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
          border: 1px solid ${borderColor}66;
          color: ${textColor};
        }
        .game-container img {
          max-width: 100%;
          height: auto;
        }
        .game-logo {
          filter: drop-shadow(0 10px 8px ${shadowColor}33) 
                 drop-shadow(0 4px 3px ${shadowColor}40);
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .game-logo:hover {
          transform: translateY(-5px);
          filter: drop-shadow(0 20px 13px ${shadowColor}33) 
                 drop-shadow(0 8px 5px ${shadowColor}40);
        }
        article {
          position: relative;
          width: 100%;
          max-width: 250px;
          margin: 0 auto;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        article img:first-child {
          border-radius: 8px;
          object-fit: cover;
          width: 100%;
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.4),
            0 5px 10px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 4px solid ${borderColor};
        }
        article:hover {
          transform: 
            perspective(250px)
            rotateX(10deg)
            translateY(-5%)
            translateZ(0);
        }
        article::before {
          content: '';
          position: absolute;
          bottom: 0;
          height: 100%;
          width: 100%;
          background-image: 
            linear-gradient(
              to bottom, 
              transparent 10%,
              rgba(0, 0, 0, 0.7) 90%
            );
          opacity: 0;
          transition: all .3s ease;
          border-radius: 8px;
        }
        article:hover::before {
          opacity: 1;
        }
        article img:nth-child(2),
        article img:nth-child(3),
        article img:nth-child(4) {
          position: absolute;
          width: 100%;
          max-width: 300px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) translateY(25%);
          transition: .3s ease;
          opacity: 0;
          filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.4));
        }
        article:hover img:nth-child(2),
        article:hover img:nth-child(3),
        article:hover img:nth-child(4) {
          opacity: 1;
          transform: translateX(-50%) translateY(10%);
        }
        article img:nth-child(3),
        article img:nth-child(4) {
          border-radius: 10px;
        }
        .game-cursor {
          margin-top: 20px;
          animation: float 2s ease-in-out infinite;
          filter: drop-shadow(0 10px 8px ${shadowColor}33);
        }
        .game-message {
          margin-top: 15px;
          font-size: 16px;
          color: ${accentColor};
          font-weight: 500;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @media (max-width: 600px) {
          article {
            width: 100%;
          }
          article img:nth-child(2),
          article img:nth-child(3),
          article img:nth-child(4) {
            width: 80%;
          }
        }
      </style>
      <div class="game-container">
        <img src="${gameLogo}" alt="Logo" class="game-logo" style="width: 100%; max-width: 437.921px;">
        <article>
          <img src="${gamePortada}" alt="Portada">
          <img src="${gameCharacter}" alt="Imagen-Saliendo">
          <img src="${gameGif1}" alt="gif_derecha">
          <img src="${gameGif2}" alt="gif">
        </article>
        <img src="${gameCursor}" class="game-cursor" style="width:70px" alt="Cursor">
        <p class="game-message">Pase el cursor por la imagen para ver el trailer!!</p>

      ${dynamicElementsHTML}
    </div>
  `

    onGenerate(gameHtml)
  }

  // Agregar el componente al final, antes del botón de generación
  return (
    <div className="space-y-6 skeuomorphic-section p-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="gameLogo" className="text-blue-300 font-medium">
            URL del logo del juego
          </Label>
          <Input
            id="gameLogo"
            placeholder="https://ejemplo.com/logo.png"
            value={formData.gameLogo}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gamePortada" className="text-blue-300 font-medium">
            URL de la portada del juego
          </Label>
          <Input
            id="gamePortada"
            placeholder="https://ejemplo.com/portada.jpg"
            value={formData.gamePortada}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gameCharacter" className="text-blue-300 font-medium">
            URL de la imagen del personaje
          </Label>
          <Input
            id="gameCharacter"
            placeholder="https://ejemplo.com/personaje.png"
            value={formData.gameCharacter}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gameGif1" className="text-blue-300 font-medium">
            URL del primer GIF del juego
          </Label>
          <Input
            id="gameGif1"
            placeholder="https://ejemplo.com/gif1.gif"
            value={formData.gameGif1}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gameGif2" className="text-blue-300 font-medium">
            URL del segundo GIF del juego
          </Label>
          <Input
            id="gameGif2"
            placeholder="https://ejemplo.com/gif2.gif"
            value={formData.gameGif2}
            onChange={handleChange}
            className="skeuomorphic-input"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gameCursor" className="text-blue-300 font-medium">
            URL del cursor personalizado
          </Label>
          <Input
            id="gameCursor"
            placeholder="https://ejemplo.com/cursor.png"
            value={formData.gameCursor}
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

      <Button onClick={generateGame} className="w-full skeuomorphic-button">
        Generar Contenido
      </Button>
    </div>
  )
}

