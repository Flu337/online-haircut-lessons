# API Documentation

## Аутентификация
- `POST /api/auth/register` - регистрация
- `POST /api/auth/login` - вход
- `GET /api/auth/verify` - проверка токена

## Пользователи
- `GET /api/users/profile` - профиль
- `POST /api/users/purchase-course` - купить курс

## Курсы
- `GET /api/courses/:id` - информация о курсе
- `GET /api/courses/:id/access` - проверка доступа

## Прогресс
- `GET /api/courses/:id/progress` - получить прогресс
- `POST /api/progress` - обновить прогресс

## Домашние задания
- `POST /api/homework/upload` - загрузить задание
- `GET /api/homework/:courseId/:lessonId` - получить задание
- `DELETE /api/homework/:courseId/:lessonId` - удалить задание