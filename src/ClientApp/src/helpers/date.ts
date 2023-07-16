export const getDateOrDefault = (dateStr: string | null): Date | null => {
    if (!dateStr) {
        return null;
    }

    return new Date(dateStr);
}