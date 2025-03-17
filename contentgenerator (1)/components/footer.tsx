export function Footer() {
  return (
    <footer className="w-full py-4 mt-8 border-t border-blue-800 bg-gradient-to-b from-blue-950 to-black">
      <div className="container mx-auto px-4 text-center">
        <p className="text-blue-400 text-sm">
          Creado por <span className="font-bold text-blue-300">Mateo Cristaldo</span> © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

