"use client";

import React from "react";

interface BackgroundDecorationProps {
    type?: "dots" | "grid" | "organic";
    position?: "top-right" | "bottom-left" | "top-left" | "bottom-right" | "center";
    opacity?: number;
    className?: string;
}

export function BackgroundDecoration({
    type = "dots",
    position = "top-right",
    opacity = 0.03,
    className = "",
}: BackgroundDecorationProps) {
    const getPositionClasses = () => {
        switch (position) {
            case "top-right":
                return "top-0 right-0 -translate-y-1/4 translate-x-1/4";
            case "bottom-left":
                return "bottom-0 left-0 translate-y-1/4 -translate-x-1/4";
            case "top-left":
                return "top-0 left-0 -translate-y-1/4 -translate-x-1/4";
            case "bottom-right":
                return "bottom-0 right-0 translate-y-1/4 translate-x-1/4";
            case "center":
                return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
            default:
                return "top-0 right-0";
        }
    };

    const getPattern = () => {
        switch (type) {
            case "dots":
                return "bg-pattern-dots";
            case "grid":
                return "bg-pattern-grid";
            case "organic":
                return "bg-pattern-organic";
            default:
                return "bg-pattern-dots";
        }
    };

    return (
        <div
            className={`absolute pointer-events-none z-0 overflow-hidden ${getPositionClasses()} ${className}`}
            style={{ opacity, width: "300px", height: "300px" }}
            aria-hidden="true"
        >
            <div className={`w-full h-full ${getPattern()}`} />
        </div>
    );
}
