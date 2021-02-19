# pages

::: tip Файл
`/store/pages.js`

Модуль для работы с данными страницы
:::

## getters

| имя           | получает                               |
| ------------- | -------------------------------------- |
| `page`        | объект текущей страницы                |
| `change`      | `true` если были изменения на странице |
| `saveLoading` | `true` если страница сохраняется       |
| `reloading`   | `true` если страница загружается       |
| `head`        | объект заголовка страницы              |

## mutations

| имя                  | данные                                     | изменяет                                                                                                                                                                |
| -------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SET_PAGE`           | `page`                                     | записывает переданную страницу                                                                                                                                          |
| `SET_SECTION`        | `section`                                  | записывает переданный блок                                                                                                                                              |
| `SET_CHANGE`         | `change`                                   |                                                                                                                                                                         |
| `SET_SAVE_LOADING`   | `saveLoading`                              |                                                                                                                                                                         |
| `SET_RELOADING`      | `reloading`                                |                                                                                                                                                                         |
| `SET_SECTION_FIELD`  | `{ id, field, value }`                     | в блоке с `id` записывает в поле `field` значение `value`                                                                                                               |
| `SET_SETTINGS_FIELD` | `{ id, field, value }`                     | в блоке с `id` записывает в поле настройки `field` значение `value`                                                                                                     |
| `SET_ITEM_FIELD`     | `{ sectionId, items, itemId, value }`      | в блоке с id=`sectionId` записывает в поле коллекции `items` в элемент с id=`itemId` значение `value`                                                                   |
| `ADD_ITEM`           | `{ sectionId, items, itemId, itemNew }`    | в блоке с id=`sectionId` добавляет новый элемент `itemNew` в поле коллекции `items` после элемента с id=`itemId` если указан `itemId`, если нет, то добавляется в конец |
| `DELETE_ITEM`        | `{ sectionId, items, itemId }`             | в блоке с id=`sectionId` удаляет элемент с id=`itemId` в поле коллекции `items`                                                                                         |
| `DOWN_ITEM`          | `{ sectionId, items, itemId }`             | в блоке с id=`sectionId` двигает вперед (вниз) элемент с id=`itemId` в поле коллекции `items`                                                                           |
| `UP_ITEM`            | `{ sectionId, items, itemId }`             | в блоке с id=`sectionId` двигает назад (вверх) элемент с id=`itemId` в поле коллекции `items`                                                                           |
| `SET_HEAD`           | `head`                                     | записывает заголовок страницы                                                                                                                                           |
| `SET_OBJECT_FIELD`   | `{ sectionId, objectField, field, value }` | записывает в блок с id=`sectionId` в поле объекта `objectField` в поле `field` значение `value`                                                                         |
| `ADD_SECTION`        | `{ sectionId, section }`                   | добавляет блок `section` после блока с id=`sectionId`, если `sectionId` задан, если нет, то в конец                                                                     |
| `DOWN_SECTION`       | `{ sectionId }`                            | блок с id=`sectionId` сдвигается вниз по коллекции                                                                                                                      |
| `UP_SECTION`         | `{ sectionId }`                            | блок с id=`sectionId` поднимается вверх по коллекции                                                                                                                    |
| `DELETE_SECTION`     | `{ sectionId }`                            | блок с id=`sectionId` удаляется                                                                                                                                         |
| `MOVE_SECTION`       | `{ sectionId, newIndex }`                  | блок с id=`sectionId` перемещается на позицию с индексом `newIndex`                                                                                                     |

## actions

| имя          | параметры | действие                                 |
| ------------ | --------- | ---------------------------------------- |
| `loadPage`   | `id`      | загружает страницу по `id`               |
| `reloadPage` |           | перегружает текущую загруженную страницу |
| `savePage`   |           | сохраняет текущую загруженную страницу   |
