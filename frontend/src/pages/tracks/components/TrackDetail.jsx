import React, { useState, useEffect } from 'react';
import DescriptionStacksSection from './Description';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourse } from '@/context/CourseContext';
import TrackDetailCard from './TrackDetailCard';
const TrackDetail = () => {
  const navigate = useNavigate();
  const { id: trackId } = useParams();
  const { getSingleTrack,tracks ,singleTrack,setSingleTrack} = useCourse();

  const [course, setCourse] = useState(null);
  console.log("Tracks",tracks)

  useEffect(() => {
    const fetchSingleTrack = async (trackId) => {
      if (!trackId) {
        console.warn("No Course Id");
        return;
      }

      try {
        const response = await getSingleTrack(trackId);
        setCourse(response);
        setSingleTrack(response.data.track)
        console.log("single Track",response)
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleTrack(trackId);
  }, [trackId]);

  return (
    <div className="flex flex-col px-30 gap-8">
      <div className="flex items-center space-x-4 text-lg">
        <div className="text-gray-500 cursor-pointer">Tracks</div>
        <div className="border-l border-gray-300 h-6"></div>
        <div className="text-accent-foreground font-semibold cursor-pointer">details</div>
      </div>

      <div className="flex items-stretch h-full lg:flex-row flex-col w-full gap-10">
        <div className="w-full lg:w-[407px]">
          {singleTrack && (
            <div className="h-full">
              <TrackDetailCard tracks={singleTrack} />
            </div>
          )}
        </div>

        <div className="flex-grow w-full lg:w-[600px]">
          <DescriptionStacksSection  track={singleTrack}/>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
