'use strict';

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2,
  folder: 'enbarque',
  allowedFormats: ['jpg', 'png', 'tiff', 'svg', 'ai', 'eps', 'pdf']
});

const uploadMiddleware = multer({
  storage
});

module.exports = uploadMiddleware;
