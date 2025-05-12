"use client";
import React, {
  useState,
  useEffect, // Keep useEffect for initialValues reset
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { AlertCircle, Check } from "lucide-react"; // Import icons

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormComp = forwardRef(
  (
    {
      schema,
      initialValues,
      fields,
      onSubmit,
      handleInputChange,
      submitBtnText = "Submit",
      isLoading,
      errorMessage,
      successMessage,
      showForgotPassword,
      hideButton,
    },
    ref
  ) => {
    const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: initialValues || {},
      mode: 'onBlur', // Set validation mode to onBlur
    });

    const { trigger, formState, reset } = form; // Destructure reset from formState is incorrect, it's from form
    const [showPassword, setShowPassword] = useState(false);

    // Effect to reset the form when initialValues change
    useEffect(() => {
        reset(initialValues, { keepDirtyValues: false }); // Use reset with initialValues
    }, [initialValues, reset]); // Add reset to the dependency array

    // REMOVED: The useEffect that called trigger() on mount

    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(onSubmit)(),
      getValues: () => form.getValues(),
      // Expose form reset if needed externally
      reset: (values) => reset(values),
    }));
    const { isValid } = formState; // Destructure isValid from formState

    const handlePasswordVisibility = () =>
      setShowPassword((prev) => !prev);

    return (
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {typeof errorMessage === "string" && errorMessage && (
                <p className="text-sm text-red-600 text-center col-span-full">
                  {errorMessage}
                </p>
              )}
              {typeof successMessage === "string" && successMessage && (
                <p className="text-sm text-green-600 text-center col-span-full">
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

                     
                      const hasValue = field.value !== "" && field.value != null;
                      const hasSuccess = !error && hasValue;

                      return (
                        <FormItem className={ `${className || ''}  w-full`}>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            {type === "select" ? (
                              <Select
                                value={
                                  field.value === true
                                    ? "true"
                                    : field.value === false
                                      ? "false"
                                      : field.value || ""
                                }
                                onValueChange={(value) => {
                                  const parsedValue =
                                    value === "true"
                                      ? true
                                      : value === "false"
                                        ? false
                                        : value;
                                  field.onChange(parsedValue);
                                   trigger(name); // Trigger validation on change
                                }}
                              >
                                <SelectTrigger className={`h-[48px] w-full bg-[#F5F5F5] ${hasSuccess ? 'bg-green-200 border-green-500' : ''} ${error ? 'bg-red-200 border-red-500' : ''}`}>
                                  <SelectValue placeholder={placeholder || "Select"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {options.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : type === "textarea" ? (
                              <Textarea
                                {...field}
                                placeholder={placeholder}
                                id={name}
                                value={field.value || ""}
                                onChange={(e) => {
                                    field.onChange(e);
                                    trigger(name); //
                                }}
                                onBlur={() => trigger(name)} //ur
                                className={`bg-[#F5F5F5] border-b-[#999999] ${hasSuccess ? 'bg-[#EDF7E8] ' : ''} ${error ? 'bg-red-200 border-red-500' : ''}`}
                              />
                            ) : type === "file" ? (
                                
                              <Input
                               
                                onChange={(e) => {
                                    if (handleInputChange) handleInputChange(e);
                                    trigger(name);
                                }}
                                placeholder={placeholder}
                                type="file"
                                className={`  ${hasSuccess ? "bg-[#EDF7E8] border-b-[#999999]" : "bg-[#E6E6E6]"} ${
                                  error ? "bg-red-200 border-red-500" : ""
                                }`}
                              />
                            ) : (
                              <div className="relative">
                                {Icon && (
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
                                  autoComplete={name === 'password' ? 'current-password' : name === 'email' ? 'email' : 'on'}
                                   onFocus={(e) => {
                                      // Trigger validation on focus
                                     trigger(name);
                                     // Call original onFocus if it exists
                                     if (field.onFocus) field.onFocus(e);
                                   }}
                                   onBlur={(e) => {
                                      // Trigger validation on blur
                                      trigger(name);
                                      // Call original onBlur if it exists
                                     if (field.onBlur) field.onBlur(e);
                                   }}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        trigger(name); // Trigger validation on change
                                    }}
                                  className={` px-10 py-2 h-[48px] w-full border rounded-t-sm focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-indigo-500
                                    ${ hasSuccess ? "bg-[#EDF7E8] border-b-[#999999]" : "border-[#E6E6E6]  bg-[#F5F5F5]" }
                                    ${ error ? "bg-red-200 border-red-500" : "" }
                                  `}
                                />
                                {type === "password" && (
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
                                {/* Add success and error icons inside the input container */}
                                {/* Show success icon only when not loading, no error, and has value AFTER validation has run */}
                                {!isLoading && !error && hasValue && (
                                    <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500">
                                        <Check size={18} />
                                    </span>
                                )}
                                {/* Show error icon only when not loading and has error AFTER validation has run */}
                                {!isLoading && error && (
                                     <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500">
                                        <AlertCircle size={18} />
                                    </span>
                                )}
                              </div>
                            )}
                          </FormControl>
                          <div className="py-0 h-[10px] text-sm">
                          {error && (
                            <FormMessage className="text-xs text-red-600 ">
                              {error.message}
                            </FormMessage>
                            
                          )}
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                )
              )}
            </div>

            {showForgotPassword && (
              <div className="w-full flex justify-start mt-2 py-6">
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
                  className={`w-full h-[48px] px-6 ${isValid?"bg-[#01589A]":"bg-[#E6E6E6]"} hover:bg-blue-primary text-white py-3 cursor-pointer flex items-center justify-center gap-2`}
                >
                  {isLoading ? <Loader /> : <>
                    {submitBtnText}
                    <ChevronRight size={22} />
                  </>}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    );
  }
);

export default FormComp;