import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { BigQuery } from '@google-cloud/bigquery';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
});

app.post('/api/submit-form', async (req, res) => {
  try {
    const formData = req.body;
    
    const rows = [{
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      phone: formData.phone,
      utmSource: formData.utmSource,
      utmMedium: formData.utmMedium,
      utmCampaign: formData.utmCampaign,
      utmTerm: formData.utmTerm,
      utmContent: formData.utmContent,
      referrer: formData.referrer,
      submissionDate: formData.submissionDate
    }];

    await bigquery
      .dataset(process.env.BIGQUERY_DATASET_ID)
      .table(process.env.BIGQUERY_TABLE_ID)
      .insert(rows);

    res.status(200).json({ message: 'Form data submitted successfully' });
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).json({ error: 'Failed to submit form data' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});