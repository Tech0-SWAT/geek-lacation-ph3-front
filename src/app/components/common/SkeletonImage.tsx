"use client";

import React, { useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";

type SkeletonImageProps = ImageProps;

export const SkeletonImage = ({
  className = "",
  hoverZoom = false,
  ...props
}: SkeletonImageProps & { hoverZoom?: boolean }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {inView && (
        <>
          {!loaded && (
            <div className="absolute top-0 left-0 w-full h-full skeleton bg-gray-200 rounded" />
          )}
          <Image
            {...props}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className={`object-cover ${className} ${hoverZoom ? "hover:scale-110" : ""} ${loaded ? "opacity-100" : "opacity-0"} transition-all duration-300`}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
};

// ✅ 人物画像用の拡張
type PersonImageProps = {
  file_name?: string | null;
  gender?: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  hoverZoom?: boolean;
};

export const PersonImage = ({
  file_name,
  gender,
  alt,
  width,
  height,
  className = "",
  hoverZoom = false,
}: PersonImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getFallbackSrc = (): string => {
    if (gender?.includes("男")) return "/uploads/m1.png";
    if (gender?.includes("女")) return "/uploads/w1.png";
    return "/uploads/m7.png";
  };

  useEffect(() => {
    setImageUrl(null);
    setError(null);

    if (!file_name) {
      setImageUrl(getFallbackSrc());
      return;
    }

    const fetchBlobUrl = async () => {
      try {
        const res = await fetch(
          `/api/get_staff_imaga_by_azure_storage?fileName=${encodeURIComponent(file_name)}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch image URL");
        }
        const data = await res.json();
        setImageUrl(data.url);
      } catch (err: any) {
        console.error("画像取得エラー:", err);
        setImageUrl(getFallbackSrc());
        setError(err.message);
      }
    };

    fetchBlobUrl();
  }, [file_name, gender]);

  return imageUrl ? (
    <SkeletonImage
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      hoverZoom={hoverZoom}
    />
  ) : null;
};