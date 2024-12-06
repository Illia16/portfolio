const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp',
    'application/pdf',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3',
    'video/mp4', 'video/x-msvideo', 'video/x-matroska', 'video/webm', 'video/ogg',
];

// const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const MAX_FILE_SIZE = 52428800; // 50 MB

module.exports = {
    allowedTypes,
    MAX_FILE_SIZE,
};