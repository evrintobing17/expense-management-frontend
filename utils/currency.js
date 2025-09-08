export const formatIDR = (amount) => {
  if (!amount && amount !== 0) return 'Rp 0';
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const parseIDR = (formatted) => {
  return parseInt(formatted.replace(/[^\d]/g, ''));
};