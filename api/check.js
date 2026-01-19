// api/check.js - DEBUG VERSION
export default async function handler(req, res) {
  const { tracking_id } = req.query;
  
  // DOUBLE CHECK: Is this your exact WispByte IP and Port?
  const wispByteIP = "http://194.164.194.118:10825"; 

  try {
    console.log(`[VERCEL] Attempting to connect to: ${wispByteIP}/check_status.php?tracking_id=${tracking_id}`);
    
    const response = await fetch(`${wispByteIP}/check_status.php?tracking_id=${tracking_id}`);
    
    if (!response.ok) {
        throw new Error(`Server responded with ${response.status} ${response.statusText}`);
    }

    const text = await response.text(); // Get raw text first to check for non-JSON errors
    console.log(`[VERCEL] Received raw response: ${text}`);

    try {
        const data = JSON.parse(text);
        res.status(200).json(data);
    } catch (e) {
        throw new Error(`Invalid JSON received: ${text.substring(0, 100)}...`);
    }

  } catch (error) {
    // Return the ACTUAL ERROR so we can see it in the browser
    console.error(`[VERCEL ERROR] ${error.message}`);
    res.status(500).json({ 
        status: 'error', 
        message: error.message, 
        target: wispByteIP 
    });
  }
}
