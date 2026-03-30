import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import CourseCard from "./components/CourseCard";
import TrackHeader from "./components/TrackHeader";
import { useCourse } from "../../context/CourseContext";
import TrackFormDialog from "./components/TrackFormDialog";
import { setPageSEO } from "../../utils/seo";

const Tracks = () => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const { getallTracks, tracks, setTracks, createTrack, tracksRefreshKey } =
    useCourse();
  const deferredSearchValue = useDeferredValue(searchValue);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await getallTracks();
        setTracks(response?.data.tracks || []);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    fetchTracks();
  }, [getallTracks, setTracks, tracksRefreshKey]);
  useEffect(() => {
    setPageSEO({
      title: "Courses",
      description:
        "Browse and manage all available courses and tracks in the LMS dashboard.",
    });
  }, []);

  const filteredTracks = useMemo(() => {
    if (!Array.isArray(tracks)) return [];

    const q = (deferredSearchValue ?? "").trim().toLowerCase();
    if (!q) return tracks;

    return tracks.filter((track) =>
      (track?.name ?? "").toLowerCase().includes(q),
    );
  }, [tracks, deferredSearchValue]);

  const handleCreateTrack = useCallback(
    async (data) => {
      const response = await createTrack(data);
      // Refetch tracks after creation
      const refetch = await getallTracks();
      setTracks(refetch?.data.tracks || []);
      setOpen(false);
      return response;
    },
    [createTrack, getallTracks, setTracks],
  );

  return (
    <div className="flex flex-col  items-center px-25">
      <h6 className="font-semibold text-[20px] leading-8 mb-[36px]">Courses</h6>
      <TrackHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setOpen={setOpen}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {filteredTracks.length > 0 ? (
          filteredTracks.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
      <TrackFormDialog
        open={open}
        setOpen={setOpen}
        onSubmit={handleCreateTrack}
      />
    </div>
  );
};

export default Tracks;
