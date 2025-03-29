"use client";

import { FloatingPaths } from "./floating-paths";

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
