// components/Calendar.js
"use client"
import React, { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  // Function to get the current month's name
  const getCurrentMonthName = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    return months[currentDate.getMonth()];
  };

  // Function to get the number of days in the current month
  const getDaysInMonth = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  };

  // Function to get the day of the week of the first day of the month
  const getFirstDayOfWeek = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    // You can add further logic here for handling the click event, such as displaying details for the selected day
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = getDaysInMonth();
    const firstDayOfWeek = getFirstDayOfWeek();

    // Add empty slots for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className={styles.calendarDay}></div>);
    }

    // Add the days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <div key={i} className={`${styles.calendarDay} ${selectedDay === i ? styles.selectedDay : ''}`} onClick={() => handleDayClick(i)}>
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={styles.calendar}>
      <h2>{getCurrentMonthName()}</h2>
      <div className={styles.calendarGrid}>
        <div className={styles.calendarHeader}>Sun</div>
        <div className={styles.calendarHeader}>Mon</div>
        <div className={styles.calendarHeader}>Tue</div>
        <div className={styles.calendarHeader}>Wed</div>
        <div className={styles.calendarHeader}>Thu</div>
        <div className={styles.calendarHeader}>Fri</div>
        <div className={styles.calendarHeader}>Sat</div>
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
