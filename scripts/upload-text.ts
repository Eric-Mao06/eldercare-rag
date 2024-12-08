import { createResource } from '../lib/actions/resources';

async function uploadText() {
  const text = `
    
dasd
  `;

  try {
    const result = await createResource({ content: text });
    console.log('Upload result:', result);
    process.exit(0);  // Exit successfully
  } catch (error) {
    console.error('Error uploading text:', error);
    process.exit(1);  // Exit with error
  }
}

uploadText().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
