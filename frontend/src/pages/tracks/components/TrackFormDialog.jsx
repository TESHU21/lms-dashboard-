// TrackUpdate.jsx
import React, { useState } from "react";
import FormComp from "@/components/FormComp";
import {
  TrackUpdateSchema,
  updateTrackinitialValues,
  updateTrackfields,
} from "./data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { handleImageUpload } from "@/utils/cloudinary";
const TrackFormDialog = ({
  open,
  setOpen,
  mode = "create",
  initialData,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (data) => {
    console.log("Submitting track data:", data);

    try {
      setIsLoading(true);
      setErrorMessage("");

      // Handle image upload using Cloudinary utility
      const imageUrl = await handleImageUpload(data.image);

      // Prepare final data as JSON
      const finalData = {
        name: data.name,
        price: data.price,
        instructor: data.instructor,
        duration: data.duration,
        description: data.description,
        image: imageUrl, // Send URL string from Cloudinary
      };

      console.log("Submitting data to backend:", finalData);
      await onSubmit(finalData);
      setSuccessMessage(
        `${mode === "create" ? "Created" : "Updated"} successfully`,
      );
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.errors?.[0] || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="bg-slate-50 p-3  shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="flex items-center text-black space-x-2 m-4">
            <span className="text-gray-500">Track</span>
            {/* Vertical separator */}
            <div className="border-l border-gray-300 h-5"></div>
            <span className="font-semibold">
              {mode === "create" ? "Create Track" : "Update Track"}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-6">
          {" "}
          {/* Using standard Tailwind px/py units */}
          <FormComp
            schema={TrackUpdateSchema}
            initialValues={initialData || updateTrackinitialValues}
            fields={updateTrackfields}
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
            isLoading={isLoading}
            successMessage={successMessage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackFormDialog;
