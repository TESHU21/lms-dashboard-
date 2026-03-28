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
    try {
      const response = await axiosInstance.get("/courses");
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // get single courses
  const getSingleCourses = useCallback(async (courseId) => {
    try {
      const response = await axiosInstance.get(`/courses/${courseId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // create course
  const createCourse = useCallback(async (data) => {
    try {
      const response = await axiosInstance.post(`/courses `, data);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // update course
  const updateCourse = useCallback(async (data, id) => {
    try {
      const response = await axiosInstance.put(`/courses/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  // Get all Tracks
  const getallTracks = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/tracks");
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // Get Single Tracks
  const getSingleTrack = useCallback(async (trackId) => {
    try {
      const response = await axiosInstance.get(`/tracks/${trackId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // Create Track
  const createTrack = useCallback(async (data) => {
    try {
      const response = await axiosInstance.post("/tracks", data);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // Update Track
  const updateTrack = useCallback(async (data, id) => {
    try {
      const response = await axiosInstance.put(`/tracks/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // Create Invoice
  const createInvoice = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/invoice", data);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // get Invoices
  const getInvoices = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/invoices");
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // Get Learners
  const getLearner = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/learners");
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // Create Learners
  const createLearner = useCallback(async (data) => {
    try {
      const response = await axiosInstance.post("/learners", data);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // delete Learners
  const deleteLearner = useCallback(async (learnerId) => {
    try {
      const response = await axiosInstance.delete(`/learners/${learnerId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);
  // get profile information
  const getProfile = useCallback(async () => {
    try {
      const response = await axiosInstance.get("auth/check-auth");
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const values = useMemo(
    () => ({
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
      setSingleTrack,
      setTracks,
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
