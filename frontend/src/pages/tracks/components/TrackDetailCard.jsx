import React, { memo, useMemo } from "react";
import { ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TrackDetailCard = ({ tracks }) => {
  // Destructure course data from props
  const { _id, name, image, price, duration, instructor, learners } = tracks;

  const formattedCreatedAt = useMemo(() => {
    return tracks.createdAt
      ? new Date(tracks.createdAt)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
          .replace(",", "")
      : "N/A";
  }, [tracks.createdAt]);

  return (
    <Card className="w-full flex flex-col overflow-hidden">
      <CardContent className="p-4 flex flex-col gap-6 flex-grow">
        <img
          className="w-full h-[202px] object-cover"
          src={image}
          alt={name}
          loading="lazy"
        />
        <h3 className="text-lg font-semibold my-4 ">{name}</h3>

        {/* Course Title */}

        <div className="flex flex-col text-sm  gap-2 space-y-2 flex-grow">
          <div className="flex justify-between">
            <span>Price:</span>
            <span className="font-medium ">${price}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-medium ">{duration}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Instructor:</span>
            <span className="font-medium ">{instructor}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Learners:</span>
            <span className="font-medium ">{learners}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Dates:</span>
            {formattedCreatedAt}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(TrackDetailCard); // Export the improved card component
