# API Documentation

## 1. Аутентификация
- `POST /api/auth/login` - вход в систему
- `GET /api/auth/verify` - проверка токена

## 2. Пользователи
- `GET /api/users/profile` - получить профиль
- `POST /api/users/purchase-course` - купить курс

## 3. Курсы
- `GET /api/courses/:id` - получить курс (ВСЕ данные с уроками и домашкой)
- `GET /api/courses/:id/access` - проверка доступа (оплачен ли курс)

## 4. Прогресс
- `GET /api/courses/:id/progress` - получить прогресс курса
- `POST /api/progress` - обновить прогресс урока

## 5. Домашние задания
- `POST /api/homework/upload` - загрузить домашку (multipart/form-data)
- `GET /api/homework/:courseId/:lessonId` - получить домашку
- `DELETE /api/homework/:id` - удалить домашку