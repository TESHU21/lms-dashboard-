"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";
import {
  ChevronRight,
  AlertCircle,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import Loader from "./Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
// Removed direct import of Shadcn Select components as CustomSelect now encapsulates them
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomSelect from "./CustomSelect"; // Make sure this path is correct

const FormComp = forwardRef(
  (
    {
      schema,
      initialValues = {},
      fields,
      onSubmit,
      submitBtnText = "Submit",
      isLoading,
      errorMessage,
      successMessage,
      showForgotPassword,
      hideButton,
    },
    ref,
  ) => {
    const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: initialValues,
      mode: "onBlur",
    });

    const { trigger, formState, reset, getValues } = form;
    const { isValid } = formState;

    const [showPassword, setShowPassword] = useState(false);
    const [filePreviews, setFilePreviews] = useState({});

    useEffect(() => {
      const previews = {};
      fields.forEach((field) => {
        if (field.type === "file" && initialValues[field.name]) {
          previews[field.name] = initialValues[field.name];
        }
      });
      setFilePreviews(previews);
      reset(initialValues);
    }, [initialValues, reset, fields]);

    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(onSubmit)(),
      getValues,
      reset: (values) => reset(values),
    }));

    const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleFileChange = (e, field, name) => {
      const file = e.target.files?.[0] || null;
      field.onChange(file);
      trigger(name);

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreviews((prev) => ({
            ...prev,
            [name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreviews((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    };

    // Helper component for validation icons, now generalized
    const ValidationIcons = ({
      hasSuccess,
      error,
      isPassword = false,
      isFile = false,
    }) => {
      if (isLoading) return null; // Don't show icons if loading

      let rightPositionClass = "right-3"; // Default for text inputs, textareas
      if (isPassword) {
        rightPositionClass = "right-10"; // Space for eye icon
      } else if (isFile) {
        rightPositionClass = "right-10"; // Space for close button on file preview
      }

      if (hasSuccess) {
        return (
          <span
            className={`absolute ${rightPositionClass} top-1/2 transform -translate-y-1/2 text-green-500`}
          >
            <Check size={18} />
          </span>
        );
      }
      if (error) {
        return (
          <span
            className={`absolute ${rightPositionClass} top-1/2 transform -translate-y-1/2 text-red-500`}
          >
            <AlertCircle size={18} />
          </span>
        );
      }
      return null;
    };

    return (
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {errorMessage && (
                <p className="text-sm text-red-600 col-span-full text-center">
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p className="text-sm text-green-600 col-span-full text-center">
                  {successMessage}
                </p>
              )}

              {fields?.map(
                ({
                  label,
                  name,
                  type,
                  placeholder,
                  className,
                  options,
                  icon: Icon,
                }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field, fieldState }) => {
                      const { error } = fieldState;
                      // Determine hasValue based on field type for more accurate success
                      const hasValue =
                        type === "file"
                          ? field.value !== null &&
                            field.value !== undefined &&
                            field.value !== ""
                          : field.value !== "" && field.value != null;
                      const hasSuccess = !error && hasValue;

                      return (
                        <FormItem className={`${className || ""} w-full`}>
                          <FormLabel>{label}</FormLabel>
                          {/* Centralized wrapper for most input types for relative positioning and validation icons */}
                          <div className="relative w-full">
                            <FormControl>
                              {type === "select" ? (
                                <CustomSelect
                                  field={field}
                                  options={options}
                                  placeholder={placeholder}
                                  hasSuccess={hasSuccess} // Pass these props to CustomSelect
                                  error={error} // CustomSelect will handle its own icon display
                                />
                              ) : type === "textarea" ? (
                                <Textarea
                                  {...field}
                                  placeholder={placeholder}
                                  value={field.value || ""}
                                  rows={20}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    trigger(name);
                                  }}
                                  onBlur={() => trigger(name)}
                                  className={`h-auto  w-full  pr-8 break-all bg-gray-200 text-black border-b-[#999999] ${
                                    hasSuccess ? "bg-input-sucess" : ""
                                  } ${error ? "bg-red-200 border-red-500" : ""}`}
                                />
                              ) : type === "file" ? (
                                <div className="relative">
                                  <Input
                                    id={name}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleFileChange(e, field, name)
                                    }
                                    className="hidden"
                                    placeholder={placeholder}
                                  />
                                  <Label
                                    htmlFor={name}
                                    className={`
                                      group relative flex flex-col items-center justify-center w-full 
                                      border-2 border-dashed border-gray-300 rounded-xl 
                                      bg-white hover:bg-gray-50 transition-all duration-200 
                                      cursor-pointer min-h-[120px] p-6
                                      ${hasSuccess ? "border-green-400 bg-green-50" : ""}
                                      ${error ? "border-red-400 bg-red-50" : ""}
                                      hover:border-gray-400
                                    `}
                                  >
                                    {filePreviews[name] ? (
                                      <div className="relative flex flex-col items-center">
                                        <div className="relative group/image">
                                          <img
                                            src={filePreviews[name]}
                                            alt="Preview"
                                            className="w-24 h-24 rounded-lg object-cover shadow-md border-2 border-white"
                                          />
                                          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                            <ImageIcon
                                              size={24}
                                              className="text-white"
                                            />
                                          </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                          <span className="text-sm text-gray-600 font-medium">
                                            Image selected
                                          </span>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setFilePreviews((prev) => {
                                                const updated = { ...prev };
                                                delete updated[name];
                                                return updated;
                                              });
                                              field.onChange(null);
                                              trigger(name);
                                            }}
                                            className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                                            aria-label="Remove image"
                                          >
                                            <svg
                                              className="w-4 h-4"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors duration-200">
                                          <ImageIcon
                                            size={24}
                                            className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200"
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <p className="text-sm font-medium text-gray-700">
                                            Click to upload image
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            PNG, JPG, JPEG up to 5MB
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </Label>
                                </div>
                              ) : (
                                // Default input type (text, email, number, password etc.)
                                <div>
                                  {" "}
                                  {/* Fragment for multiple siblings like icon and input */}
                                  {Icon && ( // Optional leading icon
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                      <Icon size={18} />
                                    </span>
                                  )}
                                  <Input
                                    {...field}
                                    type={
                                      type === "password"
                                        ? showPassword
                                          ? "text"
                                          : "password"
                                        : type
                                    }
                                    id={name}
                                    placeholder={placeholder}
                                    autoComplete={
                                      name === "password"
                                        ? "current-password"
                                        : name === "email"
                                          ? "email"
                                          : "on"
                                    }
                                    onFocus={(e) => {
                                      trigger(name);
                                      field.onFocus?.(e);
                                    }}
                                    onBlur={(e) => {
                                      trigger(name);
                                      field.onBlur?.(e);
                                    }}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      trigger(name);
                                    }}
                                    className={`px-10 py-2 h-[48px] w-full border rounded-t-sm text-input-text focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-indigo-500 ${
                                      hasSuccess
                                        ? "bg-input-sucess border-b-[#999999]"
                                        : "border-[#E6E6E6] bg-gray-200"
                                    } ${error ? "bg-red-200 border-red-500" : ""}`}
                                  />
                                  {type === "password" && ( // Password visibility toggle
                                    <span
                                      onClick={handlePasswordVisibility}
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                                    >
                                      {showPassword ? (
                                        <BsEye size={18} />
                                      ) : (
                                        <BsEyeSlash size={18} />
                                      )}
                                    </span>
                                  )}
                                </div>
                              )}
                            </FormControl>
                            {/* Render ValidationIcons ONLY for Input, Textarea, and File (NOT Select) */}
                            {type !== "select" && (
                              <ValidationIcons
                                hasSuccess={hasSuccess}
                                error={error}
                                isPassword={type === "password"}
                                isFile={type === "file"}
                              />
                            )}
                          </div>{" "}
                          {/* End of relative wrapper */}
                          <div className="py-0 h-[10px] text-sm">
                            {error && (
                              <FormMessage className="text-xs text-red-600">
                                {error.message}
                              </FormMessage>
                            )}
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ),
              )}
            </div>

            {showForgotPassword && (
              <div className="w-full flex justify-start mt-2">
                <NavLink
                  to="/forgotpassword"
                  className="text-sm text-[#177DDC] hover:underline"
                >
                  Forgot password?
                </NavLink>
              </div>
            )}

            {!hideButton && (
              <div className="w-full mt-6">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full h-[48px] cursor-pointer px-6 ${
                    isValid ? "bg-sidebar" : "bg-muted-foreground"
                  } hover:bg-sidebar text-white py-3 flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      {submitBtnText}
                      <ChevronRight size={22} />
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    );
  },
);

export default FormComp;
