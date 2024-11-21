const calculateDaysBetweenDates = (startDate:any, endDate:any) => {
    // Parse the dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check for valid dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date format");
    }

    // Calculate the difference in milliseconds
    //@ts-ignore
    const diffInMilliseconds = end - start;

    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000)
    const days = diffInMilliseconds / (1000 * 60 * 60 * 24);

    // Include the end date
    return days + 1; // Adding 1 to include both start and end dates
}

export default calculateDaysBetweenDates