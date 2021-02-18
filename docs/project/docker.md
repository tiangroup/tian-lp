# Docker

Для запуска приложения в контейнерах в проекте имеются два файла:

- `Dockerfile` - создает докер образа самого приложения, которое запускается на 3000 порту

- `Dockerfile-export` - создает докер образ для генерации статического сайта

Для генерации статического сайта нужно запустить контейнер с определенными параметрами переменных окружения и примонтированных директорий. Например создадим докер образ c именем tian-lp-export:

```sh
docker build -f ./Dockerfile-export -t tian-lp-export .
```

затем, для генерации сайта с именем `site_name` нужно будет запустить:

```sh
docker run --rm -v ./html:/app/dist /
 -v ./uploads/content/uploads/site_name:/app/content/uploads/site_name \
 -v ./uploads/image-styles/uploads/site_name:/app/static/image-styles/uploads/site_name \
 -v ./uploads/uploads/site_name:/app/static/uploads/site_name \
 -e SITE_NAME=site_name \
 -e API_BACKEND=https://api.tian-lp.ru \
 tian-lp-export
```

В результате в папке `./html` будет лежать сгенерированный статический сайт. В папке `./uploads` лежат загруженные веб приложением файлы сайтов.
