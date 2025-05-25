// components/LearnerDetailDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Assuming Shadcn UI dialog components
import { Button } from "@/components/ui/button"; // Assuming Shadcn UI button
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming Shadcn UI avatar

const CourseDetailDialog = ({ learner, open, onOpenChange }) => {
  // Ensure learner object exists before trying to access its properties
  if (!learner) {
    return null; // Or handle the case where learner is undefined/null
  }

  const fullName = `${learner.firstName || ''} ${learner.lastName || ''}`.trim();


  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="">
      <DialogContent className="   sm:max-w-[425px] md:max-w-[700px] lg:max-w-[800px] p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={learner.profileImage} alt={fullName} />
            <AvatarFallback className="text-4xl">{fullName.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <DialogTitle className="text-2xl font-bold">{fullName}</DialogTitle>
          <DialogDescription className="text-gray-500">
            Details for {fullName}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
         
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">FirstName:</span>
            <span className="text-gray-900">{learner.firstName}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">LastName:</span>
            <span className="text-gray-900">{learner.lastName}</span>
          </div>
           <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900">{learner.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Contact:</span>
            <span className="text-gray-900">{learner.contact || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Gender:</span>
            <span className="text-gray-900">{learner.gender || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Location:</span>
            <span className="text-gray-900">{learner.location || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="text-gray-900">{learner.role || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Joined Date:</span>
            <span className="text-gray-900">
              {learner.date ? new Date(learner.date).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Disabled:</span>
            <span className="text-gray-900">
              {learner.disabled?"True":"False"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Verified:</span>
            <span className={`font-medium ${learner.isVerified ? 'text-green-600' : 'text-red-500'}`}>
              {learner.isVerified ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {learner.description && (
          <div className="mt-4 border-t pt-4">
            <span className="font-semibold text-gray-700">Description:</span>
            <p className="text-gray-900 mt-1">{learner.description}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;