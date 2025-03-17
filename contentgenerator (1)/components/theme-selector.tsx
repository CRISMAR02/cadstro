"use client"

interface ThemeSelectorProps {
  themes: { [key: string]: any }
  selectedTheme: string
  onThemeChange: (theme: string) => void
}

export default function ThemeSelector({ themes, selectedTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            type="button"
            className={`p-2 rounded-md transition-all ${
              selectedTheme === key ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
            }`}
            style={{
              backgroundColor: theme.backgroundColor,
              border: `1px solid ${theme.accentColor}`,
            }}
            onClick={() => onThemeChange(key)}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: theme.accentColor }}></div>
              <div
                className="w-full h-2 rounded-full"
                style={{ backgroundColor: theme.highlightColor || theme.accentColor }}
              ></div>
              <span className="text-xs font-medium mt-1" style={{ color: theme.textColor }}>
                {theme.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

