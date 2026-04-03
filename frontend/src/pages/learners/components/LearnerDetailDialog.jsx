// components/LearnerDetailDialog.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Assuming Shadcn UI dialog components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming Shadcn UI avatar
import { Separator } from "@/components/ui/separator";

const LearnerDetailDialog = ({ learner, open, onOpenChange }) => {
  // Ensure learner object exists before trying to access its properties
  if (!learner) {
    return null; // Or handle the case where learner is undefined/null
  }
  const fullName =
    `${learner.firstname || ""} ${learner.lastname || ""}`.trim();

  const joinedAtLabel = learner?.createdAt
    ? new Date(learner.createdAt).toLocaleString()
    : "N/A";

  const isVerified = Boolean(learner?.isVerified);
  const isDisabled = Boolean(learner?.disabled);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="">
      <DialogContent className="sm:max-w-[425px] md:max-w-[780px] lg:max-w-[900px] p-0 overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="p-6">
          <DialogHeader className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={learner?.image}
                    alt={fullName || "Learner"}
                  />
                  <AvatarFallback className="text-xl">
                    {(fullName?.charAt(0) || "?").toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-0.5">
                  <DialogTitle className="text-xl md:text-2xl font-semibold leading-tight">
                    {fullName || "Learner details"}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Joined: {joinedAtLabel}
                  </DialogDescription>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    isVerified
                      ? "bg-green-50 text-green-700 border-green-100"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isVerified ? "Verified" : "Not verified"}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    isDisabled
                      ? "bg-red-50 text-red-700 border-red-100"
                      : "bg-blue-50 text-blue-700 border-blue-100"
                  }`}
                >
                  {isDisabled ? "Disabled" : "Active"}
                </span>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">First name</p>
              <p className="font-medium mt-1">{learner?.firstname || "N/A"}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Last name</p>
              <p className="font-medium mt-1">{learner?.lastname || "N/A"}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium mt-1 break-all">
                {learner?.email || "N/A"}
              </p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium mt-1">{learner?.phone || "N/A"}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Gender</p>
              <p className="font-medium mt-1">{learner?.gender || "N/A"}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-medium mt-1">{learner?.location || "N/A"}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="font-medium mt-1">{learner?.role || "N/A"}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Amount</p>
              <p className="font-medium mt-1">{learner?.amount ?? "N/A"}</p>
            </div>
          </div>

          {learner?.description ? (
            <>
              <Separator className="my-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {learner.description}
                </p>
              </div>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnerDetailDialog;
