export const formatDate = (dateStr) => {
  const dateStrTest = "2024-03-09T18:33:49.320Z";
  const dateObj = new Date(dateStr);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) + ' ' + dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return formattedDate
}
