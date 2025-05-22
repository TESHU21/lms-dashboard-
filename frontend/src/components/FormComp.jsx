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
import { ChevronRight, AlertCircle, Check } from "lucide-react";
import { BsEye, BsEyeSlash, BsPaperclip } from "react-icons/bs";
import { Image } from "lucide-react";

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
      initialValues = {},
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
      defaultValues: initialValues,
      mode: "onBlur",
    });

    const { trigger, formState, reset, getValues } = form;
    const { isValid } = formState;

    const [showPassword, setShowPassword] = useState(false);
    const [filePreviews, setFilePreviews] = useState({});

    useEffect(() => {
      reset(initialValues);
    }, [initialValues, reset]);

    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(onSubmit)(),
      getValues,
      reset: (values) => reset(values),
    }));

    const handlePasswordVisibility = () =>
      setShowPassword((prev) => !prev);

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
      }
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
                <p className="text-sm text-red-600 col-span-full text-center">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-sm text-green-600 col-span-full text-center">{successMessage}</p>
              )}

              {fields?.map(
                ({ label, name, type, placeholder, className, options, icon: Icon }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field, fieldState }) => {
                      const { error } = fieldState;
                      const hasValue = field.value !== "" && field.value != null;
                      const hasSuccess = !error && hasValue;

                      return (
                        <FormItem className={`${className || ""} w-full`}>
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
                                  trigger(name);
                                }}
                              >
                                <SelectTrigger
                                  className={`h-[48px] w-full bg-accent ${
                                    hasSuccess ? "bg-green-200 border-green-500" : ""
                                  } ${error ? "bg-red-200 border-red-500" : ""}`}
                                >
                                  <SelectValue placeholder={placeholder || "Select"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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
                                className={` h-auto resize-y bg-gray-200 text-black border-b-[#999999] ${
                                  hasSuccess ? "bg-input-sucess" : ""
                                } ${error ? "bg-red-200 border-red-500" : ""}`}
                              />
                            ) : type === "file" ? (
                              <div className=" relative flex flex-col gap-2">
                                <Input
                                  id={name}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileChange(e, field, name)}
                                  className="hidden"
                                  placeholder={placeholder}
                                />
                                <Label
                                  htmlFor={name}
                                  className={`bg-gray-200 px-y py-2  w-full border  rounded-t-sm dark:bg-input/30 ${hasSuccess?"bg-input-sucess border-b-[#999999]"
                                      : "border-[#E6E6E6] bg-gray-200"} ${error? "bg-red-200 border-red-500" : ""}`}
                                >{!hasSuccess?(
                                  <div className="text-gray-600 flex items-center pl-5 gap-6">  <Image size={30} />   Upload your image here! </div>
                                  
                                ):(
                                  <div>
                                     {filePreviews[name] && (
       <div className="relative w-fit">
        <img
          src={filePreviews[name]}
          alt="Preview"
          className="max-w-[60px] rounded shadow border"
        />
        <button
          type="button"
          onClick={() => {
            setFilePreviews((prev) => {
              const updated = { ...prev };
              delete updated[name];
              return updated;
            });
            field.onChange(null); // Clear form field
            trigger(name); // Trigger validation
          }}
          className="absolute -top-2 -right-2 text-2xl  cursor-pointer w-6 h-6 rounded-full border-0 flex items-center justify-center shadow text-red-600"
          aria-label="Remove image"
        >
          ×
        </button>
      </div>
    )}
    

    {/* Validation Messages */}


       {!isLoading && hasSuccess && (
                                  <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500">
                                    <Check size={18} />
                                  </span>
                                )}
                                {!isLoading && error && (
                                  <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500">
                                    <AlertCircle size={18} />
                                  </span>
                                )}
                                  </div>
                                )}
                                
                                
                                </Label>
                                 
                              
                              </div>
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
                                
                                {type === "password" && (
                                  <span
                                    onClick={handlePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                                  >
                                    {showPassword ? <BsEye size={18} /> : <BsEyeSlash size={18} />}
                                  </span>
                                )}
                                {!isLoading && hasSuccess && (
                                  <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500">
                                    <Check size={18} />
                                  </span>
                                )}
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
                              <FormMessage className="text-xs text-red-600">
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
              <div className="w-full flex justify-start mt-2">
                <NavLink to="/forgotpassword" className="text-sm text-[#177DDC] hover:underline">
                  Forgot password?
                </NavLink>
              </div>
            )}

            {!hideButton && (
              <div className="w-full mt-6">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full h-[48px] px-6 ${
                    isValid ? "bg-sidebar" : "bg-muted-foreground"
                  } hover:bg-sidebar text-white py-3 flex items-center justify-center gap-2`}
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
