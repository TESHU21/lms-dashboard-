import React, { useEffect, useState, useMemo, useCallback } from "react";
import CourseHeader from "./components/CourseHeader";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { useCourse } from "@/context/CourseContext";
import CourseFormDialog from "./components/CourseFormDialog";
import CourseDetailDialog from "./components/CourseDetailDialog";
import { fields } from "./components/data";
import { mapCourse } from "@/utils/mappers";

const Courses = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [tracksErrorMessage, setTracksErrorMessage] = useState("");

  const [isCreateCourseFormOpen, setIsCreateCourseFormOpen] = useState(false);
  const [isEditCourseFormOpen, setIsEditCourseFormOpen] = useState(false);
  const [isViewCourseDetail, setIsViewCourseDetail] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [initialData, setInitialData] = useState(null);

  const [loading, setLoading] = useState(true);

  const {
    getCourses,
    createCourse,
    tracks,
    setTracks,
    getallTracks,
    updateCourse,
    deleteCourse,
  } = useCourse();

  const fetchCourses = useCallback(
    async (options) => {
      try {
        setLoading(true);
        setErrorMessage("");
        const res = await getCourses(options);
        const courses = res?.data?.courses || [];
        setData(courses.map(mapCourse));
      } catch (err) {
        console.error("Error fetching courses:", err);
        setErrorMessage("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [getCourses],
  );

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // 📦 Fetch tracks
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setTracksErrorMessage("");
        const res = await getallTracks();
        setTracks(res?.data?.tracks || []);
      } catch (err) {
        console.error("Error fetching tracks:", err);
        setTracksErrorMessage("Failed to load tracks. Please try again.");
      }
    };

    fetchTracks();
  }, [getallTracks, setTracks]);

  // View
  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setIsViewCourseDetail(true);
  };

  // ✏ Edit
  const handleEdit = (course) => {
    setInitialData({
      title: course.title,
      track: course.trackId,
      image: course.image,
      description: course.description,
    });
    setSelectedCourse(course);
    setIsEditCourseFormOpen(true);
  };

  // Update
  const updateFormData = async (formData) => {
    const courseId = selectedCourse.id;
    const res = await updateCourse(formData, courseId);

    setData((prev) =>
      prev.map((item) =>
        item.id === courseId ? mapCourse(res.data.course) : item,
      ),
    );

    setIsEditCourseFormOpen(false);
    return res;
  };

  //  Delete
  const handleDelete = async (id) => {
    await deleteCourse(id);
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  //  Create
  const handleCreateCourse = async (formData) => {
    const res = await createCourse(formData);

    setData((prev) => [...prev, mapCourse(res.data.course)]);
    setIsCreateCourseFormOpen(false);

    return res;
  };

  // Dynamic fields
  const formFieldsWithDynamicOptions = useMemo(() => {
    return fields.map((field) => {
      if (field.name === "track" && field.type === "select") {
        return {
          ...field,
          options: tracks.map((track) => ({
            value: track._id,
            name: track.name,
          })),
        };
      }
      return field;
    });
  }, [tracks]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-30">
        <h6 className="text-[20px] font-semibold mb-[36px]">Courses</h6>

        {errorMessage ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-center justify-between gap-3">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={() => fetchCourses({ force: true })}
              className="shrink-0 rounded-md border border-red-200 bg-white px-3 py-1 text-xs font-medium"
            >
              Retry
            </button>
          </div>
        ) : null}

        {tracksErrorMessage ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-center justify-between gap-3">
            <span>{tracksErrorMessage}</span>
            <button
              type="button"
              onClick={() => {
                setTracksErrorMessage("");
                getallTracks({ force: true })
                  .then((res) => setTracks(res?.data?.tracks || []))
                  .catch((err) => {
                    console.error("Error fetching tracks:", err);
                    setTracksErrorMessage(
                      "Failed to load tracks. Please try again.",
                    );
                  });
              }}
              className="shrink-0 rounded-md border border-red-200 bg-white px-3 py-1 text-xs font-medium"
            >
              Retry
            </button>
          </div>
        ) : null}

        <CourseHeader
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          open={isCreateCourseFormOpen}
          onOpenChange={setIsCreateCourseFormOpen}
          formFieldsWithDynamicOptions={formFieldsWithDynamicOptions}
          onSubmit={handleCreateCourse}
        />
        <div className="relative">
          <DataTable
            data={data}
            loading={loading}
            columns={columns({
              handleViewDetails,
              handleEdit,
              handleDelete,
            })}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
        <CourseFormDialog
          initialData={initialData}
          formFieldsWithDynamicOptions={formFieldsWithDynamicOptions}
          open={isEditCourseFormOpen}
          setOpen={setIsEditCourseFormOpen}
          mode="update"
          onSubmit={updateFormData}
        />

        <CourseDetailDialog
          course={selectedCourse}
          open={isViewCourseDetail}
          onOpenChange={setIsViewCourseDetail}
        />
      </div>
    </div>
  );
};

export default Courses;
