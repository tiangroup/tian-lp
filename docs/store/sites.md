# sites

::: tip Файл
`/store/sites.js`

Модуль для работы с данными сайта
:::

## getters

| имя           | получает                            |
| ------------- | ----------------------------------- |
| `site`        | текущий объект сайта                |
| `name`        | имя сайта                           |
| `id`          | id сайта                            |
| `pages`       | страницы сайта                      |
| `change`      | `true` если были изменения на сайте |
| `saveLoading` | `true` если сайт сохраняется        |
| `recaptcha`   | объект рекапчи сайта                |
| `ym`          | объект яндекс-метрики сайта         |
| `settings`    | объект настроек сайта               |

## mutations

| имя                           | данные             | изменяет                                                         |
| ----------------------------- | ------------------ | ---------------------------------------------------------------- |
| `SET_SITE`                    | `site`             | записывает сайт                                                  |
| `SET_UPDATES`                 |                    | записывает текущую дату и время обновления сайта                 |
| `SET_ROBOTS`                  | `content`          | записывает `content` в robots сайта                              |
| `SET_COUNTER`                 | `content`          | записывает `content` в код счетчиков сайта                       |
| `SET_LICENCE`                 | `content`          | записывает `content` в поле лицензии сайта                       |
| `SET_SITEMAP`                 | `content`          | записывает `content` в поле сайтмапа сайта                       |
| `SET_YM`                      | `content`          | записывает `content` в поле яндекс-метрики сайта                 |
| `SET_CHANGE`                  | `change`           | записывает флаг изменения сайта                                  |
| `SET_RECAPTCHA_FIELD`         | `{ field, value }` | записывает в поле `field` объекта рекапчи сайта значение `value` |
| `SET_SAVE_LOADING`            | `saveLoading`      | записывает флаг процесса сохранения сайта                        |
| `SET_SETTINGS_COLOR`          | `{ h, s, l }`      | записывает hsl цвета сайта                                       |
| `SET_SETTINGS_BACKGROUND`     | `background`       | записывает `background` в настройки сайта                        |
| `SET_SETTINGS_BUTTONS`        | `buttons`          | записывает `buttons` в настройки сайта                           |
| `SET_SETTINGS_POPUP`          | `popup`            | записывает `popup` в настройки сайта                             |
| `SET_SETTINGS_HEADER_MCOLOR`  | `mcolor`           | записывает `mcolor` в настройки сайта                            |
| `SET_SETTINGS_HEADER_MHEADER` | `mheader`          | записывает `mheader` в настройки сайта                           |
| `SET_SETTINGS_HEADER_MMENU`   | `mmenu`            | записывает `mmenu` в настройки сайта                             |
| `SET_DEMO`                    | `demo`             | записывает флаг `demo` для сайта                                 |
| `SET_FAVICON`                 | `favicon`          | записывает `favicon` для сайта                                   |

## actions

| имя          | параметры | действие                   |
| ------------ | --------- | -------------------------- |
| `loadSite`   | `id`      | загружает сайт по `id`     |
| `reloadSite` |           | перезагружает текущий сайт |
| `saveSite`   |           | сохраняет текущий сайт     |
