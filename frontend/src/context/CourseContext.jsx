import React,{useState} from 'react'
import { useContext,createContext } from 'react'
import axiosInstance from '@/lib/axiosInstance';

const CourseContext=createContext()
export const useCourse=()=>{
    return useContext(CourseContext)
}
export const  CourseProvider=({children})=>{
    const [courses,setCourses]=useState([])
    const [tracks,setTracks]=useState([])
    const [singleTrack,setSingleTrack]=useState([])
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
    // create course
    const createCourse=async(data)=>{
        try{
            const response =await axiosInstance.post(`/courses `,data)
            return response
        }
        catch(error){
            throw error
        }

    }
    // update course
    const updateCourse=async(data,id)=>{
        try{
            const response =await axiosInstance.put(`/courses/${id}`,data)
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
    // Create Track
    const createTrack=async(data)=>{
        try{
            const response = await axiosInstance.post('/tracks',data)
            return response
        }
        catch(error){
            throw error
        }

    }
    // Update Track
    const updateTrack=async(data,id)=>{
        try{
            const response = await axiosInstance.put(`/tracks/${id}`,data)
            return response
        }
        catch(error){
            throw error
        }

    }
    // Create Invoice
     const createInvoice=async()=>{
        try{
            const response = await axiosInstance.post('/invoice',data)
            return response
        }
        catch(error){
            throw error
        }

    }
    // get Invoices
    const getInvoices=async()=>{
        try{
            const response=await axiosInstance.get('/invoices')
            return response
        }
        catch(error){
            throw error
        }
    }
    // Get Learners
     const getLearner=async()=>{
        try{
            const response = await axiosInstance.get('/learners')
            return response
        }
        catch(error){
            throw error
        }

    }
    // delete Learners
      const deleteLearner=async(learnerId)=>{
        try{
            const response = await axiosInstance.delete(`/learners/${learnerId}`)
            return response
        }
        catch(error){
            throw error
        }

    }
    // get profile information
    const getProfile=async()=>{
        try{
            const response=await axiosInstance.get("auth/check-auth")
            return response
        }
        catch(error){
            throw error
        }
    }


 
    const values={getCourses,getSingleCourses,createCourse,updateCourse,getallTracks,getSingleTrack, tracks,setTracks,singleTrack,
        setSingleTrack,createTrack,updateTrack,createInvoice,getLearner,deleteLearner,getInvoices,getProfile
    }





    return <CourseContext.Provider value={values}>{children}</CourseContext.Provider>


}