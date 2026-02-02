"use client";

interface RouteFrameProps {
  route: string;
}

export default function RouteFrame({ route }: RouteFrameProps) {
  return (
    <iframe
      src={route}
      className="h-full w-full border-none"
      title={`Route: ${route}`}
    />
  );
}
