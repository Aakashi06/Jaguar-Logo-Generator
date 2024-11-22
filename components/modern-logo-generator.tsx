'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import html2canvas from 'html2canvas'

const fontFamilies = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Sunflower:wght@500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');

  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://fonts.cdnfonts.com/css/proxima-nova-2') format('woff2');
  }
  
  @font-face {
    font-family: 'Fogie';
    src: url('https://fonts.cdnfonts.com/css/fogie') format('woff2');
  }
  
  @font-face {
    font-family: 'Luxia';
    src: url('https://fonts.cdnfonts.com/css/luxia') format('woff2');
  }
  
  @font-face {
    font-family: 'Pulsar';
    src: url('https://fonts.cdnfonts.com/css/pulsar') format('woff2');
  }
  
  @font-face {
    font-family: 'Loef';
    src: url('https://fonts.cdnfonts.com/css/loef') format('woff2');
  }
`

export function ModernLogoGenerator() {
  const [text, setText] = useState('JAGUAR')
  const [font, setFont] = useState('Proxima Nova')
  const [color, setColor] = useState('#D4AF37') // Metallic gold
  const [spacing, setSpacing] = useState(20)
  const [fontSize, setFontSize] = useState(48)
  const [isOutline, setIsOutline] = useState(true)
  const logoRef = useRef<HTMLDivElement>(null)

  const fonts = [
    'Proxima Nova',
    'Poppins',
    'Sunflower',
    'Comfortaa',
    'Fogie',
    'Luxia',
    'Pulsar',
    'Loef',
    'cursive'
  ]

  const downloadAsPNG = async () => {
    if (logoRef.current) {
      const canvas = await html2canvas(logoRef.current, {
        backgroundColor: null,
        scale: 2
      })
      
      const link = document.createElement('a')
      link.download = `${text.toLowerCase()}-logo.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  return (
    <>
      <style>{fontFamilies}</style>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Modern Logo Generator</h1>
            <p className="text-muted-foreground">Create a modern, aesthetic logo for your brand</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Controls */}
            <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="text">Logo Text</Label>
                <Input
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your brand name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font">Font Style</Label>
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  type="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-2">
                <Label>Letter Spacing: {spacing}px</Label>
                <Slider
                  value={[spacing]}
                  onValueChange={(value) => setSpacing(value[0])}
                  min={0}
                  max={50}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <Label>Font Size: {fontSize}px</Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  min={24}
                  max={96}
                  step={1}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="outline"
                  checked={isOutline}
                  onChange={(e) => setIsOutline(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="outline">Outline Style</Label>
              </div>

              <Button onClick={downloadAsPNG} className="w-full">
                Download PNG
              </Button>
            </div>

            {/* Preview */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center min-h-[400px]">
              <div
                ref={logoRef}
                className="p-8 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
                }}
              >
                <div
                  style={{
                    fontFamily: font,
                    color: color,
                    letterSpacing: `${spacing}px`,
                    fontSize: `${fontSize}px`,
                    fontWeight: 'bold',
                    WebkitTextStroke: isOutline ? `1px ${color}` : 'none',
                    WebkitTextFillColor: isOutline ? 'transparent' : color,
                  }}
                >
                  {text}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}