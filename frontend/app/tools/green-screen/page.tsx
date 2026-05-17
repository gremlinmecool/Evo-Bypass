'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function GreenScreenRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sensitivity, setSensitivity] = useState(30);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGreenScreen = () => {
    if (!image || !canvasRef.current) return;

    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Remove green screen
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Check if pixel is green
        if (green > red + sensitivity && green > blue + sensitivity) {
          data[i + 3] = 0; // Make transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL('image/png'));
      setIsProcessing(false);
    };

    img.src = image;
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.download = 'removed-background.png';
    link.href = processedImage;
    link.click();
  };

  return (
    <div className="mx-auto w-full max-w-6xl animate-fadeIn space-y-12 px-4 py-12">
      {/* Header */}
      <section className="text-center">
        <Link
          href="/tools"
          className="mb-4 inline-flex items-center gap-2 text-sm text-zen-text-muted hover:text-zen-accent transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Tools
        </Link>
        <h1 className="text-4xl font-bold text-zen-text md:text-5xl">
          Green Screen Remover
        </h1>
        <p className="mt-4 text-lg text-zen-text-muted">
          Remove green backgrounds from images instantly
        </p>
      </section>

      {/* Upload Section */}
      <section className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-zen-border bg-zen-surface-1/40 p-8 backdrop-blur-sm">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {!image ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-xl border-2 border-dashed border-zen-border bg-zen-surface-2/40 p-12 text-center transition-all hover:border-zen-accent/40 hover:bg-zen-surface-2/60"
            >
              <svg
                className="mx-auto mb-4 h-12 w-12 text-zen-text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-lg font-semibold text-zen-text">
                Click to upload image
              </p>
              <p className="mt-2 text-sm text-zen-text-muted">
                PNG, JPG, WEBP up to 10MB
              </p>
            </button>
          ) : (
            <div className="space-y-6">
              {/* Preview */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold text-zen-text">Original</p>
                  <div className="relative overflow-hidden rounded-xl border border-zen-border bg-zen-surface-2/40">
                    <img src={image} alt="Original" className="w-full" />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-zen-text">Processed</p>
                  <div className="relative overflow-hidden rounded-xl border border-zen-border bg-zen-surface-2/40">
                    {processedImage ? (
                      <div
                        className="w-full"
                        style={{
                          backgroundImage:
                            'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px',
                        }}
                      >
                        <img src={processedImage} alt="Processed" className="w-full" />
                      </div>
                    ) : (
                      <div className="flex h-full min-h-[200px] items-center justify-center text-zen-text-muted">
                        No preview yet
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zen-text">
                    Sensitivity: {sensitivity}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sensitivity}
                    onChange={(e) => setSensitivity(Number(e.target.value))}
                    className="w-full accent-zen-accent"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={removeGreenScreen}
                    disabled={isProcessing}
                    className="zen-accent-bg flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-zen-bg shadow-lg transition-all hover:scale-[1.02] hover:shadow-zen-glow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Remove Background'}
                  </button>

                  {processedImage && (
                    <button
                      onClick={downloadImage}
                      className="rounded-xl border border-zen-accent/30 bg-zen-accent-soft px-6 py-3 text-sm font-semibold text-zen-accent transition-all hover:border-zen-accent/50 hover:shadow-zen-glow"
                    >
                      Download
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setImage(null);
                      setProcessedImage(null);
                    }}
                    className="rounded-xl border border-zen-border bg-zen-surface-2/60 px-6 py-3 text-sm font-semibold text-zen-text-muted transition-all hover:text-zen-text hover:border-zen-border-strong"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-zen-border bg-zen-surface-1/40 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-zen-text">How it works</h3>
          <ol className="space-y-3 text-sm text-zen-text-muted">
            <li className="flex gap-3">
              <span className="zen-accent-text font-semibold">1.</span>
              Upload an image with a green screen background
            </li>
            <li className="flex gap-3">
              <span className="zen-accent-text font-semibold">2.</span>
              Adjust sensitivity to fine-tune the removal
            </li>
            <li className="flex gap-3">
              <span className="zen-accent-text font-semibold">3.</span>
              Click "Remove Background" to process
            </li>
            <li className="flex gap-3">
              <span className="zen-accent-text font-semibold">4.</span>
              Download your image with transparent background
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
