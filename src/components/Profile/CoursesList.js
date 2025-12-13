import React from "react";
import CourseItem from "./CourseItem";
// Убираем import "./CoursesList.css";

const CoursesList = ({ 
  courses, 
  getCourseProgress, 
  checkCourseCompletion, 
  onStartLearning, 
  onDownloadCertificate, 
  onOpenModal 
}) => {
  return (
    <div className="courses-card">
      <div className="section-header">
        <h3>Мои курсы</h3>
        <span className="courses-count">
          {courses.filter(c => c.paid).length} из {courses.length} оплачено
        </span>
      </div>
      
      {courses.map((course) => {
        const progress = getCourseProgress(course.id);
        const isCompleted = checkCourseCompletion(course.id);
        
        return (
          <CourseItem
            key={course.id}
            course={course}
            progress={progress}
            isCompleted={isCompleted}
            onStartLearning={onStartLearning}
            onDownloadCertificate={onDownloadCertificate}
            onOpenModal={onOpenModal}
          />
        );
      })}
    </div>
  );
};

export default CoursesList;