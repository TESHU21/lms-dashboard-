import React, { useCallback, useMemo, useRef, useState } from "react";
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

  const cacheRef = useRef(new Map());

  const cachedRequest = useCallback(async (key, fetcher, options = {}) => {
    const { force = false, ttlMs = 5 * 60 * 1000 } = options;
    const now = Date.now();
    const cached = cacheRef.current.get(key);

    if (!force && cached) {
      const isFresh = now - cached.ts < ttlMs;
      if (isFresh) {
        if (cached.response) return cached.response;
        if (cached.promise) return cached.promise;
      }
    }

    const promise = (async () => {
      try {
        const response = await fetcher();
        cacheRef.current.set(key, { ts: Date.now(), response });
        return response;
      } catch (err) {
        cacheRef.current.delete(key);
        throw err;
      }
    })();

    cacheRef.current.set(key, { ts: now, promise });
    return promise;
  }, []);

  const invalidateCache = useCallback((key) => {
    cacheRef.current.delete(key);
  }, []);

  // function to fetch all courses
  const getCourses = useCallback(
    async (options) => {
      return cachedRequest(
        "courses",
        () => axiosInstance.get("/courses"),
        options,
      );
    },
    [cachedRequest],
  );
  // get single courses
  const getSingleCourses = useCallback(
    async (courseId, options) => {
      return cachedRequest(
        `courses:${courseId}`,
        () => axiosInstance.get(`/courses/${courseId}`),
        options,
      );
    },
    [cachedRequest],
  );
  // create course
  const createCourse = useCallback(
    async (data) => {
      const res = await axiosInstance.post(`/courses `, data);
      invalidateCache("courses");
      return res;
    },
    [invalidateCache],
  );
  // update course
  const updateCourse = useCallback(
    async (data, id) => {
      const res = await axiosInstance.put(`/courses/${id}`, data);
      invalidateCache("courses");
      invalidateCache(`courses:${id}`);
      return res;
    },
    [invalidateCache],
  );
  // delete course
  const deleteCourse = useCallback(
    async (id) => {
      const res = await axiosInstance.delete(`/courses/${id}`);
      invalidateCache("courses");
      invalidateCache(`courses:${id}`);
      return res;
    },
    [invalidateCache],
  );

  // Get all Tracks
  const getallTracks = useCallback(
    async (options) => {
      return cachedRequest(
        "tracks",
        () => axiosInstance.get("/tracks"),
        options,
      );
    },
    [cachedRequest],
  );
  // Get Single Tracks
  const getSingleTrack = useCallback(
    async (trackId, options) => {
      return cachedRequest(
        `tracks:${trackId}`,
        () => axiosInstance.get(`/tracks/${trackId}`),
        options,
      );
    },
    [cachedRequest],
  );
  // Create Track
  const createTrack = useCallback(
    async (formData) => {
      const res = await axiosInstance.post("/tracks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      invalidateCache("tracks");
      return res;
    },
    [invalidateCache],
  );
  // Update Track
  const updateTrack = useCallback(
    async (data, id) => {
      const res = await axiosInstance.put(`/tracks/${id}`, data);
      invalidateCache("tracks");
      invalidateCache(`tracks:${id}`);
      return res;
    },
    [invalidateCache],
  );
  // Delete Track
  const deleteTrack = useCallback(
    async (id) => {
      const response = await axiosInstance.delete(`/tracks/${id}`);
      invalidateCache("tracks");
      invalidateCache(`tracks:${id}`);
      setTracksRefreshKey((prev) => prev + 1); // trigger refetch in Tracks
      return response;
    },
    [invalidateCache],
  );
  // Create Invoice
  const createInvoice = useCallback(
    async (data) => {
      const res = await axiosInstance.post("/invoice", data);
      invalidateCache("invoices");
      return res;
    },
    [invalidateCache],
  );
  // get Invoices
  const getInvoices = useCallback(
    async (options) => {
      return cachedRequest(
        "invoices",
        () => axiosInstance.get("/invoices"),
        options,
      );
    },
    [cachedRequest],
  );
  // cancel Invoice
  const cancelInvoice = useCallback(
    async (id) => {
      const res = await axiosInstance.patch(`/invoices/${id}/cancel`);
      invalidateCache("invoices");
      return res;
    },
    [invalidateCache],
  );
  // Get Learners
  const getLearner = useCallback(
    async (options) => {
      return cachedRequest(
        "learners",
        () => axiosInstance.get("/learners"),
        options,
      );
    },
    [cachedRequest],
  );
  // Create Learners
  const createLearner = useCallback(
    async (data) => {
      const isFormData =
        typeof FormData !== "undefined" && data instanceof FormData;
      const res = await axiosInstance.post(
        "/learners",
        data,
        isFormData
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : undefined,
      );
      invalidateCache("learners");
      return res;
    },
    [invalidateCache],
  );
  // delete Learners
  const deleteLearner = useCallback(
    async (learnerId) => {
      const res = await axiosInstance.delete(`/learners/${learnerId}`);
      invalidateCache("learners");
      return res;
    },
    [invalidateCache],
  );
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
      cancelInvoice,
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
      cancelInvoice,
      updateCourse,
      updateTrack,
      deleteCourse,
    ],
  );

  return (
    <CourseContext.Provider value={values}>{children}</CourseContext.Provider>
  );
};
