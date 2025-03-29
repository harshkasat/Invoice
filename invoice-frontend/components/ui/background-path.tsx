"use client";

import { motion } from "framer-motion";

function FloatingPaths({ 
    position, 
    stripOpacity = 0.6, 
    stripSpeed = 20 
}: { 
    position: number;
    stripOpacity?: number;
    stripSpeed?: number;
}) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none h-full">
            <svg
                className="w-full h-full text-white/20 preserve-3d"
                viewBox="0 0 696 316"
                fill="none"
                style={{ minHeight: '100%' }}
            >
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: stripOpacity }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, stripOpacity, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: stripSpeed + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    stripOpacity = 0.6,
    stripSpeed = 20,
}: {
    stripOpacity?: number;
    stripSpeed?: number;
}) {
    return (
        <div className="w-full h-full">
            <div className="w-full h-full">
                <FloatingPaths position={1} stripOpacity={stripOpacity} stripSpeed={stripSpeed} />
                <FloatingPaths position={-1} stripOpacity={stripOpacity} stripSpeed={stripSpeed} />
            </div>
        </div>
    );
}
