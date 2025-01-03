const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * Sanitizes a file name by replacing invalid characters with underscores.
 * Ensures the file name is safe for use in Supabase storage.
 *
 * @param {string} fileName - The original file name.
 * @returns {string} - The sanitized file name.
 */
function sanitizeFileName(fileName) {
  // Replace invalid characters with underscores
  return fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}

/**
 * Uploads a base64 image to a Supabase bucket and returns the public URL.
 *
 * @param {Object} params - Parameters containing the base64 image and file name.
 * @param {string} params.file - Base64 image data.
 * @param {string} params.fileName - The desired file name for the image.
 * @returns {Promise<string>} - The public URL of the uploaded image.
 */
async function uploadImageToSupabase({ file, fileName }) {
  try {
    // Sanitize the file name
    const sanitizedFileName = sanitizeFileName(fileName);

    // Convert base64 to Blob
    const base64Data = file.split(',')[1]; // Remove the data:image/... prefix
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload the file to Supabase bucket
    const { data, error } = await supabase.storage
      .from('image')
      .upload(sanitizedFileName, buffer, {
        contentType: 'image/jpeg', // Adjust if your image format is different
        upsert: true,             // Overwrite if file already exists
      });

    if (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Retrieve the public URL
    const publicUrl = supabase.storage
      .from('image')
      .getPublicUrl(data.path);
      
    return publicUrl?.data?.publicUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = uploadImageToSupabase;
