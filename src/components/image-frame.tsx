import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  aspectRatio: string; // e.g. "4 / 3"
  placeholder: string;
};

/** Renders the image when one exists, else the mockups' dashed placeholder slot. */
export function ImageFrame({ src, alt, aspectRatio, placeholder }: Props) {
  if (src) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio, borderRadius: "var(--radius-lg)" }}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div className="image-frame" style={{ aspectRatio }}>
      {placeholder}
    </div>
  );
}
