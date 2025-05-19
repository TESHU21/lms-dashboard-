import React,{useState} from 'react'
import { useContext,createContext } from 'react'
import axiosInstance from '@/lib/axiosInstance';

const CourseContext=createContext()
export const useCourse=()=>{
    return useContext(CourseContext)
}
export const  CourseProvider=({children})=>{
    const [courses,setCourses]=useState([])
    const [selectedCourse,setSelectedCourse]=useState([])
    const [courseInvoices,setCourseInvoices]=useState(null)

    // function to fetch all courses
    const getCourses=async()=>{
        try{
         const response=await axiosInstance.get('/courses')
         return response
        }
        catch(error){
            throw error
        }
    }
    // get single courses
    const getSingleCourses=async(courseId)=>{
        try{
         const response=await axiosInstance.get(`/courses/${courseId}`)
         return response
        }
        catch(error){
            throw error
        }
    }
    // Get all Tracks
    const getallTracks=async()=>{
        try{
            const response=await axiosInstance.get('/tracks')
            return response
        }
        catch(error){
            throw error
        }
    }
    // Get Single Tracks
    const getSingleTrack=async(trackId)=>{
        try{
            const response = await axiosInstance.get(`/tracks/${trackId}`)
            return response
        }
        catch(error){
            throw error
        }

    }


    // Rate Tracks
    const rateTrack=async(trackId,data)=>{
        try{
            const response = await axiosInstance.post(`/tracks/${trackId}/ratings`,data)
            return response
        }
        catch(error){
            throw error
        }

    }
    // Get  Tracks Rating
    const getTrackRatings=async(trackId)=>{
        try{
            const response = await axiosInstance.get(`/tracks/${trackId}/ratings`)
            return response
        }
        catch(error){
            throw error
        }

    }
    // Get  Tracks Rating
    const getallInvoices=async()=>{
        try{
            const response = await axiosInstance.get('/invoices')
            return response
        }
        catch(error){
            throw error
        }
    }
   
  
    // function to get singleInvoices
    const getsingleInvoices=async(invoicesId)=>{
        try{
            const response = await axiosInstance.get(`/invoices/${invoicesId}`)
            return response
        }
        catch(error){
            throw error
        }

    }
    // function to enroll learners by Track
    const enrollLearnersbyTrack=async(data)=>{
        try{
            const response = await axiosInstance.post('/enrollments',data)
            return response
        }
        catch(error){
            throw error
        }

    }
    // function to retrive  enrollments
    const getEnrollements=async()=>{
        try{
            const response = await axiosInstance.get('/enrollments')
            return response
        }
        catch(error){
            throw error
        }

    }
    // function to enroll learner to a course
    const enrollToCourse=async(data)=>{
        try{
            const response=await axiosInstance.post('/registrations',data)
            return response
        }
        catch(error){
            throw error
        }
    }
    const getregistrationbyLearner=async()=>{
        try{
            const response=await axiosInstance.get('/registrations')
            return response
        }
        catch(error){
            throw error
        }
    }
    const values={getCourses,getSingleCourses,getallTracks,getSingleTrack,getTrackRatings,
        rateTrack,getallInvoices,getsingleInvoices,enrollLearnersbyTrack,getEnrollements,
        enrollToCourse,getregistrationbyLearner,courses,setCourses,
        selectedCourse,setSelectedCourse,courseInvoices,setCourseInvoices, 
    }





    return <CourseContext.Provider value={values}>{children}</CourseContext.Provider>


}