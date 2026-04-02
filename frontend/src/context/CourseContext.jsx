import React, { useCallback, useMemo, useState } from "react";
import { useContext, createContext } from "react";
import axiosInstance from "@/lib/axiosInstance";

const CourseContext = createContext();
export const useCourse = () => {
  return useContext(CourseContext);
};
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [learners, setLearners] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [singleTrack, setSingleTrack] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [courseInvoices, setCourseInvoices] = useState(null);
  const [tracksRefreshKey, setTracksRefreshKey] = useState(0);

  // function to fetch all courses
  const getCourses = useCallback(async () => {
    return axiosInstance.get("/courses");
  }, []);
  // get single courses
  const getSingleCourses = useCallback(async (courseId) => {
    return axiosInstance.get(`/courses/${courseId}`);
  }, []);
  // create course
  const createCourse = useCallback(async (data) => {
    return axiosInstance.post(`/courses `, data);
  }, []);
  // update course
  const updateCourse = useCallback(async (data, id) => {
    return axiosInstance.put(`/courses/${id}`, data);
  }, []);
  // delete course
  const deleteCourse = useCallback(async (id) => {
    return axiosInstance.delete(`/courses/${id}`);
  }, []);

  // Get all Tracks
  const getallTracks = useCallback(async () => {
    return axiosInstance.get("/tracks");
  }, []);
  // Get Single Tracks
  const getSingleTrack = useCallback(async (trackId) => {
    return axiosInstance.get(`/tracks/${trackId}`);
  }, []);
  // Create Track
  const createTrack = useCallback(async (formData) => {
    return axiosInstance.post("/tracks", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }, []);
  // Update Track
  const updateTrack = useCallback(async (data, id) => {
    return axiosInstance.put(`/tracks/${id}`, data);
  }, []);
  // Delete Track
  const deleteTrack = useCallback(async (id) => {
    const response = await axiosInstance.delete(`/tracks/${id}`);
    setTracksRefreshKey((prev) => prev + 1); // trigger refetch in Tracks
    return response;
  }, []);
  // Create Invoice
  const createInvoice = useCallback(async (data) => {
    return axiosInstance.post("/invoice", data);
  }, []);
  // get Invoices
  const getInvoices = useCallback(async () => {
    return axiosInstance.get("/invoices");
  }, []);
  // Get Learners
  const getLearner = useCallback(async () => {
    return axiosInstance.get("/learners", {
      params: {
        _t: Date.now(), // Cache-busting parameter
      },
    });
  }, []);
  // Create Learners
  const createLearner = useCallback(async (data) => {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;
    return axiosInstance.post(
      "/learners",
      data,
      isFormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined,
    );
  }, []);
  // delete Learners
  const deleteLearner = useCallback(async (learnerId) => {
    return axiosInstance.delete(`/learners/${learnerId}`);
  }, []);
  // get profile information
  const getProfile = useCallback(async () => {
    return axiosInstance.get("auth/check-auth");
  }, []);

  const values = useMemo(
    () => ({
      courses,
      setCourses,
      getCourses,
      getSingleCourses,
      createCourse,
      updateCourse,
      deleteCourse,
      getallTracks,
      getSingleTrack,
      tracks,
      setTracks,
      singleTrack,
      setSingleTrack,
      selectedCourse,
      setSelectedCourse,
      courseInvoices,
      setCourseInvoices,
      createTrack,
      deleteTrack,
      updateTrack,
      createInvoice,
      getLearner,
      createLearner,
      deleteLearner,
      getInvoices,
      getProfile,
      learners,
      setLearners,
      tracksRefreshKey,
      setTracksRefreshKey,
    }),
    [
      courseInvoices,
      courses,
      createCourse,
      createInvoice,
      createLearner,
      createTrack,
      deleteLearner,
      deleteTrack,
      getCourses,
      getInvoices,
      getLearner,
      getProfile,
      getSingleCourses,
      getSingleTrack,
      getallTracks,
      learners,
      setCourseInvoices,
      setCourses,
      setSelectedCourse,
      setSingleTrack,
      setTracks,
      selectedCourse,
      singleTrack,
      tracks,
      setLearners,
      setTracksRefreshKey,
      tracksRefreshKey,
      updateCourse,
      updateTrack,
      deleteCourse,
    ],
  );

  return (
    <CourseContext.Provider value={values}>{children}</CourseContext.Provider>
  );
};
