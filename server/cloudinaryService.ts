import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image from a URL
export async function uploadImage(file: string, options: any = {}) {
  try {
    const defaultOptions = {
      resource_type: 'auto',
      folder: 'dn-vortex',
    };
    
    const result = await cloudinary.uploader.upload(file, {
      ...defaultOptions,
      ...options
    });
    
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

// Upload an image from a buffer
export async function uploadBuffer(buffer: Buffer, options: any = {}) {
  try {
    const defaultOptions = {
      resource_type: 'auto',
      folder: 'dn-vortex',
    };
    
    // Convert Buffer to base64 string for Cloudinary
    const base64Data = buffer.toString('base64');
    const dataURI = `data:image/png;base64,${base64Data}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      ...defaultOptions,
      ...options
    });
    
    return result;
  } catch (error) {
    console.error('Error uploading buffer to Cloudinary:', error);
    throw error;
  }
}

// Generate an optimized URL with transformations
export function getOptimizedUrl(publicId: string, options: any = {}) {
  const defaultOptions = {
    fetch_format: 'auto',
    quality: 'auto',
  };
  
  return cloudinary.url(publicId, {
    ...defaultOptions,
    ...options
  });
}

// Generate a URL with transformations for image resizing and cropping
export function getTransformedImageUrl(publicId: string, width: number, height: number, options: any = {}) {
  const defaultOptions = {
    crop: 'fill',
    gravity: 'auto',
    width,
    height,
  };
  
  return cloudinary.url(publicId, {
    ...defaultOptions,
    ...options
  });
}

// Delete an image or resource from Cloudinary
export async function deleteResource(publicId: string, options: any = {}) {
  try {
    const result = await cloudinary.uploader.destroy(publicId, options);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}

// Helper to extract public ID from a Cloudinary URL
export function getPublicIdFromUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  try {
    // Extract the public ID from a Cloudinary URL
    const matches = url.match(/\/v\d+\/(.+?)(?:\.\w+)?$/);
    return matches ? matches[1] : null;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
}

export default cloudinary;