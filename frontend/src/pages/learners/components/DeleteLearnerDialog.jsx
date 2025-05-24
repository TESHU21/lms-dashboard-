// components/DeleteLearnerDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter, // Added DialogFooter for button placement
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const DeleteLearnerDialog = ({ open, onOpenChange, learner, onConfirm }) => {
  // It's good practice to provide a default empty object or null check
  // if `learner` might not always be present when the dialog is conceptually open
  const learnerName = learner ? `${learner.firstName || ''} ${learner.lastName || ''}`.trim() : 'this learner';
console.log(learner)
  const handleDeleteConfirm = () => {
    if (onConfirm) {
      onConfirm(learner.id); // Assuming onConfirm expects the learner's ID
    }
    onOpenChange(false); // Close the dialog after confirmation
  };

  const handleCancel = () => {
    onOpenChange(false); // Just close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" flex flex-col gap-8 justify-center items-center sm:max-w-md p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"> {/* Adjusted max-width for better fit */}
        <DialogHeader>
          <DialogTitle className="text-center font-lato pb-4">Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete <span className="font-semibold text-red-600">{learnerName}</span> and remove their data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-center  gap-2 mt-4">
          <Button  onClick={handleCancel}
          className="px-3 py-4 h-12 w-[125px] cursor-pointer"
          >
            Cancel
          </Button>
          <Button  variant="destructive"  onClick={handleDeleteConfirm}
          className="px-3 py-4 h-12 w-[125px] cursor-pointer"
          > {/* Use destructive variant for delete */}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLearnerDialog;