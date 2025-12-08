import Image from "next/image";

export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "white";
}) {
  const textColor = variant === "white" ? "#ffffff" : "#C9A961";
  const subtextColor = variant === "white" ? "#ffffff" : "#1A3A2E";
  // Use fresh leaf green from logo (Material Green #4CAF50)
  const leafColor = "#4CAF50";
  const dropperColor = variant === "white" ? "#ffffff" : "#C9A961";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="https://res.cloudinary.com/dkz73xkbr/image/upload/v1761719143/Org_Gold__1__page-0001-removebg-preview_jscxil.png"
        height={75}
        width={75}
        alt="company logo"
        className=""
      />
    </div>
  );
}
