import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import LearnerHeader from "./LearnersHeader";
import { useCourse } from "@/context/CourseContext";
import LearnerDetailDialog from "./components/LearnerDetailDialog";
import DeleteLearnerDialog from "./components/DeleteLearnerDialog";
import LearnerFormDialog from "./components/LearnerFormDialog";
const Learners = () => {
  const [data, setData] = useState([]);
  const { getLearner, deleteLearner, createLearner, getCourses } = useCourse();
  const [courses, setCourses] = useState([]);
  const [isLoadingLearners, setIsLoadingLearners] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]); // New state for sorting
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [learnerToDelete, setLearnerToDelete] = useState(null);
  const [isCreateLearnerFormOpen, setIsCreateLearnerFormOpen] = useState(false); // For "Create Learner" dialog
  const [isEditLearnerFormOpen, setIsEditLearnerFormOpen] = useState(false); // For "Edit Learner" dialog

  const fetchLearners = useCallback(async () => {
    try {
      setIsLoadingLearners(true);
      const response = await getLearner();
      const learnersData = response?.data;
      console.log("response", response);
      const formattedLearners = learnersData?.map((learner) => {
        return {
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

          amount: learner.amount || 0, // Default to 0 if not present
          gender: learner.gender || "N/A", // Default to 'N/A' if not present
        };
      });
      setData(formattedLearners);
      console.log("Format Learner Data", formattedLearners);
    } catch (error) {
      console.log(error);
      // Optionally show an error message to the user
    } finally {
      setIsLoadingLearners(false);
    }
  }, [getLearner]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await getCourses();
      const coursesData = response?.data?.courses;
      const formattedCourses = coursesData?.map((course) => ({
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
      }));
      setCourses(formattedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [getCourses]);

  useEffect(() => {
    fetchLearners();
    fetchCourses();
  }, [fetchLearners, fetchCourses]);

  const handleViewDetails = (learner) => {
    setIsDetailDialogOpen(true);
    setLearnerToDelete(learner);

    // Implement navigation or open a dialog to show details
  };
  const handleEdit = (learnerData) => {
    console.log("Edit Learner:", learnerData);
    setSelectedLearner(learnerData);
    // Implement edit logic
    setIsEditLearnerFormOpen(true);
  };
  const handleDelete = async (learner) => {
    // Set the learner to delete and open dialog first
    setLearnerToDelete(learner);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async (learnerId) => {
    try {
      await deleteLearner(learnerId);
      fetchLearners();
    } catch (error) {
      console.log(error);
    } finally {
      // Clear the state and close the dialog
      setLearnerToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };
  const handleCreateLearner = async (data) => {
    try {
      // Create the learner via API (backend handles Cloudinary upload)
      const response = await createLearner(data);

      // Format the new learner data to match the existing data structure
      const newLearner = {
        id: response.data.learner._id,
        firstname: response.data.learner.firstname,
        lastname: response.data.learner.lastname,
        email: response.data.learner.email,
        role: response.data.learner.role,
        phone: response.data.learner.phone,
        createdAt: response.data.learner.createdAt,
        description: response.data.learner.description,
        disabled: response.data.learner.disabled,
        isVerified: response.data.learner.isVerified,
        lastLogin: response.data.learner.lastLogin,
        location: response.data.learner.location,
        image: response.data.learner.image,
        updatedAt: response.data.learner.updatedAt,
        amount: response.data.learner.amount || 0,
        gender: response.data.learner.gender || "N/A",
      };

      // Add the new learner to the existing data
      setData((prev) => [...prev, newLearner]);

      // Close the create dialog
      setIsCreateLearnerFormOpen(false);

      return response;
    } catch (error) {
      console.error("Error creating learner:", error);
      // Re-throw the error so the calling component can handle it
      throw error;
    }
  };

  return (
    <div className="px-[30px] mx-30">
      {" "}
      {/* Adjusted to px-[30px] for explicit 30px */}
      <h6 className="leading-8 text-[20px] min-h-full font-semibold mb-[30px]">
        Learners
      </h6>
      <LearnerHeader
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        sorting={sorting}
        setSorting={setSorting}
        open={isCreateLearnerFormOpen}
        onOpenChange={setIsCreateLearnerFormOpen}
        onSubmit={handleCreateLearner}
        courses={courses}
      />
      <div className="relative">
        <DataTable
          data={data || []}
          columns={columns({
            handleViewDetails, // Pass the new handler
            handleEdit,
            handleDelete,
          })}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          sorting={sorting}
          setSorting={setSorting}
        />
        {isLoadingLearners && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 rounded-md">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-primary"></div>
          </div>
        )}
      </div>
      <LearnerDetailDialog
        learner={learnerToDelete}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
      <DeleteLearnerDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        learner={learnerToDelete}
        onConfirm={confirmDelete}
      />
      <LearnerFormDialog
        initialData={selectedLearner}
        open={isEditLearnerFormOpen}
        setOpen={setIsEditLearnerFormOpen}
        mode="update"
        onSubmit={handleEdit}
      />
    </div>
  );
};

export default Learners;
