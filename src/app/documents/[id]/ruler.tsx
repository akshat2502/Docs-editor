import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const markers = Array.from({ length: 83 }, (_, i) => i);

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
}

const Marker = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }: MarkerProps) => {
  return (
    <div className='absolute top-0 h-full w-4 cursor-ew-resize z-[5] group -ml-2'
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <ChevronDown className="text-blue-700" />
      <div 
      className="absolute left-1/2 top-4 transform -translate-x-1/2"
      style= {{height: "100vh", width: "1px", backgroundColor: "#3b72f6", transform: "scaleX(0.5)", display: isDragging ? "block" : "none"}}
      />
    </div>
  );
}

const Ruler = () => {
  
  const [leftMargin, setLeftMargin] = useState(96);
  const [rightMargin, setRightMargin] = useState(96);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingLeft(true);
  }

  const handleRightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingRight(true);
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current?.querySelector("#ruler-container");
      if(container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(816, relativeX));

        if(isDraggingLeft) {
          const maxLeftPosition = 816 - rightMargin - 100; 
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition);
        } else if(isDraggingRight) {
          const minRightPosition = 816 - (leftMargin + 100); 
          const newRightPosition = Math.max(816 - rawPosition, 0);
          const constrainedRightPosition = Math.min(newRightPosition, minRightPosition);
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  }
  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(96);
  }

  const handleRightDoubleClick = () => {
    setRightMargin(96);
  }

  return ( 
    <div 
    ref={rulerRef}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
    className="w-[816px] mx-auto bg-white h-6 border-b border-gray-300 flex items-end relative select-none print:hidden">
      <div id='ruler-container' className="flex w-full h-full relative">
        <Marker 
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker 
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;

              return (
                <div className="absolute bottom-0"
                key={marker} style={{ left: `${position}px` }}>
                  {marker % 10 === 0 && (
                    <>
                    <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500">
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                      {marker/10+1}</span>
                    </div>
                    </>
                  )}
                  {marker % 5 == 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                  )}
                  {marker % 5 == 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ruler;