# forms

::: tip Файл
`/store/forms.js`

Модуль для работы с формами сайта
:::

## getters

| имя           | получает                   |
| ------------- | -------------------------- |
| `forms`       | массив форм сайта          |
| `change`      | флаг были ли изменения     |
| `saveLoading` | флаг процесса сохранения   |
| `reloading`   | флаг процесса перезагрузки |
| `form(id)`    | форму по `id`              |

## mutations

| имя                  | данные                              | изменяет                                                                                     |
| -------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `SET_FORM`           | `form`                              | определенную форму `form` из имеющихся в хранилище                                           |
| `RESET_CHANGE_FORMS` |                                     | сброс флага изменений                                                                        |
| `SET_CHANGE`         | `change`                            | установка флага изменений                                                                    |
| `SET_SAVE_LOADING`   | `saveLoading`                       | установка флага процесса сохранения                                                          |
| `SET_RELOADING`      | `reloading`                         | установка флага процесса перезагрузки                                                        |
| `SET_FORM_FIELD`     | `{ formId, field, value }`          | значение `value` в поле `field` формы с id=`formId`                                          |
| `SET_MAIL_FIELD`     | `{ formId, field, value }`          | значение `value` в поле `field` объекта mail формы с id=`formId`                             |
| `SET_FIELDS_FIELD`   | `{ formId, fieldId, field, value }` | в форме с id=`formId` у поля формы с id=`fieldId` устанавливается значение `value` у `field` |
| `ADD_FIELDS`         | `{ formId }`                        | в форму с id=`formId` добавляется новое поле формы типа text                                 |
| `DELETE_FIELDS`      | `{ formId, fieldId }`               | в форме с id=`formId` удалятся поле формы с id=`fieldId`                                     |
| `UP_FIELDS`          | `{ formId, fieldId }`               | в форме с id=`formId` поле формы с id=`fieldId` поднимается наверх по списку                 |
| `DOWN_FIELDS`        | `{ formId, fieldId }`               | в форме с id=`formId` поле формы с id=`fieldId` опускается вниз по списку                    |
| `SET_METRIKA_FIELD`  | `{ formId, value }`                 | в форме с id=`formId` устанавливается поле метрики в `value`                                 |

## actions

| имя           | параметры                                | действие                                                                                                |
| ------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `loadForm`    | `formId`                                 | загрузка формы с id=`formId`                                                                            |
| `reloadForms` |                                          | перезагрузка всех загруженных форм форм                                                                 |
| `saveForm`    | `payload`                                | сохранение формы с id=`payload`                                                                         |
| `addForm`     | `{ template, sectionId, siteId, field }` | добавление формы в блок с id=`sectionId` в поле блока `field` сайта с id=`siteId` с шаблоном `template` |
