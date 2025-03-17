"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Trash2, ImagePlus, Youtube, FileText, Code } from "lucide-react"

export type DynamicElement = {
  id: string
  type: "text" | "image" | "video" | "html"
  content: string
  title?: string
  imageUrl?: string
  videoId?: string
}

export const generateElementsHTML = (elements: DynamicElement[], textColor: string, accentColor: string): string => {
  if (!elements.length) return ""

  let elementsHTML = `
    <div class="dynamic-elements-container" style="padding: 60px 40px; position: relative; z-index: 5;">
      <h2 style="font-size: 2.2rem; font-weight: 700; margin-bottom: 40px; text-align: center; color: ${accentColor};">
        Información Adicional
      </h2>
      <div class="dynamic-elements" style="display: flex; flex-direction: column; gap: 30px;">
  `

  elements.forEach((element) => {
    switch (element.type) {
      case "text":
        elementsHTML += `
          <div class="dynamic-text-element" style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
            ${element.title ? `<h3 style="font-size: 1.8rem; font-weight: 600; margin-bottom: 15px; color: ${accentColor};">${element.title}</h3>` : ""}
            <div style="font-size: 1.1rem; line-height: 1.6; color: ${textColor};">
              ${element.content.replace(/\n/g, "<br>")}
            </div>
          </div>
        `
        break
      case "image":
        elementsHTML += `
          <div class="dynamic-image-element" style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
            ${element.title ? `<h3 style="font-size: 1.8rem; font-weight: 600; margin-bottom: 15px; color: ${accentColor};">${element.title}</h3>` : ""}
            <img src="${element.imageUrl}" alt="${element.title || "Imagen adicional"}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 15px 0;">
            ${element.content ? `<p style="font-size: 1rem; line-height: 1.6; color: ${textColor}; margin-top: 15px;">${element.content.replace(/\n/g, "<br>")}</p>` : ""}
          </div>
        `
        break
      case "video":
        elementsHTML += `
          <div class="dynamic-video-element" style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
            ${element.title ? `<h3 style="font-size: 1.8rem; font-weight: 600; margin-bottom: 15px; color: ${accentColor};">${element.title}</h3>` : ""}
            <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin: 15px 0;">
              <iframe 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
                src="https://www.youtube.com/embed/${element.videoId}" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>
            ${element.content ? `<p style="font-size: 1rem; line-height: 1.6; color: ${textColor}; margin-top: 15px;">${element.content.replace(/\n/g, "<br>")}</p>` : ""}
          </div>
        `
        break
      case "html":
        elementsHTML += `
          <div class="dynamic-html-element">
            ${element.content}
          </div>
        `
        break
    }
  })

  elementsHTML += `
      </div>
    </div>
  `

  return elementsHTML
}

interface DynamicElementAdderProps {
  elements: DynamicElement[]
  onChange: (elements: DynamicElement[]) => void
}

