"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {ChevronRight} from "lucide-react"
import { forwardRef, useImperativeHandle } from "react";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";


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

import { BsEye, BsEyeSlash } from "react-icons/bs";

const FormComp = forwardRef(({
  schema,
  initialValues,
  fields,
  onSubmit,
  handleInputChange,
  submitBtnText = "Submit",
  isLoading,
  errorMessage,
  successMessage,
  showForgotPassword ,
  hideButton,
  // optional callback
},ref) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues || {},
  });
  useImperativeHandle(ref, () => ({
    submit: () => form.handleSubmit(onSubmit)(),
    getValues: () => form.getValues(), // <-- Add this line

  }));

  const { setValue, getValues, trigger } = form;

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            {typeof errorMessage === "string" && errorMessage && (
              <p className="text-sm text-red-600 text-center col-span-2">
                {errorMessage}
              </p>
            )}
            {typeof successMessage === "string" && successMessage && (
              <p className="text-sm text-green-600 text-center col-span-2">
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
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className={`${className} w-full  `}>
                      <FormLabel>{label}</FormLabel>
                      <FormControl >
                        {type === "select" ? (
                     <Select className=" h-[48px] px-3 py-4"
                     value={field.value === true ? "true" : field.value === false ? "false" : field.value || ""}
                     onValueChange={(value) => {
                       const parsedValue = value === "true" ? true : value === "false" ? false : value;
                       field.onChange(parsedValue);
                     }}
                   >
                     <SelectTrigger className="h-[48px] px-3 py-4 w-full bg-[#F5F5F5]">
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
                    
                    // <CustomSelect field={field} options={options} placeholder={placeholder}/>
                        
                        ) : type === "textarea" ? (
                          <Textarea
                            {...field}
                            placeholder={placeholder}
                            id={name}
                            value={field.value || ""}
                            className="bg-[#F5F5F5]"
                          />
                        ) : type === "file" ? (
                          <Input
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            type={type}
                            className={` bg-[#E6E6E6] ${className}`}
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
                              className=" bg-[#F5F5F5] px-10 py-2  h-[48px] w-full border border-[#E6E6E6] focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-indigo-500 rounded-md"
                            />
                            {type === "password" && (
                              <span
                                onClick={handlePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                              >
                                {showPassword ? <BsEye size={18} /> : <BsEyeSlash size={18} />}
                              </span>
                            )}
                          </div>
                        )}
                      </FormControl>
                      {error && (
                        <FormMessage className="text-xs text-red-600 ">
                          {error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              )
            )}
          </div>

          {  showForgotPassword && (
            <div className="w-full flex justify-start mt-2 py-6 ">
              <NavLink to="/forgotpassword"
                type="button"
              
                className="text-sm text-[#177DDC]  leading-6 hover:underline cursor-pointer"
              >
                Forgot password?
              </NavLink>
            </div>
          )}

          <div className="w-full mt-6">
          {!hideButton && (
  <Button
    disabled={isLoading}
    type="submit"
    className="w-full h-[48px]  px-6 bg-blue-primary hover:bg-blue-primary text-white py-3 cursor-pointer flex items-center justify-center gap-2"
  >
    {isLoading ? (
      <Loader  />

    ) : (
      <>
        {submitBtnText}
        <ChevronRight size={22} />
      </>
    )}
  </Button>
)}

           
          </div>
        </form>
      </Form>
    </div>
  );
})

export default FormComp;
