// api/check.js
export default async function handler(req, res) {
  const { tracking_id } = req.query;
  const wispByteIP = "http://194.164.194.118:10825"; // Your WispByte URL

  try {
    const response = await fetch(`${wispByteIP}/check_status.php?tracking_id=${tracking_id}`);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    // If WispByte is down, return pending
    res.status(200).json({ status: 'pending' });
  }
                                    }
