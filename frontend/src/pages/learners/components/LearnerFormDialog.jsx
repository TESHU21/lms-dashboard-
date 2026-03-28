import React, { useState } from 'react';
import FormComp from '@/components/FormComp';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LearnerSchema, initialValues, fields } from "./data";

const LearnerFormDialog = ({ open, setOpen, mode = "create", initialData, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (data) => {
    console.log("Data",data)
    // const formData = new FormData();
    // formData.append("firstName", data.firstName);
    // formData.append("lastName", data.lastName);
    // formData.append("email", data.email);
    // formData.append("phone", data.phone);
    // formData.append("location", data.location);
    // formData.append("disabled", data.disabled.toString()); // boolean → string
    // // Remove or add duration field in schema/fields as needed
    // // formData.append("duration", data.duration);
    // formData.append("amount", data.amount);
    // formData.append("description", data.description);

    // if (data.image) {
    //   formData.append("image", data.image);
    // }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await onSubmit(data);

      setSuccessMessage(`${mode === "create" ? "Created" : "Updated"} successfully`);
      console.log(response);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} className="overflow-y-auto">
      {/* Optional: Add a trigger button if you want */}
      {/* <DialogTrigger asChild>
        <button className="btn">Open Learner Form</button>
      </DialogTrigger> */}

      <DialogContent className="bg-slate-50 p-3 md:max-w-[600px] shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="flex items-center text-black space-x-2 m-4">
            <span className="text-gray-500">Learner</span>
            <div className="border-l border-gray-300 h-5"></div>
            <span className="font-semibold">{mode === "create" ? "Create Learner" : "Update Learner"}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <FormComp
            schema={LearnerSchema}
            initialValues={initialData || initialValues}
            fields={fields}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnerFormDialog;
