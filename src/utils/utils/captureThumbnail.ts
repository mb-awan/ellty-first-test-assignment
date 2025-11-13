export const captureVideoThumbnail = (file: File, seekTo = 1.0): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';

      video.onloadedmetadata = () => {
        if (video.duration < seekTo) seekTo = 0;
        video.currentTime = seekTo;
      };

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to create thumbnail blob'));
              }
            },
            'image/jpeg',
            0.8,
          ); // 80% quality JPEG
        } else {
          reject(new Error('Canvas context is null'));
        }
      };

      video.onerror = (error) => {
        reject(new Error('Error loading video'));
      };
    } catch (error) {
      reject(error);
    }
  });
};
