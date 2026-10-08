"use client";

const Ruler = () => {
  const marks = Array.from({ length: 85 }, (_, i) => i);

  return (
    <div className="w-[816px] h-6 bg-white border-x border-gray-300 select-none">
      <div className="relative h-full">
        {marks.map((mark) => (
          <div
            key={mark}
            className="absolute bottom-0"
            style={{ left: `${mark * 10}px` }}
          >
            <div
              className={`w-px bg-gray-500 ${
                mark % 10 === 0
                  ? "h-3"
                  : mark % 5 === 0
                    ? "h-2"
                    : "h-1.5"
              }`}
            />

            {mark % 10 === 0 && (
              <span className="absolute -top-1 left-1 text-[9px] text-gray-500">
                {mark / 10}
              </span>
            )}
          </div>
        ))}

        {/* Left margin marker */}
        <div className="absolute left-[56px] bottom-0">
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-500" />
        </div>

        {/* Right margin marker */}
        <div className="absolute right-[56px] bottom-0">
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default Ruler;