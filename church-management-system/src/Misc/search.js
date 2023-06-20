
export function filterArraySelect(array, searchField, filters, select) {
    return array.filter((item) => {
        const searchValue = searchField.toLowerCase();
        const selectValue = select.toLowerCase();
        const filterValues = Object.values(filters).map((value) => value.toLowerCase());

        const itemValues = Object.values(item).map((value) =>
            typeof value === 'string' ? value.toLowerCase() : value,
        );

        return (
            itemValues.some((value) => {
                return typeof value === 'string' && value.includes(searchValue || selectValue);
            }) &&
            filterValues.every((value, index) => {
                return value === '' || itemValues[index] === value;
            })
        );
    });
}
