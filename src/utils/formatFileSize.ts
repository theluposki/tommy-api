export const formatFileSize = (size: number): string  => {
  const kiloBytes: number = 1024;
  const megaBytes: number = kiloBytes * 1024;
  const gigaBytes: number = megaBytes * 1024;

  if (size < kiloBytes) {
    return size + ' bytes';
  } else if (size < megaBytes) {
    const sizeInKB: string = (size / kiloBytes).toFixed(2);
    return sizeInKB + ' KB';
  } else if (size < gigaBytes) {
    const sizeInMB: string = (size / megaBytes).toFixed(2);
    return sizeInMB + ' MB';
  } else {
    const sizeInGB: string = (size / gigaBytes).toFixed(2);
    return sizeInGB + ' GB';
  }
}
