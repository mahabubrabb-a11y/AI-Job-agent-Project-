import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';

import authRoutes from './routes/auth.routes';
import resumeRoutes from './routes/resume.routes';
import analyzeRoutes from './routes/analyze.routes';
import webhookRoutes from './routes/webhook.routes';
import jobsRoutes from './routes/jobs.routes';
import coverLetterRoutes from './routes/coverLetter.routes';
import interviewRoutes from './routes/interview.routes';
import jobRoutes from './routes/jobs.routes';


const app: Application = express();

// ১. Global Middlewares (অবশ্যই সব Routes-এর উপরে থাকবে)
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

// ২. Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AI Job Agent API is running' });
});

// ৩. API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/resume', resumeRoutes);
app.use('/api/v1/analyze', analyzeRoutes);
app.use('/api/v1/webhooks', webhookRoutes);
app.use('/api/v1/jobs', jobsRoutes);
app.use('/api/v1/cover-letter', coverLetterRoutes);
app.use('/api/v1/interview', interviewRoutes);
app.use('/api/v1/jobs', jobRoutes);

// ৪. Central Error Handler 
app.use(errorHandler);

export default app;