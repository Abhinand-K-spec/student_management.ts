import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import { config } from 'dotenv';
import studentRoutes from './routes/studentRoutes';
import { errorHandler } from './middleware/errorHandler';

config();

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/student-management';
mongoose.connect(MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection failed:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use('/', studentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
