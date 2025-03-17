"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface CodePreviewProps {
  code: string
}

export default function CodePreview({ code }: CodePreviewProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="skeuomorphic-code p-4 rounded-lg overflow-auto max-h-[400px] text-sm">
        <code>{code}</code>
      </pre>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 bg-blue-700 text-white"
        onClick={copyToClipboard}
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copiar código</span>
      </Button>
      {isCopied && (
        <div className="absolute top-2 right-12 bg-blue-800 text-white px-2 py-1 rounded text-xs">Copiado!</div>
      )}
    </div>
  )
}

