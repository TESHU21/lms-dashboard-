import React from 'react'
import CourseCard from './CourseCard'
import SoftwareImage from "../../../assets/Software Engineering Path.svg"
import DescriptionStacksSection from './Description'

const CourseDetail = () => {
  const courses = [
    {
      id: 1,
      title: "Software Engineer Path",
      imageUrl: SoftwareImage,
      price: 380.0,
      duration: "12 weeks",
      instructor: "Benjamin",
      learners: "+200",
    },
  ]

  return (
      <div className="flex items-stretch lg:flex-row flex-col w-full gap-6 px-20 py-6">
      {/* Left: CourseCard container */}
      <div className="w-full lg:w-[407px] h-full">
        {courses.map(course => (
          <div key={course.id} className="h-full">
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* Right: Description Section */}
      <div className="flex-grow h-full w-full lg:w-[600px]">
        <DescriptionStacksSection />
      </div>
    </div>
  )
}

export default CourseDetail
