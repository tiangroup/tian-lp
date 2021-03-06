# Контакты [](https://proofs.app.tian-lp.ru/contacts/)

::: tip Папка блока
`/components/sections/contacts`
:::

В компоненте использован плагин [slick](/plugins/vue-slick.md), [vue-yandex-maps](/plugins/vue-yandex-maps.md) (импортируюца локально)

Виды Контактов определены в компонентах

| вид   | компонента          | по-русски                   |
| ----- | ------------------- | --------------------------- |
| view1 | `ContactsView1.vue` | Компакт с картой            |
| view2 | `ContactsView2.vue` | Несколько адресов           |
| view3 | `ContactsView3.vue` | Несколько адресов БЕЗ карты |

## Яндекс карта в блоке Контакты

Компонент ContactsMap.vue

API-ключ для сайта задаеца в speed-dial блока

Карта не зумица по скроллу.

Используеца стандартная яндексовская иконка, чтобы ее цвет менялся в соответствии с заданным брендовым цветом.

Места на карте расставляюца по координатам филиалов

По загрузке карта эмитит событие map-ready с инстансом карты в payload для того, чтобы во view2 по клику "Показать на карте" отображать на карте соответствующий филиал

## Один филиал

Адреса на карте - элементы каталога. Представление информации довольно разное для разных видов блока, поэтому не выделено общей сущности одного адреса.

### Поля филиала:

| название | суть                                          |
| -------- | --------------------------------------------- |
| title    | название филиала                              |
| address  | адрес                                         |
| coords   | координаты для карты в формате "00.00, 00.00" |
| email    | мыло(несколько) филиала, editor с типом html  |
| phone    | телефон(ы) филиала, editor с типом html       |
