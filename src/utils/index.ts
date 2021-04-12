export const fcConverter = (degree: number, type: string) => type === 'c' ? (degree - 32) / 1.8 : (degree * 1.8) + 32

export const getWindDirection = (degree: number) => {
  // const directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  let degrees = degree * 8 / 360;
  degrees = Math.round(degrees);
  degrees = (degrees + 8) % 8

  return directions[degrees]
}

interface IAirQualities {
  [key: string]: string | number | undefined;
}

export const airQualities: IAirQualities = {
  1: 'Good',
  2: 'Fair',
  3: 'Moderate',
  4: 'Poor',
  5: 'Very Poor'
}