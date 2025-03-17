"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import PerfumeForm from "@/components/perfume-form"
import SpeakerForm from "@/components/speaker-form"
import GameDetailsForm from "@/components/game-details-form"
import TvForm from "@/components/tv-form"
import CodePreview from "@/components/code-preview"
import Link from "next/link"
import { ArrowLeft, Code } from "lucide-react"
import NotebookForm from "@/components/notebook-form"
import SmartWatchForm from "@/components/smartwatch-form"
import DroneForm from "@/components/drone-form"
import SmartphoneForm from "@/components/smartphone-form"
import FreeForm from "@/components/free-form" // Importar el nuevo componente

export default function ContentGenerator() {
  const [generatedCode, setGeneratedCode] = useState("")
  const { toast } = useToast()

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code)
    toast({
      title: "Contenido generado",
      description: "El contenido ha sido generado exitosamente.",
      duration: 3000,
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    toast({
      title: "Copiado",
      description: "El código ha sido copiado al portapapeles.",
      duration: 1500,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft size={16} />
          <span>Volver al inicio</span>
        </Link>
        <Link href="/editor" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <Code size={16} />
          <span>Editor de Código</span>
        </Link>
      </div>

      <Card className="w-full skeuomorphic-card">
        <CardHeader className="bg-gradient-to-b from-blue-800 to-blue-900 text-white rounded-t-xl">
          <CardTitle className="text-3xl font-bold text-center text-shadow">Generador de Contenido</CardTitle>
          <CardDescription className="text-blue-200 text-center">
            Selecciona un tipo de contenido y completa los campos para generar el código HTML.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="perfume" className="w-full">
            <TabsList className="grid grid-cols-9 mb-6 skeuomorphic-tabs">
              <TabsTrigger value="perfume" className="skeuomorphic-tab">
                Perfume
              </TabsTrigger>
              <TabsTrigger value="game" className="skeuomorphic-tab">
                Juegos
              </TabsTrigger>
              <TabsTrigger value="tv" className="skeuomorphic-tab">
                TV
              </TabsTrigger>
              <TabsTrigger value="notebook" className="skeuomorphic-tab">
                Notebook
              </TabsTrigger>
              <TabsTrigger value="smartwatch" className="skeuomorphic-tab">
                Smartwatch
              </TabsTrigger>
              <TabsTrigger value="drone" className="skeuomorphic-tab">
                Drone
              </TabsTrigger>
              <TabsTrigger value="speaker" className="skeuomorphic-tab">
                Speaker
              </TabsTrigger>
              <TabsTrigger value="smartphone" className="skeuomorphic-tab">
                Smartphone
              </TabsTrigger>
              {/* Agregar la nueva pestaña para Libre */}
              <TabsTrigger value="free" className="skeuomorphic-tab">
                Libre
              </TabsTrigger>
            </TabsList>

            <TabsContent value="perfume">
              <PerfumeForm onGenerate={handleCodeGenerated} />
            </TabsContent>

            <TabsContent value="game">
              <GameDetailsForm onGenerate={handleCodeGenerated} />
            </TabsContent>

            <TabsContent value="tv">
              <TvForm onGenerate={handleCodeGenerated} />
            </TabsContent>

            <TabsContent value="notebook">
              <NotebookForm onGenerate={handleCodeGenerated} />
            </TabsContent>

            <TabsContent value="smartwatch">
              <SmartWatchForm onGenerate={handleCodeGenerated} />
            </TabsContent>

            <TabsContent value="drone">
              <DroneForm onGenerate={handleCodeGenerated} />
            </TabsContent>

            <TabsContent value="speaker">
              <SpeakerForm onGenerate={handleCodeGenerated} />
            </TabsContent>

            <TabsContent value="smartphone">
              <SmartphoneForm onGenerate={handleCodeGenerated} />
            </TabsContent>

            {/* Agregar el contenido para la pestaña Libre */}
            <TabsContent value="free">
              <FreeForm onGenerate={handleCodeGenerated} />
            </TabsContent>
          </Tabs>

          {generatedCode && (
            <div className="mt-8 skeuomorphic-section p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-300">Código Generado</h2>
                <Button onClick={copyToClipboard} variant="outline" size="sm" className="skeuomorphic-button-secondary">
                  Copiar Código
                </Button>
              </div>
              <CodePreview code={generatedCode} />

              <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-300">Vista Previa</h2>
              <div className="border border-gray-800 rounded-lg p-4 bg-gray-900 shadow-lg">
                <div dangerouslySetInnerHTML={{ __html: generatedCode }} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

