import { Box, Typography } from '@mui/material';
import './guidelines.scss'

const Guidelines = () => {
  return (
    <Box className="guidelines" sx={{ 
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      paddingLeft:"30px"
    }}>
      <Typography variant="h4" sx={{ marginBottom: '10px' }}>Course Addition Guidelines</Typography>
      <Typography variant="body1" sx={{ marginBottom: '10px' }}>
        Thank you for contributing a course to our platform! To ensure consistency and quality, please adhere to the following guidelines:
      </Typography>
      <ol>
        <li>
          <Typography variant="body1">
            <strong>Course Title:</strong> Choose a descriptive and concise title for your course.
            Do not use existing course titles.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Course Description:</strong> Provide a clear and comprehensive description of your course objectives and content.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Course Content:</strong> Organize your course into logical sections or modules with clear learning outcomes.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Media:</strong> Include high-quality images, videos, or other multimedia elements to enhance the learning experience.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Resources:</strong> Add supplementary materials such as readings, exercises, or quizzes to support learning.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Engagement:</strong> Encourage student interaction through discussions, assignments, or live sessions.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Accessibility:</strong> Ensure that your course content is accessible to all learners, including those with disabilities.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Review:</strong> Before publishing, review your course for accuracy, relevance, and completeness.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Publish:</strong> In order to publish your course you need to have atleast 5 materials combined in all sections of a course.
          </Typography>
        </li>
      </ol>
      <Typography variant="body1">
        Thank you for your attention to these guidelines. We look forward to featuring your course on our platform!
      </Typography>
    </Box>
  );
}

export default Guidelines;
