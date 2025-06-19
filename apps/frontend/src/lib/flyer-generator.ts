// Flyer generation utilities
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

export function generateFlyerCanvas(data: FlyerData, template = "modern"): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!

  // Set canvas dimensions for social media (1200x630 for Facebook/Twitter)
  canvas.width = 1200
  canvas.height = 630

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
  ctx.font = "bold 32px Arial"
  ctx.fillText("FundHope", 50, 70)

  // Campaign category badge
  ctx.fillStyle = style.accentColor
  ctx.fillRect(canvas.width - 200, 20, 150, 40)
  ctx.fillStyle = "white"
  ctx.font = "16px Arial"
  ctx.fillText(data.category, canvas.width - 180, 45)

  // Main content area
  const contentY = 160

  // Campaign title
  ctx.fillStyle = style.secondaryColor
  ctx.font = "bold 48px Arial"
  const titleLines = wrapText(ctx, data.campaignTitle, 50, canvas.width - 100, 48)
  titleLines.forEach((line, index) => {
    ctx.fillText(line, 50, contentY + index * 60)
  })

  // Description
  ctx.fillStyle = style.secondaryColor
  ctx.font = "24px Arial"
  const descLines = wrapText(ctx, data.campaignDescription, 50, canvas.width - 100, 24)
  const descY = contentY + titleLines.length * 60 + 30
  descLines.slice(0, 3).forEach((line, index) => {
    ctx.fillText(line, 50, descY + index * 35)
  })

  // Progress section
  const progressY = descY + 140

  // Progress bar background
  ctx.fillStyle = "#e5e7eb"
  ctx.fillRect(50, progressY, canvas.width - 100, 20)

  // Progress bar fill
  const progressPercent = (data.currentAmount / data.targetAmount) * 100
  const progressWidth = ((canvas.width - 100) * progressPercent) / 100
  ctx.fillStyle = style.primaryColor
  ctx.fillRect(50, progressY, progressWidth, 20)

  // Progress text
  ctx.fillStyle = style.secondaryColor
  ctx.font = "bold 28px Arial"
  ctx.fillText(`₦${data.currentAmount.toLocaleString()}`, 50, progressY + 50)
  ctx.font = "20px Arial"
  ctx.fillText(`raised of ₦${data.targetAmount.toLocaleString()} goal`, 50, progressY + 80)

  // Stats
  const statsY = progressY + 120
  ctx.font = "bold 24px Arial"
  ctx.fillText(`${data.donorCount} donors`, 50, statsY)
  ctx.fillText(`${data.daysLeft} days left`, 300, statsY)

  // Call to action
  ctx.fillStyle = style.primaryColor
  ctx.fillRect(50, statsY + 40, 300, 60)
  ctx.fillStyle = "white"
  ctx.font = "bold 24px Arial"
  ctx.fillText("Donate Now", 120, statsY + 80)

  // QR Code placeholder (in real app, generate actual QR code)
  ctx.fillStyle = style.secondaryColor
  ctx.fillRect(canvas.width - 150, statsY + 20, 100, 100)
  ctx.fillStyle = "white"
  ctx.font = "12px Arial"
  ctx.fillText("Scan to", canvas.width - 140, statsY + 65)
  ctx.fillText("Donate", canvas.width - 135, statsY + 80)

  // Campaign URL
  ctx.fillStyle = style.secondaryColor
  ctx.font = "18px Arial"
  ctx.fillText(data.campaignUrl, 50, canvas.height - 30)

  return canvas
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  maxWidth: number,
  lineHeight: number,
): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = ctx.measureText(currentLine + " " + word).width
    if (width < maxWidth) {
      currentLine += " " + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  lines.push(currentLine)
  return lines
}

export function downloadFlyer(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a")
  link.download = filename
  link.href = canvas.toDataURL()
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
