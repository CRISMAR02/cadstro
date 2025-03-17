"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

// Importar el componente DynamicGridAdder y sus tipos
import DynamicGridAdder, { type Grid, generateGridsHTML, gridStyles } from "@/components/dynamic-grid-adder"

interface SmartWatchFormProps {
  onGenerate: (html: string) => void
}

const SmartWatchForm: React.FC<SmartWatchFormProps> = ({ onGenerate }) => {
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [textColor, setTextColor] = useState("white")
  const [accentColor, setAccentColor] = useState("#64748b")

  // Añadir estado para los grids después de los otros estados
  const [grids, setGrids] = useState<Grid[]>([])

  // Función para validar si el valor es un número
  const validateNumberInput = (value: string): boolean => {
    return /^\d*\.?\d*$/.test(value)
  }

  const generateSmartWatch = () => {
    // Validar que los campos requeridos estén completos
    if (!productName || !description || !price || !discount || !imageUrl) {
      alert("Por favor, complete todos los campos.")
      return
    }

    // Validar que el precio y el descuento sean números válidos
    if (!validateNumberInput(price) || !validateNumberInput(discount)) {
      alert("Por favor, ingrese números válidos para el precio y el descuento.")
      return
    }

    const discountAmount = (Number.parseFloat(price) * Number.parseFloat(discount)) / 100
    const discountedPrice = (Number.parseFloat(price) - discountAmount).toFixed(2)

    // Generar el HTML de los grids
    const gridsHTML = generateGridsHTML(grids, textColor, accentColor)

    const smartWatchHtml = `
    <style>
      .smartwatch-ad-container {
        font-family: 'Arial', sans-serif;
        background-color: ${accentColor};
        color: ${textColor};
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }

      .product-image {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .product-name {
        font-size: 2em;
        margin-bottom: 10px;
        color: ${textColor};
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      }

      .description {
        font-size: 1.1em;
        line-height: 1.6;
        margin-bottom: 20px;
        color: ${textColor};
      }

      .price-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
      }

      .price {
        font-size: 1.5em;
        color: ${textColor};
        margin-right: 15px;
      }

      .discounted-price {
        font-size: 1.8em;
        color: #ff5733;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      }

      .discount-label {
        background-color: #ff5733;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.9em;
        margin-left: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      /* Estilos para los grids */
      ${gridStyles}
    </style>

    <div class="smartwatch-ad-container">
      <img src="${imageUrl}" alt="${productName}" class="product-image" />
      <h1 class="product-name">${productName}</h1>
      <p class="description">${description}</p>
      <div class="price-container">
        <span class="price">Precio: $${price}</span>
        <span class="discounted-price">Oferta: $${discountedPrice}</span>
        <span class="discount-label">-${discount}%</span>
      </div>

      <!-- Grids de imágenes/videos -->
      ${gridsHTML}
    </div>
  `

    onGenerate(smartWatchHtml)
  }

  return (
    <div>
      <Card className="skeuomorphic-card">
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium mb-4 text-blue-300">Generador de Anuncios de Smartwatch</h2>
          <p className="text-sm text-gray-400 mb-4">
            Completa los siguientes campos para generar un anuncio atractivo para tu smartwatch.
          </p>

          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre del Producto
              </Label>
              <Input
                type="text"
                id="name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="col-span-2"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-2"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Precio
              </Label>
              <Input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-2"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Descuento (%)
              </Label>
              <Input
                type="text"
                id="discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="col-span-2"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                URL de la Imagen
              </Label>
              <Input
                type="text"
                id="image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-2"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="textColor" className="text-right">
                Color del Texto
              </Label>
              <Input
                type="color"
                id="textColor"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="col-span-2"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="accentColor" className="text-right">
                Color de Acento
              </Label>
              <Input
                type="color"
                id="accentColor"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="col-span-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Añadir el componente DynamicGridAdder antes del botón de generación */}
      <Card className="skeuomorphic-card mt-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 text-blue-300">Grids de Imágenes/Videos</h3>
          <p className="text-sm text-gray-400 mb-4">
            Agrega grids de imágenes o videos para mostrar diferentes ángulos, características o contenido visual del
            smartwatch.
          </p>
          <DynamicGridAdder grids={grids} onChange={setGrids} />
        </CardContent>
      </Card>

      <Button className="mt-4" onClick={generateSmartWatch}>
        Generar Anuncio
      </Button>
    </div>
  )
}

export default SmartWatchForm

