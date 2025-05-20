import React ,{useState,useEffect} from 'react'
import CourseCard from './components/CourseCard'
import { courses } from './components/data'
import TrackHeader from './components/TrackHeader'
import DescriptionStacksSection from './components/Description'
import CourseHeader from '../courses/components/CourseHeader'
import {useCourse} from "../../context/CourseContext"

const Tracks = () => {
  const {getallTracks,tracks,setTracks}=useCourse()
  useEffect(()=>{
    const fetchTracks=async()=>{
      try{
        const response=await getallTracks()
        setTracks(response?.data.tracks)
        console.log(response)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchTracks()


  },[])
  return (
   
    <div className="flex flex-col min-h-full items-center  px-25">
      <h6 className='font-semibold text-[20px] leading-8 mb-[36px]'>Courses</h6>
      <TrackHeader/>
      <div className=' flex  gap-8 w-full'>
      {tracks.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
      
      </div>
    </div>
  )
}

export default Tracks