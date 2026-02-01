"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const method_override_1 = __importDefault(require("method-override"));
const dotenv_1 = require("dotenv");
// Import routes
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
// Import error handler
const errorHandler_1 = require("./middleware/errorHandler");
// Load environment variables
(0, dotenv_1.config)();
// Initialize express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/student-management';
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));
// Set up middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../views'));
// Routes
app.use('/', studentRoutes_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