export default function DynamicElementAdder({ elements, onChange }: DynamicElementAdderProps) {
  const [activeTab, setActiveTab] = useState<string>("text")
  const [newElement, setNewElement] = useState<DynamicElement>({
    id: "",
    type: "text",
    content: "",
    title: "",
    imageUrl: "",
    videoId: "",
  })

  const handleAddElement = () => {
    const elementType = activeTab as "text" | "image" | "video" | "html"
    const newId = `element-${elementType}-${Date.now()}`

    const elementToAdd: DynamicElement = {
      id: newId,
      type: elementType,
      content: newElement.content,
      title: newElement.title,
    }

    if (elementType === "image") {
      elementToAdd.imageUrl = newElement.imageUrl
    } else if (elementType === "video") {
      elementToAdd.videoId = newElement.videoId
    }

    onChange([...elements, elementToAdd])

    // Reset form
    setNewElement({
      id: "",
      type: "text",
      content: "",
      title: "",
      imageUrl: "",
      videoId: "",
    })
  }

  const handleRemoveElement = (id: string) => {
    onChange(elements.filter((element) => element.id !== id))
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setNewElement((prev) => ({
      ...prev,
      type: value as "text" | "image" | "video" | "html",
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {elements.map((element) => (
          <Card key={element.id} className="bg-gray-900/50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-md font-medium text-blue-300">
                    {element.type === "text" && "Texto"}
                    {element.type === "image" && "Imagen"}
                    {element.type === "video" && "Video"}
                    {element.type === "html" && "HTML Personalizado"}
                    {element.title && `: ${element.title}`}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {element.type === "text" &&
                      `${element.content.substring(0, 50)}${element.content.length > 50 ? "..." : ""}`}
                    {element.type === "image" && `URL: ${element.imageUrl}`}
                    {element.type === "video" && `ID: ${element.videoId}`}
                    {element.type === "html" && "Código HTML personalizado"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveElement(element.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {elements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay elementos adicionales. Agrega uno usando el formulario de abajo.
          </div>
        )}
      </div>

      <Card className="bg-gray-900/30 border-gray-800">
        <CardContent className="pt-6">
          <h4 className="text-md font-medium text-blue-300 mb-4">Agregar nuevo elemento</h4>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Texto
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4" />
                Imagen
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                Video
              </TabsTrigger>
              <TabsTrigger value="html" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                HTML
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-blue-300">Título (opcional)</Label>
                <Input
                  value={newElement.title || ""}
                  onChange={(e) => setNewElement({ ...newElement, title: e.target.value })}
                  placeholder="Ej: Características adicionales"
                  className="skeuomorphic-input"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-blue-300">Contenido</Label>
                <Textarea
                  value={newElement.content}
                  onChange={(e) => setNewElement({ ...newElement, content: e.target.value })}
                  placeholder="Escribe el texto que quieres mostrar..."
                  rows={4}
                  className="skeuomorphic-input"
                />
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-blue-300">Título (opcional)</Label>
                <Input
                  value={newElement.title || ""}
                  onChange={(e) => setNewElement({ ...newElement, title: e.target.value })}
                  placeholder="Ej: Vista detallada del producto"
                  className="skeuomorphic-input"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-blue-300">URL de la imagen</Label>
                <Input
                  value={newElement.imageUrl || ""}
                  onChange={(e) => setNewElement({ ...newElement, imageUrl: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="skeuomorphic-input"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-blue-300">Descripción (opcional)</Label>
                <Textarea
                  value={newElement.content}
                  onChange={(e) => setNewElement({ ...newElement, content: e.target.value })}
                  placeholder="Descripción de la imagen..."
                  rows={2}
                  className="skeuomorphic-input"
                />
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-blue-300">Título (opcional)</Label>
                <Input
                  value={newElement.title || ""}
                  onChange={(e) => setNewElement({ ...newElement, title: e.target.value })}
                  placeholder="Ej: Video demostrativo"
                  className="skeuomorphic-input"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-blue-300">ID del video de YouTube</Label>
                <Input
                  value={newElement.videoId || ""}
                  onChange={(e) => setNewElement({ ...newElement, videoId: e.target.value })}
                  placeholder="Ej: dQw4w9WgXcQ"
                  className="skeuomorphic-input"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-blue-300">Descripción (opcional)</Label>
                <Textarea
                  value={newElement.content}
                  onChange={(e) => setNewElement({ ...newElement, content: e.target.value })}
                  placeholder="Descripción del video..."
                  rows={2}
                  className="skeuomorphic-input"
                />
              </div>
            </TabsContent>

            <TabsContent value="html" className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-blue-300">Código HTML personalizado</Label>
                <Textarea
                  value={newElement.content}
                  onChange={(e) => setNewElement({ ...newElement, content: e.target.value })}
                  placeholder="<div>Tu código HTML personalizado aquí...</div>"
                  rows={8}
                  className="skeuomorphic-input font-mono text-sm"
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleAddElement}
            className="w-full mt-4 skeuomorphic-button-secondary flex items-center justify-center gap-2"
            disabled={
              (activeTab === "text" && !newElement.content) ||
              (activeTab === "image" && !newElement.imageUrl) ||
              (activeTab === "video" && !newElement.videoId) ||
              (activeTab === "html" && !newElement.content)
            }
          >
            <PlusCircle className="h-4 w-4" />
            Agregar Elemento
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

