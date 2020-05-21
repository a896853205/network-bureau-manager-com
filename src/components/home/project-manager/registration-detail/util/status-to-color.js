export default status => {
  switch (status) {
    case 0:
      return 'gray';
    case 1:
      return 'blue';
    case 2:
      return 'purple';
    case 100:
      return 'green';
    case -1:
      return 'red';
    default:
      return 'gray';
  }
};
