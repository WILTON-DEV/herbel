import Image from "next/image";

export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "white";
}) {
  const textColor = variant === "white" ? "text-white" : "text-primary";
  const subtextColor = variant === "white" ? "text-white/80" : "text-primary/70";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative group shrink-0">
        <Image
          src="https://res.cloudinary.com/dkz73xkbr/image/upload/v1761719143/Org_Gold__1__page-0001-removebg-preview_jscxil.png"
          height={32}
          width={32}
          alt="The Organic Plug Logo"
          className="transition-transform duration-500 group-hover:rotate-12 w-8 h-8 sm:w-10 sm:h-10"
        />
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-[12px] sm:text-[13px] font-black uppercase tracking-[0.12em] ${textColor}`}>
          The Organic Plug
        </span>
        <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.15em] mt-0.5 ${subtextColor}`}>
          Your Health Our Priority
        </span>
      </div>
    </div>
  );
}
