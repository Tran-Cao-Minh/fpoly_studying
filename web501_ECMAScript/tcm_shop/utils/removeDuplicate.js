export const removeDuplicate = (array = Array()) => {
  array.forEach((item, index) => {
    const currentValue = item[defaultColumnOptionValue];
    const currentIndex = index;

    array.forEach((item, index) => {
      if (
        currentValue === item[defaultColumnOptionValue] &&
        currentIndex !== index
      ) {
        array.splice(index, 1);
      }
    });
  });

  return array;
};