# Запуск

Для запуска проекта в режиме разработки нужно выполнить в терминале следующую команду:

```bash
npm run dev
```

Для подключения к данным по API нужно в корне папки проекта создать файл для задания переменных окружения `.env`. Пример файла находится в `.env.example`.

Переменные окружения файла `.env`:

| переменная    | значение                                                                                |
| ------------- | --------------------------------------------------------------------------------------- |
| API_BACKEND   | адрес api данных                                                                        |
| APP_BACKEND   | адрес сервера приложения, для локальной разработки можно задать `http://localhost:3000` |
| SITE_NAME     | имя сайта в базе                                                                        |
| ADMIN_BACKEND | адрес админ сервера                                                                     |
| ADMIN_TOKEN   | токен доступа к админ серверу                                                           |
