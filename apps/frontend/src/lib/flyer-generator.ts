// Enhanced flyer generation utilities with QR code and image support
export interface FlyerData {
  campaignTitle: string
  campaignDescription: string
  targetAmount: number
  currentAmount: number
  donorCount: number
  daysLeft: number
  organizerName: string
  category: string
  campaignUrl: string
  campaignImage?: string
}

export interface FlyerTemplate {
  id: string
  name: string
  description: string
  preview: string
}

export const flyerTemplates: FlyerTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with bold typography",
    preview: "/flyer-templates/modern.png",
  },
  {
    id: "compassionate",
    name: "Compassionate",
    description: "Warm and emotional design perfect for medical campaigns",
    preview: "/flyer-templates/compassionate.png",
  },
  {
    id: "community",
    name: "Community",
    description: "Friendly design ideal for community and education campaigns",
    preview: "/flyer-templates/community.png",
  },
  {
    id: "urgent",
    name: "Urgent",
    description: "Bold design that conveys urgency for emergency campaigns",
    preview: "/flyer-templates/urgent.png",
  },
]

// QR Code generation function
export function generateQRCode(text: string, size = 100): Promise<string> {
  return new Promise((resolve) => {
    // Create a simple QR code using a data URL pattern
    // In a real implementation, you'd use a QR code library like 'qrcode'
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    canvas.width = size
    canvas.height = size

    // Simple QR code pattern (placeholder)
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, size, size)

    ctx.fillStyle = "#FFFFFF"
    const moduleSize = size / 25

    // Create a simple pattern that looks like a QR code
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if ((i + j) % 3 === 0 || (i % 4 === 0 && j % 4 === 0)) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize)
        }
      }
    }

    // Add finder patterns (corners)
    ctx.fillStyle = "#000000"
    // Top-left
    ctx.fillRect(0, 0, moduleSize * 7, moduleSize * 7)
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(moduleSize, moduleSize, moduleSize * 5, moduleSize * 5)
    ctx.fillStyle = "#000000"
    ctx.fillRect(moduleSize * 2, moduleSize * 2, moduleSize * 3, moduleSize * 3)

    // Top-right
    ctx.fillStyle = "#000000"
    ctx.fillRect(size - moduleSize * 7, 0, moduleSize * 7, moduleSize * 7)
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(size - moduleSize * 6, moduleSize, moduleSize * 5, moduleSize * 5)
    ctx.fillStyle = "#000000"
    ctx.fillRect(size - moduleSize * 5, moduleSize * 2, moduleSize * 3, moduleSize * 3)

    // Bottom-left
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, size - moduleSize * 7, moduleSize * 7, moduleSize * 7)
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(moduleSize, size - moduleSize * 6, moduleSize * 5, moduleSize * 5)
    ctx.fillStyle = "#000000"
    ctx.fillRect(moduleSize * 2, size - moduleSize * 5, moduleSize * 3, moduleSize * 3)

    resolve(canvas.toDataURL())
  })
}

// Text wrapping function with better handling for long text
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  maxWidth: number,
  lineHeight: number,
  maxLines?: number,
): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = words[0] || ""
  let i = 1

  for (; i < words.length; i++) {
    const word = words[i]
    const width = ctx.measureText(currentLine + " " + word).width
    if (width < maxWidth) {
      currentLine += " " + word
    } else {
      lines.push(currentLine)
      currentLine = word

      // Stop if we've reached max lines
      if (maxLines && lines.length >= maxLines) {
        break
      }
    }
  }

  if (currentLine && (!maxLines || lines.length < maxLines)) {
    lines.push(currentLine)
  }

  // If we hit the max lines limit, add ellipsis to the last line
  if (maxLines && lines.length === maxLines && i < words.length) {
    const lastLine = lines[lines.length - 1]
    const ellipsis = "..."
    const testLine = lastLine + ellipsis

    if (ctx.measureText(testLine).width <= maxWidth) {
      lines[lines.length - 1] = testLine
    } else {
      // Remove words from the last line until it fits with ellipsis
      const lastLineWords = lastLine.split(" ")
      for (let j = lastLineWords.length - 1; j >= 0; j--) {
        const truncatedLine = lastLineWords.slice(0, j).join(" ") + ellipsis
        if (ctx.measureText(truncatedLine).width <= maxWidth) {
          lines[lines.length - 1] = truncatedLine
          break
        }
      }
    }
  }

  return lines
}

