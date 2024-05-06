"use client";

import "./styles.css";

interface Props {
  image: string;
  children?: React.ReactNode;
  className?: string;
}

export default (props: Props) => {
  return (
    <div>
      <svg viewBox="0 0 348 346" height="0">
        <defs>
          <clipPath id="window-image-clip" clipPathUnits="objectBoundingBox" transform="scale(0.00287356321)">
            <path d="M330.94,343.5c-50.45-1.5-41.92,0.98-70.16,0.98c-21.69,0-21.69-3.51-43.37-3.51,c-21.69,0-21.69,1.9-43.39,1.9c-21.69,0-21.69-1.68-43.39-1.68s-21.7,4.36-43.39,4.36c-28.05,0-19.84-5.8-69.11-2.4,c-8.5,0.59-15.76-6.06-15.91-14.58c-0.85-49.74,0.58-41.4,0.58-69.52c0-21.69,1.96-21.69,1.96-43.37,c0-21.69-2.88-21.69-2.88-43.39c0-21.69-0.97-21.69-0.97-43.39s-0.43-21.7-0.43-43.39c0-4.49,0.18-8.06,0.47-11.07,C4.9,33.25,39.89,2,81.28,2.12c1.79,0.01,3.76,0.01,5.94,0.01c21.69,0,21.69-2.54,43.37-2.54c21.69,0,21.69,1.43,43.39,1.43,c21.69,0,21.69-0.07,43.39-0.07s21.7,3.15,43.39,3.15c1.35,0,2.62-0.01,3.81-0.03c44.77-0.69,81.66,35.28,81.96,80.05,c0,0.45,0,0.92,0,1.39c0,21.69-1.98,21.69-1.98,43.37c0,21.69,3.16,21.69,3.16,43.39c0,21.69-2.69,21.69-2.69,43.39,s2.08,21.7,2.08,43.39c0,27.96,0.4,19.89,0.17,68.65C347.23,336.65,339.88,343.77,330.94,343.5z"/>
          </clipPath>
        </defs>
      </svg>
      <div
        className={`relative window-image-clip bg-cover bg-center overflow-hidden h-[346px] w-[352px] z-10 flex flex-col items-center ${props.className || ""}`}
        style={{backgroundImage: `url(${props.image})`}}
      >
        {props.children}
      </div>
    </div>
  );
};
