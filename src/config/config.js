import dotenv from "dotenv";

dotenv.config();

const config = {
  appUrl: process.env.APP_URL || "",
  name: process.env.NAME || "",
  port: process.env.PORT || 5000,
  version: process.env.VERSION || "",
  jwtSecret: process.env.JWT_SECRET || "",
  feature: {
    admin: {
      enabled: parseInt(process.env.FEATURE_ADMIN_ENABLED) || false,
    },
  },
  mongodbUrl: process.env.MONGODB_URL || "",
  khalti: {
    apiUrl: process.env.KHALTI_API_URL || "",
    secret: process.env.KHALTI_SECRET_KEY || "",
  },
};

export default config;
