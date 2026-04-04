import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import LearnerHeader from "./LearnersHeader.jsx";
import { useCourse } from "@/context/CourseContext";
import LearnerDetailDialog from "./components/LearnerDetailDialog";
import DeleteLearnerDialog from "./components/DeleteLearnerDialog";
import LearnerFormDialog from "./components/LearnerFormDialog";
import { mapCourse, mapLearner } from "@/utils/mappers";

const Learners = () => {
  const { getLearner, deleteLearner, createLearner, getCourses } = useCourse();

  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const [selectedLearner, setSelectedLearner] = useState(null);
  const [learnerToDelete, setLearnerToDelete] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  //  Fetch learners
  const fetchLearners = useCallback(
    async (options) => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const res = await getLearner(options);
        setData((res?.data || []).map(mapLearner));
      } catch (err) {
        console.error("Fetch learners error:", err);
        setErrorMessage("Failed to load learners. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [getLearner],
  );

  // 📦 Fetch courses
  const fetchCourses = useCallback(
    async (options) => {
      try {
        const res = await getCourses(options);
        setCourses((res?.data?.courses || []).map(mapCourse));
      } catch (err) {
        console.error("Fetch courses error:", err);
      }
    },
    [getCourses],
  );

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
      setErrorMessage("Failed to delete learner. Please try again.");
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
      setErrorMessage("Failed to create learner. Please try again.");
      throw err;
    }
  };

  return (
    <div className="px-[30px] mx-30">
      <h6 className="text-[20px] font-semibold mb-[30px]">Learners</h6>

      {errorMessage ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-center justify-between gap-3">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => {
              fetchLearners({ force: true });
              fetchCourses({ force: true });
            }}
            className="shrink-0 rounded-md border border-red-200 bg-white px-3 py-1 text-xs font-medium"
          >
            Retry
          </button>
        </div>
      ) : null}

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
