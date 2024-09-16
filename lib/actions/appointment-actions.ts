"use server"

import { revalidatePath } from "next/cache"
import { ID, Query } from "node-appwrite"
import {formatDateTime} from "../utils"
import { Appointment } from "@/types/appwrite.types"
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createAppointment = async (appointment:CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
        )
        return parseStringify(newAppointment)
    } catch (error) {
        console.error("An error occurred while creating a new appointment:", error);
    }
}

export const updateAppointment = async ({
    appointmentId,
    userId,
    appointment,
    type,
  }: UpdateAppointmentParams) => {
    try {
      const updatedAppointment = await databases.updateDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
        appointment
      );
  
      if (!updatedAppointment) throw Error;
  
      const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
      //await sendSMSNotification(userId, smsMessage);
  
      revalidatePath("/admin");
      return parseStringify(updatedAppointment);
    } catch (error) {
      console.error("An error occurred while scheduling an appointment:", error);
    }
  };

export const getAppointment = async (appointmentId:string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
    )
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
    
  }
}