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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && campaignData) {
      generateFlyer();
    }
  }, [isOpen, selectedTemplate, campaignData]);

  const generateFlyer = () => {
    const canvas = generateFlyerCanvas(campaignData, selectedTemplate);
    const dataUrl = canvas.toDataURL("image/png");
    setGeneratedFlyer(dataUrl);
  };

  const handleDownload = () => {
    const canvas = generateFlyerCanvas(campaignData, selectedTemplate);
    downloadFlyer(
      canvas,
      `${campaignData.campaignTitle.replace(/\s+/g, "-").toLowerCase()}-flyer.png`
    );
  };

  const handleShare = (platform: string) => {
    shareToSocialMedia(platform, campaignData);
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
            Create and share beautiful flyers for your campaign on social media
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Template</h3>
            <div className="grid grid-cols-2 gap-3">
              {flyerTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-3">
                    <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Preview</span>
                    </div>
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <p className="text-xs text-gray-600">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Campaign Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Title:</span>
                  <p className="text-sm text-gray-600">
                    {campaignData.campaignTitle}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Goal:</span>
                  <p className="text-sm text-gray-600">
                    ${campaignData.targetAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Raised:</span>
                  <p className="text-sm text-gray-600">
                    ${campaignData.currentAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Category:</span>
                  <Badge variant="secondary">{campaignData.category}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flyer Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Flyer Preview</h3>

            {generatedFlyer && (
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={generatedFlyer || "/placeholder.svg"}
                  alt="Generated flyer"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleDownload}
                className="w-full"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Flyer
              </Button>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Share on Social Media</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleShare("facebook")}
                    variant="outline"
                    size="sm"
                    className="text-blue-600"
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() => handleShare("twitter")}
                    variant="outline"
                    size="sm"
                    className="text-sky-500"
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button
                    onClick={() => handleShare("linkedin")}
                    variant="outline"
                    size="sm"
                    className="text-blue-700"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button
                    onClick={() => handleShare("whatsapp")}
                    variant="outline"
                    size="sm"
                    className="text-green-600"
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
                >
                  <Send className="mr-2 h-4 w-4" />
                  Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
