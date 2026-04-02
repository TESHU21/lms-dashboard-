// components/CourseDetailDialog.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Assuming Shadcn UI dialog components
import { Separator } from "@/components/ui/separator";

const CourseDetailDialog = ({ course, open, onOpenChange }) => {
  // Ensure learner object exists before trying to access its properties
  if (!course) {
    return null; // Or handle the case where learner is undefined/null
  }

  const createdAtLabel = course?.createdAt
    ? new Date(course.createdAt).toLocaleString()
    : "N/A";

  const hasTrack = Boolean(course?.trackId || course?.trackName);
  const trackName = course?.trackName || "N/A";
  const trackDuration = course?.trackDuration || "N/A";
  const trackPrice = course?.trackPrice || "N/A";
  const trackInstructor = course?.trackInstructor || "N/A";

  const courseImage = course?.image || "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="">
      <DialogContent className="sm:max-w-[425px] md:max-w-[780px] lg:max-w-[900px] p-0 overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="p-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl md:text-2xl font-semibold leading-tight">
              {course?.title || "Course details"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Created: {createdAtLabel}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <div className="rounded-lg border bg-muted overflow-hidden aspect-[4/3]">
                {courseImage ? (
                  <img
                    src={courseImage}
                    alt={`Image of ${course?.title || "course"}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-3 space-y-5">
              {course?.description ? (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </div>
              ) : null}

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Track details</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${
                      hasTrack
                        ? "bg-blue-50 text-blue-700 border-blue-100"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {hasTrack ? "Assigned" : "No track"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground">Track</p>
                    <p className="font-medium mt-1 truncate">{trackName}</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium mt-1">{trackDuration}</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-medium mt-1">{trackPrice}</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground">Instructor</p>
                    <p className="font-medium mt-1 truncate">
                      {trackInstructor}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;
