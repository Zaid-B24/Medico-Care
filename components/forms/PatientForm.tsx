"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {Form} from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import "react-phone-number-input/style.css";
import SubmitButton from "../ui/SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"


export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}


const PatientForm = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  })

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
        <h1 className="header">
            Hii There <span className="animated-emoji">👋</span>
        <p className="text-dark-700">
            Schedule your First Appointment 
        </p>
        </h1>
        </section>
        <CustomFormField
         fieldType = {FormFieldType.INPUT}
         control={form.control} 
         name = "name"
         label = "Full name"
         placeholder = "John Doe"
         iconSrc = "/assets/icons/user.svg"
         />
         <CustomFormField
         fieldType = {FormFieldType.INPUT}
         control={form.control} 
         name = "email"
         label = "Email"
         placeholder = "johndoe@gmail.com"
         iconSrc = "/assets/icons/email.svg"
         />
          <CustomFormField
         fieldType = {FormFieldType.PHONE_INPUT}
         control={form.control} 
         name = "phone"
         label = "Phone Number"
         placeholder = "222-333-444-5"
         />
      <SubmitButton isLoading={false} >Submit</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm