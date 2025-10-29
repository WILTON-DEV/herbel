export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "white";
}) {
  const textColor = variant === "white" ? "#ffffff" : "#C9A961";
  const subtextColor = variant === "white" ? "#ffffff" : "#1A3A2E";
  // Use theme green from brand palette (corresponds to #1A3A2E)
  const leafColor = "#1A3A2E";
  const dropperColor = variant === "white" ? "#ffffff" : "#C9A961";

  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 300 80"
        className="h-10 sm:h-12 w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* "The" text */}
        <text
          x="5"
          y="20"
          fill={textColor}
          fontFamily="Arial, sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          The
        </text>

        {/* Dropper icon above "c" in Organic */}
        <g>
          {/* Dropper stem */}
          <line
            x1="120"
            y1="2"
            x2="120"
            y2="8"
            stroke={dropperColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Dropper bulb */}
          <circle cx="120" cy="10" r="2.5" fill={dropperColor} />
          {/* Liquid drop */}
          <circle cx="120" cy="15" r="1.5" fill={dropperColor} />
        </g>

        {/* Leaf 1 above "r" */}
        <g>
          <path
            d="M 85 8 Q 87 5 85 2 Q 83 5 85 8"
            fill={leafColor}
            stroke={leafColor}
            strokeWidth="0.5"
          />
          <line
            x1="85"
            y1="2"
            x2="85"
            y2="8"
            stroke="#C9A961"
            strokeWidth="0.3"
          />
        </g>

        {/* Leaf 2 above "g" */}
        <g>
          <path
            d="M 143 8 Q 145 5 143 2 Q 141 5 143 8"
            fill={leafColor}
            stroke={leafColor}
            strokeWidth="0.5"
          />
          <line
            x1="143"
            y1="2"
            x2="143"
            y2="8"
            stroke="#C9A961"
            strokeWidth="0.3"
          />
        </g>

        {/* "Organic" text */}
        <text
          x="40"
          y="35"
          fill={textColor}
          fontFamily="Arial, sans-serif"
          fontSize="30"
          fontWeight="bold"
        >
          Organic
        </text>

        {/* "PLUG UG" text */}
        <text
          x="45"
          y="55"
          fill={subtextColor}
          fontFamily="Arial, sans-serif"
          fontSize="18"
          fontWeight="bold"
          letterSpacing="2"
        >
          PLUG UG
        </text>
      </svg>
    </div>
  );
}
