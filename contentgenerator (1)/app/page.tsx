"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Layers } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#0c1424]">
      <div className="skeuomorphic-card p-10 max-w-3xl w-full mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-white bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
          Cadastro Web
        </h1>
        <p className="text-blue-200 mb-8 text-xl">
          Plataforma de generación de contenido HTML para diferentes tipos de productos
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/generator" className="inline-block">
            <Button className="skeuomorphic-button text-lg py-6 px-8 w-full sm:w-auto flex items-center justify-center gap-2">
              <Layers className="h-5 w-5" />
              Acceder al Generador
            </Button>
          </Link>

          <Link href="/editor" className="inline-block">
            <Button className="skeuomorphic-button text-lg py-6 px-8 w-full sm:w-auto flex items-center justify-center gap-2">
              <Code className="h-5 w-5" />
              Editor de Código
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

