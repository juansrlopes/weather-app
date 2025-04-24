export const getBackgroundClass = (weatherMain: string) => {
  switch (weatherMain) {
    case 'Clear':
      return 'bg-blue-300'; // Sunny background
    case 'Clouds':
      return 'bg-gray-400'; // Cloudy background
    case 'Rain':
      return 'bg-blue-800'; // Rainy background
    case 'Snow':
      return 'bg-white'; // Snowy background
    default:
      return 'bg-gray-200'; // Default background
  }
};