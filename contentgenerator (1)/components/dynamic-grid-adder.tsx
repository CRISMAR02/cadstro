"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Video, X, GripVertical, ArrowUpDown, PlusCircle, LayoutGrid } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export interface GridItem {
  id: string
  type: "image" | "video"
  url: string
  caption: string
  size?: "small" | "medium" | "large" // Para layouts personalizados
  position?: number // Para layouts personalizados
}

export interface Grid {
  id: string
  title: string
  columns: number
  layout: string
  items: GridItem[]
}

interface DynamicGridAdderProps {
  grids: Grid[]
  onChange: (grids: Grid[]) => void
}

// Función para extraer el ID de YouTube de una URL
export function extractYouTubeID(url: string): string {
  if (!url) return url

  // Patrones comunes de URLs de YouTube
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^/?]+)/i,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  // Si no coincide con ningún patrón, devolver la URL original
  return url
}

// Función para determinar si una URL es de YouTube
export function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/i.test(url)
}

// Función para generar la URL de embed de YouTube
export function generateYouTubeEmbedUrl(url: string): string {
  const youtubeID = extractYouTubeID(url)
  if (youtubeID === url) {
    // Si no se pudo extraer un ID, verificar si ya es un ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return `https://www.youtube.com/embed/${url}`
    }
    // Si no es un ID ni una URL de YouTube, devolver la URL original
    return url
  }
  return `https://www.youtube.com/embed/${youtubeID}`
}

// Layouts predefinidos
const gridLayouts = {
  uniform: {
    name: "Uniforme",
    description: "Todas las celdas del mismo tamaño",
    cssClass: "grid-layout-uniform",
  },
  featured: {
    name: "Destacado",
    description: "Una imagen grande y el resto pequeñas",
    cssClass: "grid-layout-featured",
  },
  masonry: {
    name: "Mosaico",
    description: "Estilo Pinterest con diferentes tamaños",
    cssClass: "grid-layout-masonry",
  },
  horizontal: {
    name: "Horizontal",
    description: "Imágenes en fila con scroll horizontal",
    cssClass: "grid-layout-horizontal",
  },
  gallery: {
    name: "Galería",
    description: "Estilo galería con imágenes grandes",
    cssClass: "grid-layout-gallery",
  },
}

