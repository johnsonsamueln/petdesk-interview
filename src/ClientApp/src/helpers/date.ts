export const getDateOrDefault = (dateStr: string | null): Date | null => {
    if (!dateStr) {
        return null;
    }

    return new Date(dateStr);
}

/**
 * Checks whether the given `date` is today or a future date,
 * irrespective of time-of-day.
 * @param date The `Date` to check for select-ability
 * @returns true if `date` should be selectable, false otherwise
 */
export const isDateTodayOrFuture = (date: Date | null): boolean => {
    if (!date) {
        return false;
    }

    // want to compare against the *start* of today
    // (i.e. midnight)
    const currentDateStart = new Date();
    currentDateStart.setHours(0, 0, 0, 0);

    // similar comparison against midnight of selected date
    const selectedDateStart = new Date(date);
    selectedDateStart.setHours(0, 0, 0, 0);

    return currentDateStart.getTime() <= selectedDateStart.getTime();
}

export const isDateTimeFuture = (date: Date | null): boolean => {
    if (!date) {
        return false;
    }
    const currentTime = new Date().getTime();
    const selectedTime = date.getTime();
    return currentTime < selectedTime;
}