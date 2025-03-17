"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { ArrowLeft, Copy, Play, Download } from "lucide-react"
import { Footer } from "@/components/footer"

export default function CodeEditor() {
  const [htmlCode, setHtmlCode] = useState<string>(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Proyecto</title>
  <style>
    /* Estilos aquí */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f0f0f0;
      color: #333;
    }
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
    }
    h1 {
      color: #2563eb;
    }
    /* Añade más estilos según necesites */
  </style>
</head>
<body>
  <div class="container">
    <h1>Bienvenido a mi proyecto</h1>
    <p>Este es un ejemplo de código HTML. Puedes editarlo según tus necesidades.</p>
  </div>
</body>
</html>`)

  const [preview, setPreview] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    updatePreview()
  }, [])

  const updatePreview = () => {
    setPreview(htmlCode)
    toast({
      title: "Vista previa actualizada",
      description: "La vista previa ha sido actualizada con tu código.",
      duration: 1500,
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode)
    toast({
      title: "Copiado",
      description: "El código ha sido copiado al portapapeles.",
      duration: 1500,
    })
  }

  const downloadCode = () => {
    const blob = new Blob([htmlCode], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "proyecto.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast({
      title: "Descargado",
      description: "El código ha sido descargado como proyecto.html",
      duration: 1500,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen flex flex-col">
      <Link href="/" className="flex items-center gap-2 text-blue-400 mb-4 hover:text-blue-300 transition-colors">
        <ArrowLeft size={16} />
        <span>Volver al inicio</span>
      </Link>

      <Card className="w-full skeuomorphic-card flex-grow">
        <CardHeader className="bg-gradient-to-b from-blue-800 to-blue-900 text-white rounded-t-xl">
          <CardTitle className="text-3xl font-bold text-center text-shadow">Editor de Código</CardTitle>
          <CardDescription className="text-blue-200 text-center">
            Edita tu código HTML y visualiza los resultados en tiempo real
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="editor-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-300">Código HTML</h2>
              <div className="flex gap-2">
                <Button
                  onClick={updatePreview}
                  variant="outline"
                  size="sm"
                  className="skeuomorphic-button-secondary flex items-center gap-1"
                >
                  <Play className="h-4 w-4" />
                  Ejecutar
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="skeuomorphic-button-secondary flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copiar
                </Button>
                <Button
                  onClick={downloadCode}
                  variant="outline"
                  size="sm"
                  className="skeuomorphic-button-secondary flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Descargar
                </Button>
              </div>
            </div>
            <div className="relative">
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-[500px] p-4 bg-gray-900 text-gray-100 font-mono text-sm rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                spellCheck="false"
              />
            </div>
          </div>

          <div className="preview-section">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">Vista Previa</h2>
            <div className="border border-gray-800 rounded-lg bg-white shadow-lg h-[500px] overflow-auto">
              <iframe srcDoc={preview} title="preview" className="w-full h-full" sandbox="allow-scripts" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Footer />
    </div>
  )
}

