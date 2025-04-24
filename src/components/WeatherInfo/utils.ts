/**
 * accepts an icon name and returns the icon url
 * @param {string} icon - icon name
 * @return {string} - returns the icon url
 */
export function getWeatherIcon(icon: string){
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

/**
 * formats the provides temperature to remove the decimals
 * @param {number} temp - the provided temperature
 * @return {number} - returns the formated temperature without the decimals
 */
export function getFormatedTemperature(temp: number){
  return Math.trunc(temp)
}