// Load image helper function
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export async function generateFlyerCanvas(data: FlyerData, template = "modern"): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!

  // Set canvas dimensions with extra height for proper spacing
  canvas.width = 1200
  canvas.height = 800 // Increased from 630 to ensure everything fits

  // Template-specific styling
  const templates = {
    modern: {
      bgColor: "#f8fafc",
      primaryColor: "#059669",
      secondaryColor: "#374151",
      accentColor: "#10b981",
    },
    compassionate: {
      bgColor: "#fef2f2",
      primaryColor: "#dc2626",
      secondaryColor: "#7f1d1d",
      accentColor: "#ef4444",
    },
    community: {
      bgColor: "#eff6ff",
      primaryColor: "#2563eb",
      secondaryColor: "#1e40af",
      accentColor: "#3b82f6",
    },
    urgent: {
      bgColor: "#fff7ed",
      primaryColor: "#ea580c",
      secondaryColor: "#9a3412",
      accentColor: "#f97316",
    },
  }

  const style = templates[template as keyof typeof templates] || templates.modern

  // Background
  ctx.fillStyle = style.bgColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Header section
  ctx.fillStyle = style.primaryColor
  ctx.fillRect(0, 0, canvas.width, 120)

  // FundHope logo and branding
  ctx.fillStyle = "white"
  ctx.font = "bold 32px Arial, sans-serif"
  ctx.fillText("GiveACause", 50, 70)

  // Campaign category badge
  ctx.fillStyle = style.accentColor
  ctx.fillRect(canvas.width - 200, 20, 150, 40)
  ctx.fillStyle = "white"
  ctx.font = "16px Arial, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(data.category, canvas.width - 125, 45)
  ctx.textAlign = "left"

  // Load and draw campaign image if available
  let imageHeight = 0
  let hasImage = false
  if (data.campaignImage) {
    try {
      const img = await loadImage(data.campaignImage)
      const imageWidth = 300
      imageHeight = 200
      const imageX = canvas.width - imageWidth - 50
      const imageY = 140

      // Draw image with rounded corners effect
      ctx.save()
      ctx.beginPath()
      ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 10)
      ctx.clip()
      ctx.drawImage(img, imageX, imageY, imageWidth, imageHeight)
      ctx.restore()

      // Add border
      ctx.strokeStyle = style.secondaryColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 10)
      ctx.stroke()

      hasImage = true
    } catch (error) {
      console.warn("Failed to load campaign image:", error)
    }
  }

  // Main content area
  const contentY = 160
  const contentWidth = hasImage ? canvas.width - 400 : canvas.width - 100

  // Campaign title with better text wrapping
  ctx.fillStyle = style.secondaryColor
  ctx.font = "bold 42px Arial, sans-serif"
  const titleLines = wrapText(ctx, data.campaignTitle, 50, contentWidth, 50, 2)
  titleLines.forEach((line, index) => {
    ctx.fillText(line, 50, contentY + index * 50)
  })

  // Description with full text accommodation
  ctx.fillStyle = style.secondaryColor
  ctx.font = "20px Arial, sans-serif"
  const descLines = wrapText(ctx, data.campaignDescription, 50, contentWidth, 28) // Removed maxLines limit
  const descY = contentY + titleLines.length * 50 + 20

  // Calculate required height for all description text
  const descriptionHeight = descLines.length * 28
  const minCanvasHeight = descY + descriptionHeight + 400 // 400px for progress, stats, QR, and bottom padding

  // Dynamically adjust canvas height if needed
  if (minCanvasHeight > canvas.height) {
    canvas.height = minCanvasHeight
    // Redraw background with new height
    ctx.fillStyle = style.bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Redraw header section
    ctx.fillStyle = style.primaryColor
    ctx.fillRect(0, 0, canvas.width, 120)

    // Redraw logo and category badge
    ctx.fillStyle = "white"
    ctx.font = "bold 32px Arial, sans-serif"
    ctx.fillText("GiveACause", 50, 70)

    ctx.fillStyle = style.accentColor
    ctx.fillRect(canvas.width - 200, 20, 150, 40)
    ctx.fillStyle = "white"
    ctx.font = "16px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(data.category, canvas.width - 125, 45)
    ctx.textAlign = "left"

    // Redraw image if it exists
    if (hasImage && data.campaignImage) {
      try {
        const img = await loadImage(data.campaignImage)
        const imageWidth = 300
        const imageHeight = 200
        const imageX = canvas.width - imageWidth - 50
        const imageY = 140

        ctx.save()
        ctx.beginPath()
        ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 10)
        ctx.clip()
        ctx.drawImage(img, imageX, imageY, imageWidth, imageHeight)
        ctx.restore()

        ctx.strokeStyle = style.secondaryColor
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 10)
        ctx.stroke()
      } catch (error) {
        console.warn("Failed to redraw campaign image:", error)
      }
    }

    // Redraw title
    ctx.fillStyle = style.secondaryColor
    ctx.font = "bold 42px Arial, sans-serif"
    titleLines.forEach((line, index) => {
      ctx.fillText(line, 50, contentY + index * 50)
    })
  }

  // Render all description lines
  ctx.fillStyle = style.secondaryColor
  ctx.font = "20px Arial, sans-serif"
  descLines.forEach((line, index) => {
    ctx.fillText(line, 50, descY + index * 28)
  })

  // Progress section - ensure it doesn't push other elements too low with better spacing
  const progressY = descY + descLines.length * 28 + 50

  // Progress bar background
  ctx.fillStyle = "#e5e7eb"
  ctx.fillRect(50, progressY, contentWidth - 50, 20)

  // Progress bar fill
  const progressPercent = Math.min((data.currentAmount / data.targetAmount) * 100, 100)
  const progressWidth = ((contentWidth - 50) * progressPercent) / 100
  ctx.fillStyle = style.primaryColor
  ctx.fillRect(50, progressY, progressWidth, 20)

  // Progress text
  ctx.fillStyle = style.secondaryColor
  ctx.font = "bold 24px Arial, sans-serif"
  ctx.fillText(`₦${data.currentAmount.toLocaleString()}`, 50, progressY + 45)
  ctx.font = "18px Arial, sans-serif"
  ctx.fillText(`raised of ₦${data.targetAmount.toLocaleString()} target`, 50, progressY + 70)

  // Stats
  const statsY = progressY + 100
  ctx.font = "bold 20px Arial, sans-serif"
  ctx.fillText(`${data.donorCount} donors`, 50, statsY)
  ctx.fillText(`${data.daysLeft} days left`, 250, statsY)

  // Call to action button
  ctx.fillStyle = style.primaryColor
  ctx.fillRect(50, statsY + 20, 250, 50)
  ctx.fillStyle = "white"
  ctx.font = "bold 20px Arial, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("Donate Now", 175, statsY + 50)
  ctx.textAlign = "left"

  // Calculate QR code position - ensure it's always visible with proper spacing
  const qrCodeSize = 120
  const qrX = canvas.width - qrCodeSize - 50
  const qrY = progressY + 150

  // Generate and add QR code
  try {
    const qrCodeDataUrl = await generateQRCode(data.campaignUrl, qrCodeSize)
    const qrImg = await loadImage(qrCodeDataUrl)

    // QR code background with proper padding
    ctx.fillStyle = "white"
    ctx.fillRect(qrX - 10, qrY - 10, qrCodeSize + 20, qrCodeSize + 20)
    ctx.strokeStyle = style.secondaryColor
    ctx.lineWidth = 2
    ctx.strokeRect(qrX - 10, qrY - 10, qrCodeSize + 20, qrCodeSize + 20)

    // Draw QR code
    ctx.drawImage(qrImg, qrX, qrY, qrCodeSize, qrCodeSize)

    // QR code label with proper spacing
    ctx.fillStyle = style.secondaryColor
    ctx.font = "14px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Scan to Donate", qrX + qrCodeSize / 2, qrY + qrCodeSize + 25)
    ctx.textAlign = "left"
  } catch (error) {
    console.warn("Failed to generate QR code:", error)
  }

  // Organizer info - positioned with proper spacing from bottom
  ctx.fillStyle = style.secondaryColor
  ctx.font = "16px Arial, sans-serif"
  ctx.fillText(`Organized by ${data.organizerName}`, 50, canvas.height - 50)

  // Campaign URL at bottom - ensure it's never truncated
  ctx.font = "14px Arial, sans-serif"
  const fullUrl = data.campaignUrl

  // Measure text width and adjust if needed
  const maxUrlWidth = canvas.width - 100 // Leave 50px padding on each side
  let displayUrl = fullUrl

  // Only truncate if absolutely necessary and the URL is extremely long
  if (ctx.measureText(displayUrl).width > maxUrlWidth) {
    // Try to keep the important parts (domain and campaign identifier)
    const urlParts = fullUrl.split("/")
    if (urlParts.length > 3) {
      displayUrl = `${urlParts[0]}//${urlParts[2]}/.../${urlParts[urlParts.length - 1]}`

      // If still too long, truncate more carefully
      if (ctx.measureText(displayUrl + "...").width > maxUrlWidth && displayUrl.length > 20) {
        displayUrl = displayUrl.slice(0, -1)
      }
      displayUrl += "..."
    }
  }

  ctx.fillText(displayUrl, 50, canvas.height - 25)

  return canvas
}

export function downloadFlyer(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a")
  link.download = filename
  link.href = canvas.toDataURL("image/png")
  link.click()
}

export function shareToSocialMedia(platform: string, campaignData: FlyerData, flyerUrl?: string) {
  const baseUrl = window.location.origin
  const campaignUrl = `${baseUrl}/campaign/${campaignData.campaignUrl}`
  const text = `Help ${campaignData.organizerName} reach their goal! ${campaignData.campaignTitle}`

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}&quote=${encodeURIComponent(text)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(campaignUrl)}&hashtags=fundraising,help,donate`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(campaignUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${campaignUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(campaignUrl)}&text=${encodeURIComponent(text)}`,
  }

  const url = shareUrls[platform as keyof typeof shareUrls]
  if (url) {
    window.open(url, "_blank", "width=600,height=400")
  }
}
