"use client";

import { useState, useRef } from "react";

const GDriveEmbed = ({
  initialFileId,
  initialType,
}: {
  initialFileId: string;
  initialType: "video" | "pptx";
}) => {
  const [fileId, setFileId] = useState(initialFileId);
  const [fileType, setFileType] = useState<"video" | "pptx">(initialType);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if ((iframeRef.current as any).mozRequestFullScreen) {
        (iframeRef.current as any).mozRequestFullScreen();
      } else if ((iframeRef.current as any).webkitRequestFullscreen) {
        (iframeRef.current as any).webkitRequestFullscreen();
      } else if ((iframeRef.current as any).msRequestFullscreen) {
        (iframeRef.current as any).msRequestFullscreen();
      }
    }
  };

  // Embed linki, dosya türüne göre belirleniyor
  const getEmbedLink = () => {
    if (fileType === "video") {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    } else {
      return `https://docs.google.com/presentation/d/${fileId}/preview`;
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* İçerik Seçim Butonları */}
      <div className="absolute top-4 left-4 space-x-2 z-10">
        <button
          onClick={() => {
            setFileId("1AO-3fmELB43pmx3vWdx2JZWuLcdE4cYV"); // Video Google Drive ID
            setFileType("video");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Videoyu Göster
        </button>

        <button
          onClick={() => {
            setFileId("1R-wqElV-2PFmMWgemdAcZ4Ffnrbd_uwO"); // PPTX Google Drive ID
            setFileType("pptx");
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Sunumu Göster
        </button>
      </div>

      {/* Tam ekran butonu */}
      <button
        onClick={handleFullscreen}
        className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-lg z-10"
      >
        Tam Ekran
      </button>

      {/* Google Drive Embed */}
      <iframe
        ref={iframeRef}
        key={fileId} // Key değiştiğinde iframe güncellenecek
        src={getEmbedLink()}
        className="w-full h-full border-none"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GDriveEmbed;
