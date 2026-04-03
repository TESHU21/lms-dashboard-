import React, { useEffect, useState, useMemo } from "react";
import CourseHeader from "./components/CourseHeader";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { useCourse } from "@/context/CourseContext";
import CourseFormDialog from "./components/CourseFormDialog";
import CourseDetailDialog from "./components/CourseDetailDialog";
import { fields } from "./components/data";

// Reusable mapper (DRY)
const mapCourse = (course) => ({
  id: course._id,
  title: course.title,
  image: course.image,
  createdAt: course.createdAt,
  description: course.description,
  trackId: course.track?._id || "",
  trackName: course.track?.name || "",
  trackDescription: course.track?.description || "",
  trackDuration: course.track?.duration || "",
  trackPrice: course.track?.price || "",
  trackInstructor: course.track?.instructor || "",
  trackImage: course.track?.image || "",
});

const Courses = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

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

  //  Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await getCourses();
        const courses = res?.data?.courses || [];
        setData(courses.map(mapCourse));
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [getCourses]);

  // 📦 Fetch tracks
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await getallTracks();
        setTracks(res?.data?.tracks || []);
      } catch (err) {
        console.error("Error fetching tracks:", err);
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
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center   z-10 rounded-md">
              <div className="animate-spin h-12 w-12 border-b-2 border-blue-primary rounded-full"></div>
            </div>
          )}
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
