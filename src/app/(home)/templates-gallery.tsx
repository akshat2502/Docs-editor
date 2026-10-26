"use client";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { PlusSquareIcon } from "lucide-react";

const templates = [
  { id: "blank", label: "Blank document", imageUrl: "plus.png" }, 
  { id: "resume", label: "Resume", imageUrl: "/resume.jpg" },
  { id: "proposal", label: "Project proposal", imageUrl: "/proposal.png" },
  { id: "research", label: "Research paper", imageUrl: "/research_paper.png" },
  { id: "meeting", label: "Meeting notes", imageUrl: "/meeting.png" },
  { id: "report", label: "Research status report", imageUrl: "/report.png" },
  { id: "memo", label: "Strategy Memo", imageUrl: "/memo.png" },
];
 
const TemplatesGallery = () => {
    const isCreating = false;

  return (
    <div className="bg-[#f1f3f4] py-6">
        <div className="max-w-screen-xl mx-auto px-16 flex flex-col gap-y-4">
            <h3 className="font-medium text-neutral-700">Start a new document</h3>
            
            <Carousel>
                <CarouselContent className="-ml-4">
                    {templates.map((template)=> (
                        <CarouselItem
                        key={template.id}
                        className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4">
                            <div className={cn("group flex flex-col gap-y-2.5", isCreating && "pointer-events-none opacity-50")}>
                                <button
                                    disabled={isCreating}
                                    onClick={()=>{}}
                                    className="size-full aspect-[3/4] hover:border-blue-500 rounded-md border border-neutral-300 hover:bg-blue-50 transition bg-white flex flex-col items-center justify-center relative overflow-hidden shadow-sm"
                                    style={{
                                        backgroundImage: `url(${template.imageUrl})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                />
                                <p className="font-medium text-sm text-neutral-700 truncate">
                                    {template.label}
                                </p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    </div>
  );
};

export default TemplatesGallery;