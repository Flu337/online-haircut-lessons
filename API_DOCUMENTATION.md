# API Documentation - Homework Upload

## Endpoint: POST /api/homework/upload

### Description
Загрузка домашнего задания студента на сервер.

### Request
- **Method**: POST
- **Content-Type**: multipart/form-data
- **URL**: `/api/homework/upload`

### Form Data Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | Файл домашнего задания (изображение, документ, видео) |
| `lessonId` | String/Number | Yes | ID урока, к которому относится задание |
| `courseId` | String/Number | Yes | ID курса |
| `comment` | String | No | Комментарий студента к работе |

### File Restrictions
- **Максимальный размер**: Определяется настройками урока (обычно 5-30 MB)
- **Разрешенные форматы**: `.jpg`, `.png`, `.pdf`, `.docx`, `.mp4`, `.mp3` (зависит от урока)

### Response

#### Success Response (200 OK)
```json
{
  "homeworkId": "unique_homework_id_12345",
  "message": "Homework uploaded successfully"
}
```

#### Error Responses

##### 400 Bad Request - Invalid Data
```json
{
  "error": "Invalid request data",
  "message": "Missing required fields: lessonId, courseId"
}
```

##### 413 Payload Too Large - File Too Big
```json
{
  "error": "File too large",
  "message": "Maximum file size is 10MB"
}
```

##### 415 Unsupported Media Type - Invalid File Format
```json
{
  "error": "Unsupported file format",
  "message": "Allowed formats: .jpg, .png, .pdf"
}
```

##### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Failed to save homework"
}
```

### Implementation Notes

1. **File Storage**: Сохраните файл в безопасное место с уникальным именем
2. **Database**: Создайте запись в таблице домашних заданий с полями:
   - homeworkId (уникальный ID)
   - lessonId
   - courseId
   - studentId (если есть аутентификация)
   - fileName
   - filePath
   - fileSize
   - comment
   - uploadedAt
   - status (pending, reviewed, etc.)

3. **Security**: Проверьте файл на вирусы, валидируйте тип файла по содержимому, не по расширению

4. **Progress Tracking**: Фронтенд отслеживает прогресс загрузки через `onUploadProgress`

### Example Backend Implementation (Node.js/Express)

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

app.post('/api/homework/upload', upload.single('file'), async (req, res) => {
  try {
    const { lessonId, courseId, comment } = req.body;
    const file = req.file;

    // Validate required fields
    if (!lessonId || !courseId || !file) {
      return res.status(400).json({
        error: 'Invalid request data',
        message: 'Missing required fields'
      });
    }

    // Generate unique homework ID
    const homeworkId = generateUniqueId();

    // Save file info to database
    await saveHomeworkToDatabase({
      homeworkId,
      lessonId,
      courseId,
      fileName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      comment: comment || '',
      uploadedAt: new Date()
    });

    res.json({
      homeworkId,
      message: 'Homework uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to save homework'
    });
  }
});
```

### Testing

Для тестирования эндпоинта можно использовать curl:

```bash
curl -X POST http://localhost:3000/api/homework/upload \
  -F "file=@/path/to/homework.jpg" \
  -F "lessonId=1" \
  -F "courseId=1" \
  -F "comment=Моя работа по уроку"
