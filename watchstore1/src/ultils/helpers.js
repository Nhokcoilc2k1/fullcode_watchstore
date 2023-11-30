export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');


export function getBase64(file) {
    if(!file) return '';
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

export const formattedNumber = (price) => {
    return String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export function formatPromo(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(0) + ' triệu';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'k';
  } else {
    return number.toString();
  }
}
