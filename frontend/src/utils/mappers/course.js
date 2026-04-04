export const mapCourse = (course) => ({
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
