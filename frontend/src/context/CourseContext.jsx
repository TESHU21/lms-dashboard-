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

  // Get all Tracks
  const getallTracks = useCallback(async () => {
    return axiosInstance.get("/tracks");
  }, []);
  // Get Single Tracks
  const getSingleTrack = useCallback(async (trackId) => {
    return axiosInstance.get(`/tracks/${trackId}`);
  }, []);
  // Create Track
  const createTrack = useCallback(async (data) => {
    return axiosInstance.post("/tracks", data);
  }, []);
  // Update Track
  const updateTrack = useCallback(async (data, id) => {
    return axiosInstance.put(`/tracks/${id}`, data);
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
    return axiosInstance.get("/learners");
  }, []);
  // Create Learners
  const createLearner = useCallback(async (data) => {
    return axiosInstance.post("/learners", data);
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
      updateTrack,
      createInvoice,
      getLearner,
      createLearner,
      deleteLearner,
      getInvoices,
      getProfile,
      learners,
      setLearners,
    }),
    [
      courseInvoices,
      courses,
      createCourse,
      createInvoice,
      createLearner,
      createTrack,
      deleteLearner,
      getCourses,
      getInvoices,
      getLearner,
      getProfile,
      getSingleCourses,
      getSingleTrack,
      getallTracks,
      learners,
      setLearners,
      setCourseInvoices,
      setCourses,
      setSelectedCourse,
      setSingleTrack,
      setTracks,
      selectedCourse,
      singleTrack,
      tracks,
      updateCourse,
      updateTrack,
    ],
  );

  return (
    <CourseContext.Provider value={values}>{children}</CourseContext.Provider>
  );
};