export default function DynamicGridAdder({ grids, onChange }: DynamicGridAdderProps) {
  const [previewGrid, setPreviewGrid] = useState<string | null>(null)

  const addGrid = () => {
    onChange([
      ...grids,
      {
        id: uuidv4(),
        title: "Galería",
        columns: 2,
        layout: "uniform", // Layout por defecto
        items: [],
      },
    ])
  }

  // Modificar la función updateGrid para incluir la reordenación de elementos
  const updateGrid = (id: string, field: string, value: any) => {
    onChange(
      grids.map((grid) => {
        if (grid.id === id) {
          return { ...grid, [field]: value }
        }
        return grid
      }),
    )
  }

  const removeGrid = (id: string) => {
    onChange(grids.filter((grid) => grid.id !== id))
  }

  const addGridItem = (gridId: string, type: "image" | "video") => {
    onChange(
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
                size: "medium",
                position: grid.items.length,
              },
            ],
          }
        }
        return grid
      }),
    )
  }

  const updateGridItem = (gridId: string, itemId: string, field: string, value: string) => {
    onChange(
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
    onChange(
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

  // Añadir esta función después de removeGridItem
  const reorderGridItems = (gridId: string, startIndex: number, endIndex: number) => {
    onChange(
      grids.map((grid) => {
        if (grid.id === gridId) {
          const newItems = Array.from(grid.items)
          const [removed] = newItems.splice(startIndex, 1)
          newItems.splice(endIndex, 0, removed)

          // Actualizar la posición de cada elemento
          const updatedItems = newItems.map((item, index) => ({
            ...item,
            position: index,
          }))

          return {
            ...grid,
            items: updatedItems,
          }
        }
        return grid
      }),
    )
  }

  const togglePreview = (gridId: string) => {
    if (previewGrid === gridId) {
      setPreviewGrid(null)
    } else {
      setPreviewGrid(gridId)
    }
  }

  return (
    <div className="space-y-6">
      {grids.map((grid) => (
        <div key={grid.id} className="p-4 border border-gray-800 rounded-md bg-gray-900/50 shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <Input
              value={grid.title}
              onChange={(e) => updateGrid(grid.id, "title", e.target.value)}
              placeholder="Título de la galería"
              className="font-medium skeuomorphic-input max-w-md"
            />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => togglePreview(grid.id)}
                className="skeuomorphic-button-secondary"
              >
                {previewGrid === grid.id ? "Ocultar Vista Previa" : "Vista Previa"}
              </Button>
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

          {/* Banner de posicionamiento personalizado */}
          <div className="mb-3 p-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg border border-blue-800/50 flex items-start">
            <div className="p-2 bg-blue-600 rounded-full mr-3 flex-shrink-0">
              <ArrowUpDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-300 mb-1">¡Nuevo! Posicionamiento personalizado</h4>
              <p className="text-xs text-gray-300">
                Ahora puedes reorganizar tus imágenes y videos como prefieras. Usa la pestaña "Posicionamiento" para
                arrastrar y soltar los elementos en el orden deseado.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const tabsList = document.querySelector(`[role="tablist"]`)
                const positionTab = Array.from(tabsList?.querySelectorAll('[role="tab"]') || []).find((tab) =>
                  tab.textContent?.includes("Posicionamiento"),
                )
                if (positionTab) {
                  ;(positionTab as HTMLElement).click()
                }
              }}
              className="ml-auto text-xs bg-blue-600 hover:bg-blue-700 text-white"
            >
              Probar ahora
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="grid gap-2">
              <Label className="text-blue-300">Formato del Grid</Label>
              <Select value={grid.layout} onValueChange={(value) => updateGrid(grid.id, "layout", value)}>
                <SelectTrigger className="w-full skeuomorphic-input">
                  <SelectValue placeholder="Seleccionar formato" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(gridLayouts).map(([key, layout]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex flex-col">
                        <span>{layout.name}</span>
                        <span className="text-xs text-gray-400">{layout.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-blue-300">Columnas (para formato uniforme)</Label>
              <Select
                value={grid.columns.toString()}
                onValueChange={(value) => updateGrid(grid.id, "columns", Number.parseInt(value))}
              >
                <SelectTrigger className="w-full skeuomorphic-input">
                  <SelectValue placeholder="Columnas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Columna</SelectItem>
                  <SelectItem value="2">2 Columnas</SelectItem>
                  <SelectItem value="3">3 Columnas</SelectItem>
                  <SelectItem value="4">4 Columnas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {previewGrid === grid.id && grid.items.length > 0 && (
            <div className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800/50">
              <h4 className="text-sm font-medium text-blue-300 mb-2">Vista Previa del Grid</h4>
              <div
                className={`preview-grid ${gridLayouts[grid.layout as keyof typeof gridLayouts]?.cssClass || "grid-layout-uniform"}`}
              >
                {grid.items.map((item) => (
                  <div key={item.id} className={`preview-item preview-item-${item.size || "medium"}`}>
                    {item.type === "image" ? (
                      item.url ? (
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.caption}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-lg">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-lg">
                        <Video className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm truncate rounded-b-lg">
                        {item.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Tabs defaultValue="items">
            <TabsList className="mb-4 skeuomorphic-tabs">
              <TabsTrigger value="items" className="skeuomorphic-tab">
                Elementos
              </TabsTrigger>
              {grid.layout === "masonry" && (
                <TabsTrigger value="layout" className="skeuomorphic-tab">
                  Personalizar Tamaños
                </TabsTrigger>
              )}
              <TabsTrigger
                value="position"
                className="skeuomorphic-tab bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 relative"
              >
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
                Posicionamiento
                <ArrowUpDown className="h-4 w-4 ml-1" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="items">
              <DragDropContext
                onDragEnd={(result) => {
                  if (!result.destination) return
                  reorderGridItems(grid.id, result.source.index, result.destination.index)
                }}
              >
                <Droppable droppableId={`grid-${grid.id}`}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                    >
                      {grid.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border rounded-lg p-3 bg-gray-800/50 shadow-inner relative"
                              {...provided.dragHandleProps}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <div className="mr-2 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-700">
                                    <GripVertical className="h-4 w-4 text-gray-400" />
                                  </div>
                                  <span className="text-sm font-medium text-blue-300">
                                    {item.type === "image" ? "Imagen" : "Video"} #{index + 1}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeGridItem(grid.id, item.id)}
                                  className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>

                              {item.type === "video" && (
                                <div className="mb-2">
                                  <Tabs defaultValue="youtube" className="w-full">
                                    <TabsList className="mb-2 skeuomorphic-tabs">
                                      <TabsTrigger value="youtube" className="skeuomorphic-tab">
                                        YouTube
                                      </TabsTrigger>
                                      <TabsTrigger value="url" className="skeuomorphic-tab">
                                        URL Directa
                                      </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="youtube">
                                      <Input
                                        value={item.url}
                                        onChange={(e) => updateGridItem(grid.id, item.id, "url", e.target.value)}
                                        placeholder="URL o ID de YouTube"
                                        className="mb-2 skeuomorphic-input"
                                      />
                                      <p className="text-xs text-gray-400">
                                        Ejemplo: https://youtu.be/dQw4w9WgXcQ o dQw4w9WgXcQ
                                      </p>
                                    </TabsContent>

                                    <TabsContent value="url">
                                      <Input
                                        value={item.url}
                                        onChange={(e) => updateGridItem(grid.id, item.id, "url", e.target.value)}
                                        placeholder="URL directa del video (MP4, WebM, etc.)"
                                        className="mb-2 skeuomorphic-input"
                                      />
                                    </TabsContent>
                                  </Tabs>
                                </div>
                              )}

                              {item.type === "image" && (
                                <Input
                                  value={item.url}
                                  onChange={(e) => updateGridItem(grid.id, item.id, "url", e.target.value)}
                                  placeholder="URL de la imagen"
                                  className="mb-2 skeuomorphic-input"
                                />
                              )}

                              <Input
                                value={item.caption}
                                onChange={(e) => updateGridItem(grid.id, item.id, "caption", e.target.value)}
                                placeholder="Descripción"
                                className="skeuomorphic-input"
                              />

                              {(grid.layout === "masonry" || grid.layout === "featured") && (
                                <div className="mt-2">
                                  <Label className="text-xs text-blue-300">Tamaño del elemento</Label>
                                  <Select
                                    value={item.size || "medium"}
                                    onValueChange={(value) => updateGridItem(grid.id, item.id, "size", value)}
                                  >
                                    <SelectTrigger className="mt-1 skeuomorphic-input">
                                      <SelectValue placeholder="Tamaño" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="small">Pequeño</SelectItem>
                                      <SelectItem value="medium">Mediano</SelectItem>
                                      <SelectItem value="large">Grande</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </TabsContent>

            <TabsContent value="layout">
              {grid.layout === "masonry" && (
                <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 mb-4">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">Personalizar Tamaños</h4>
                  <p className="text-xs text-gray-400 mb-4">
                    Ajusta el tamaño de cada elemento para crear un diseño personalizado.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {grid.items.map((item, index) => (
                      <div key={item.id} className="border rounded p-2 bg-gray-700/50">
                        <div className="text-xs font-medium mb-1">Elemento {index + 1}</div>
                        <Select
                          value={item.size || "medium"}
                          onValueChange={(value) => updateGridItem(grid.id, item.id, "size", value)}
                        >
                          <SelectTrigger className="h-8 text-xs skeuomorphic-input">
                            <SelectValue placeholder="Tamaño" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Pequeño</SelectItem>
                            <SelectItem value="medium">Mediano</SelectItem>
                            <SelectItem value="large">Grande</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="position">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 mb-4">
                <h4 className="text-sm font-medium text-blue-300 mb-2">Reordenar Elementos</h4>
                <p className="text-xs text-gray-400 mb-4">
                  Arrastra y suelta los elementos para cambiar su orden de visualización.
                </p>

                <DragDropContext
                  onDragEnd={(result) => {
                    if (!result.destination) return
                    reorderGridItems(grid.id, result.source.index, result.destination.index)
                  }}
                >
                  <Droppable droppableId={`grid-position-${grid.id}`}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {grid.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={`pos-${item.id}`} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700"
                              >
                                <div
                                  {...provided.dragHandleProps}
                                  className="mr-3 p-2 rounded-md bg-gray-700 cursor-grab active:cursor-grabbing"
                                >
                                  <GripVertical className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">
                                    {item.type === "image" ? "Imagen" : "Video"} #{index + 1}
                                  </div>
                                  <div className="text-xs text-gray-400 truncate">
                                    {item.caption || (item.url ? item.url : "Sin descripción")}
                                  </div>
                                </div>
                                <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                                  {item.type === "image" && item.url ? (
                                    <img
                                      src={item.url || "/placeholder.svg"}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      {item.type === "image" ? (
                                        <ImageIcon className="h-6 w-6 text-gray-500" />
                                      ) : (
                                        <Video className="h-6 w-6 text-gray-500" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-4">
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

      <Button onClick={addGrid} className="w-full skeuomorphic-button-secondary flex items-center justify-center gap-2">
        <PlusCircle className="h-4 w-4" />
        <LayoutGrid className="h-4 w-4 mr-1" />
        Agregar Grid de Imágenes/Videos
      </Button>

      <style jsx>{`
        .preview-grid {
          display: grid;
          gap: 10px;
          width: 100%;
          min-height: 200px;
        }

        .grid-layout-uniform {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }

        .grid-layout-featured .preview-item:first-child {
          grid-column: span 2;
          grid-row: span 2;
        }

        .grid-layout-featured {
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 150px;
        }

        .grid-layout-masonry {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          grid-auto-rows: 100px;
        }

        .grid-layout-masonry .preview-item-small {
          grid-row: span 1;
        }

        .grid-layout-masonry .preview-item-medium {
          grid-row: span 2;
        }

        .grid-layout-masonry .preview-item-large {
          grid-row: span 3;
          grid-column: span 2;
        }

        .grid-layout-horizontal {
          display: flex;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .grid-layout-horizontal .preview-item {
          flex: 0 0 250px;
          height: 180px;
          margin-right: 10px;
        }

        .grid-layout-gallery {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .grid-layout-gallery .preview-item {
          width: 100%;
          height: 200px;
        }

        .preview-item {
          position: relative;
          overflow: hidden;
          background-color: #2a2a2a;
          border-radius: 20px;
          min-height: 100px;
        }
      `}</style>
    </div>
  )
}

// Modificar la función generateGridsHTML para respetar el orden de los elementos
export function generateGridsHTML(grids: Grid[], textColor: string, accentColor: string) {
  if (!grids || grids.length === 0) return ""

  return `<div class="grids-container">
      ${grids
        .map(
          (grid) => `
        <div class="grid-section">
          <h3 class="section-title">${grid.title}</h3>
          <div class="grid-container grid-layout-${grid.layout}" data-columns="${grid.columns}">
            ${grid.items
              // Ordenar los elementos según su posición
              .sort((a, b) => (a.position || 0) - (b.position || 0))
              .map((item, index) => {
                // Determinar la clase de tamaño para layouts que lo soportan
                const sizeClass =
                  grid.layout === "masonry" || grid.layout === "featured" ? ` grid-item-${item.size || "medium"}` : ""

                // Clase especial para el primer elemento en layout featured
                const featuredClass = grid.layout === "featured" && index === 0 ? " grid-item-featured" : ""

                // Generar el contenido según el tipo
                let content = ""
                if (item.type === "image") {
                  content = `<img src="${item.url}" alt="${item.caption}" loading="lazy">`
                } else {
                  // video
                  if (isYouTubeUrl(item.url)) {
                    content = `<iframe src="${generateYouTubeEmbedUrl(item.url)}" frameborder="0" allowfullscreen></iframe>`
                  } else {
                    content = `<video controls><source src="${item.url}" type="video/mp4"></video>`
                  }
                }

                return `
                <div class="grid-item${sizeClass}${featuredClass}">
                  ${content}
                  ${item.caption ? `<div class="grid-caption">${item.caption}</div>` : ""}
                </div>
              `
              })
              .join("")}
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `
}

export const gridStyles = `
.grids-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.grid-section {
  margin: 40px 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
}

.grid-container {
  width: 100%;
  gap: 20px;
}

/* Layout Uniforme */
.grid-layout-uniform {
  display: grid;
  grid-template-columns: repeat(var(--columns, 3), 1fr);
}

/* Layout Destacado */
.grid-layout-featured {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 250px;
}

.grid-layout-featured .grid-item-featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* Layout Mosaico */
.grid-layout-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 200px;
}

.grid-layout-masonry .grid-item-small {
  grid-row: span 1;
}

.grid-layout-masonry .grid-item-medium {
  grid-row: span 2;
}

.grid-layout-masonry .grid-item-large {
  grid-row: span 3;
  grid-column: span 2;
}

/* Layout Horizontal */
.grid-layout-horizontal {
  display: flex;
  overflow-x: auto;
  padding-bottom: 15px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.grid-layout-horizontal .grid-item {
  flex: 0 0 300px;
  height: 250px;
  margin-right: 20px;
  scroll-snap-align: start;
}

/* Layout Galería */
.grid-layout-gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.grid-layout-gallery .grid-item {
  width: 100%;
  height: 400px;
}

/* Estilos comunes para todos los items */
.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.grid-item img, 
.grid-item iframe,
.grid-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.grid-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.9rem;
  transition: opacity 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .grid-layout-uniform {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-layout-featured {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-layout-masonry {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .grid-layout-masonry .grid-item-large {
    grid-column: span 1;
  }
}

@media (max-width: 480px) {
  .grid-layout-uniform {
    grid-template-columns: 1fr;
  }
  
  .grid-layout-featured {
    grid-template-columns: 1fr;
  }
  
  .grid-layout-featured .grid-item-featured {
    grid-column: span 1;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}

/* Ajuste para el número de columnas dinámico */
.grid-layout-uniform[data-columns="1"] {
  grid-template-columns: 1fr;
}

.grid-layout-uniform[data-columns="2"] {
  grid-template-columns: repeat(2, 1fr);
}

.grid-layout-uniform[data-columns="3"] {
  grid-template-columns: repeat(3, 1fr);
}

.grid-layout-uniform[data-columns="4"] {
  grid-template-columns: repeat(4, 1fr);
}
`

