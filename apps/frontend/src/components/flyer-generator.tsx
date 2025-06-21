"use client";

import { useState, useRef, useEffect } from "react";
import {
  Download,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Send,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  generateFlyerCanvas,
  downloadFlyer,
  shareToSocialMedia,
  flyerTemplates,
  type FlyerData,
} from "@/lib/flyer-generator";

interface FlyerGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  campaignData: FlyerData;
}

export function FlyerGenerator({
  isOpen,
  onClose,
  campaignData,
}: FlyerGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [generatedFlyer, setGeneratedFlyer] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && campaignData) {
      generateFlyer();
    }
  }, [isOpen, selectedTemplate, campaignData]);

  const generateFlyer = async () => {
    setIsGenerating(true);
    setError("");

    try {
      const canvas = await generateFlyerCanvas(campaignData, selectedTemplate);
      const dataUrl = canvas.toDataURL("image/png");
      setGeneratedFlyer(dataUrl);
    } catch (err) {
      console.error("Error generating flyer:", err);
      setError("Failed to generate flyer. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    try {
      const canvas = await generateFlyerCanvas(campaignData, selectedTemplate);
      downloadFlyer(
        canvas,
        `${campaignData.campaignTitle.replace(/\s+/g, "-").toLowerCase()}-flyer.png`
      );
    } catch (err) {
      console.error("Error downloading flyer:", err);
      setError("Failed to download flyer. Please try again.");
    }
  };

  const handleShare = (platform: string) => {
    shareToSocialMedia(platform, campaignData);
  };

  const handleRegenerateFlyer = () => {
    generateFlyer();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-fit max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-blue-500" />
            <span>Generate Campaign Flyer</span>
          </DialogTitle>
          <DialogDescription>
            Create beautiful, shareable flyers for your campaign with QR codes
            and campaign images
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Selection and Campaign Info */}
          <div className="space-y-6">
            {/* Template Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
              <div className="grid grid-cols-2 gap-3">
                {flyerTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-3 flex items-center justify-center">
                        <span className="text-xs text-gray-500 font-medium">
                          {template.name}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm mb-1">
                        {template.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {template.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Campaign Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Title:</span>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {campaignData.campaignTitle}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Description:</span>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {campaignData.campaignDescription}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium">Goal:</span>
                    <p className="text-sm text-gray-600">
                      ₦{campaignData.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Raised:</span>
                    <p className="text-sm text-gray-600">
                      ₦{campaignData.currentAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium">Category:</span>
                  <Badge variant="secondary" className="ml-2">
                    {campaignData.category}
                  </Badge>
                </div>
                {campaignData.campaignImage && (
                  <div>
                    <span className="text-sm font-medium">Campaign Image:</span>
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Image will be included in flyer
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features Info */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Flyer Features
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ QR code for easy mobile donations</li>
                  <li>✓ Campaign image integration</li>
                  <li>✓ Smart text wrapping for long descriptions</li>
                  <li>✓ Progress bar and statistics</li>
                  <li>✓ Social media optimized (1200x630px)</li>
                  <li>✓ Professional branding</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Flyer Preview and Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Flyer Preview</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateFlyer}
                disabled={isGenerating}
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
                />
                Regenerate
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Flyer Preview */}
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              {isGenerating ? (
                <div className="aspect-[1200/630] flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Generating flyer...</p>
                  </div>
                </div>
              ) : generatedFlyer ? (
                <img
                  src={generatedFlyer || "/placeholder.svg"}
                  alt="Generated flyer"
                  className="w-full h-auto"
                  style={{ aspectRatio: "1200/630" }}
                />
              ) : (
                <div className="aspect-[1200/630] flex items-center justify-center">
                  <p className="text-gray-500">Flyer will appear here</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleDownload}
                className="w-full"
                variant="outline"
                disabled={!generatedFlyer || isGenerating}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Flyer (PNG)
              </Button>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Share on Social Media</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleShare("facebook")}
                    variant="outline"
                    size="sm"
                    className="text-blue-600"
                    disabled={!generatedFlyer}
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() => handleShare("twitter")}
                    variant="outline"
                    size="sm"
                    className="text-sky-500"
                    disabled={!generatedFlyer}
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button
                    onClick={() => handleShare("linkedin")}
                    variant="outline"
                    size="sm"
                    className="text-blue-700"
                    disabled={!generatedFlyer}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button
                    onClick={() => handleShare("whatsapp")}
                    variant="outline"
                    size="sm"
                    className="text-green-600"
                    disabled={!generatedFlyer}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </div>
                <Button
                  onClick={() => handleShare("telegram")}
                  variant="outline"
                  size="sm"
                  className="w-full text-blue-500"
                  disabled={!generatedFlyer}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Telegram
                </Button>
              </div>
            </div>

            {/* Tips */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-green-900 mb-2">
                  Sharing Tips
                </h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>
                    • Post during peak hours (7-9 PM) for maximum engagement
                  </li>
                  <li>• Include a personal message when sharing</li>
                  <li>• Tag friends and family who might be interested</li>
                  <li>• Share in relevant groups and communities</li>
                  <li>• Use the QR code for offline promotion</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
