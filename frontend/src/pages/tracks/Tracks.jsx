import React, { useState, useEffect } from 'react';
import CourseCard from './components/CourseCard';
// import { courses } from './components/data'; // You might not need this if you're fetching from an API
import TrackHeader from './components/TrackHeader';
import DescriptionStacksSection from './components/Description'; // Not used in the provided snippet
import CourseHeader from '../courses/components/CourseHeader'; // Not used in the provided snippet
import { useCourse } from '../../context/CourseContext';
import TrackFormDialog from './components/TrackFormDialog';

const Tracks = () => {
  const [searchValue, setSearchValue] = useState("");
  const [open,setOpen]=useState(false)
  const [filteredTracks, setFilteredTracks] = useState([]); // Initialize as an empty array
  const { getallTracks, tracks, setTracks } = useCourse();

  // Effect to fetch tracks when the component mounts
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await getallTracks();
        setTracks(response?.data.tracks || []); // Ensure it's an array, even if empty
        console.log("Fetched Tracks Response:", response);
      } catch (error) {
        console.error("Error fetching tracks:", error); // Use console.error for errors
      }
    };
    fetchTracks();
  }, [ setTracks]); 

  useEffect(() => {
    if (tracks) { // Ensure tracks is not null before filtering
      const result = tracks.filter((track) =>
        track.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredTracks(result);
    }
  }, [tracks, searchValue]); 

  console.log("All Tracks (from context):", tracks); // This log will show the raw tracks
  console.log("Filtered Tracks (state):", filteredTracks); // This log will show the currently filtered tracks

  return (
    <div className="flex flex-col  items-center px-25">
      <h6 className='font-semibold text-[20px] leading-8 mb-[36px]'>Courses</h6>
      <TrackHeader searchValue={searchValue} setSearchValue={setSearchValue} setOpen={setOpen}/>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 '>
        {filteredTracks.length > 0 ? ( 
          filteredTracks.map(course => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>No courses found.</p> 
        )}
      </div>
      <TrackFormDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Tracks;