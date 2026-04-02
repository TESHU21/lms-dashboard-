import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import LearnerHeader from "./LearnersHeader";
import { useCourse } from "@/context/CourseContext";
import LearnerDetailDialog from "./components/LearnerDetailDialog";
import DeleteLearnerDialog from "./components/DeleteLearnerDialog";
import LearnerFormDialog from "./components/LearnerFormDialog";

//  Reusable mapper functions
const mapLearner = (learner) => ({
  id: learner._id,
  firstname: learner.firstname,
  lastname: learner.lastname,
  email: learner.email,
  role: learner.role,
  phone: learner.phone,
  createdAt: learner.createdAt,
  description: learner.description,
  disabled: learner.disabled,
  isVerified: learner.isVerified,
  lastLogin: learner.lastLogin,
  location: learner.location,
  image: learner.image,
  updatedAt: learner.updatedAt,
  amount: learner.amount || 0,
  gender: learner.gender || "N/A",
});

const mapCourse = (course) => ({
  id: course._id,
  title: course.title,
  description: course.description,
  image: course.image,
  createdAt: course.createdAt,
  trackName: course.track?.name || "",
  trackDescription: course.track?.description || "",
  trackDuration: course.track?.duration || "",
  trackPrice: course.track?.price || "",
  trackInstructor: course.track?.instructor || "",
  trackImage: course.track?.image || "",
});

const Learners = () => {
  const { getLearner, deleteLearner, createLearner, getCourses } = useCourse();

  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const [selectedLearner, setSelectedLearner] = useState(null);
  const [learnerToDelete, setLearnerToDelete] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  //  Fetch learners
  const fetchLearners = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getLearner();
      setData((res?.data || []).map(mapLearner));
    } catch (err) {
      console.error("Fetch learners error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [getLearner]);

  // 📦 Fetch courses
  const fetchCourses = useCallback(async () => {
    try {
      const res = await getCourses();
      setCourses((res?.data?.courses || []).map(mapCourse));
    } catch (err) {
      console.error("Fetch courses error:", err);
    }
  }, [getCourses]);

  useEffect(() => {
    fetchLearners();
    fetchCourses();
  }, [fetchLearners, fetchCourses]);

  // 👁 View details
  const handleViewDetails = (learner) => {
    setSelectedLearner(learner);
    setIsDetailOpen(true);
  };

  // ✏ Edit
  const handleEdit = (learner) => {
    setSelectedLearner(learner);
    setIsEditOpen(true);
  };

  // Delete (open dialog)
  const handleDelete = (learner) => {
    setLearnerToDelete(learner);
    setIsDeleteOpen(true);
  };

  //  Confirm delete
  const confirmDelete = async () => {
    try {
      await deleteLearner(learnerToDelete.id);

      // Optimistic update (faster UI 🚀)
      setData((prev) => prev.filter((item) => item.id !== learnerToDelete.id));
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setLearnerToDelete(null);
      setIsDeleteOpen(false);
    }
  };

  // ➕ Create learner
  const handleCreateLearner = async (formData) => {
    try {
      const res = await createLearner(formData);

      setData((prev) => [...prev, mapLearner(res.data.learner)]);
      setIsCreateOpen(false);

      return res;
    } catch (err) {
      console.error("Create learner error:", err);
      throw err;
    }
  };

  return (
    <div className="px-[30px] mx-30">
      <h6 className="text-[20px] font-semibold mb-[30px]">Learners</h6>

      <LearnerHeader
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        sorting={sorting}
        setSorting={setSorting}
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateLearner}
        courses={courses}
      />

      <div className="relative">
        <DataTable
          data={data}
          loading={isLoading}
          columns={columns({
            handleViewDetails,
            handleEdit,
            handleDelete,
          })}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          sorting={sorting}
          setSorting={setSorting}
        />

        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center   z-10 rounded-md">
            <div className="animate-spin h-12 w-12 border-b-2 border-blue-primary rounded-full"></div>
          </div>
        )}
      </div>

      <LearnerDetailDialog
        learner={selectedLearner}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />

      <DeleteLearnerDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        learner={learnerToDelete}
        onConfirm={confirmDelete}
      />

      <LearnerFormDialog
        initialData={selectedLearner}
        open={isEditOpen}
        setOpen={setIsEditOpen}
        mode="update"
        onSubmit={handleEdit}
      />
    </div>
  );
};

export default Learners;
