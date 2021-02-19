# Store

Используется поставляемое NuxtJS хранилище Vuex Store.

Папка модулей Vuex в Nuxt это `/store`

Для получения данных используются геттеры. Для это в компонентах импортируются геттер хелперы:

```js
import { mapGetters } from "vuex";
```

Далее определяем вычисляемые поля (computed) компоненты:

```js
computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit",
      headerSettings: "sites/settings",
    })
}
```

Нотация `sites/settings` определяет получение геттера из определённого модуля.

Для изменения соответствующих данных в store используются определенные мутации, а также определенные actions. Соответственно в компонентах и импортируются для этого хелперы:

```js
import { mapMutations, mapActions } from "vuex";
```

Далее определяются методы компоненты:

```js
 methods: {
    ...mapActions({
      savePage: "pages/savePage",
      saveForms: "forms/saveForms",
      saveSite: "sites/saveSite",
      reloadPage: "pages/reloadPage",
      reloadSite: "sites/reloadSite",
      reloadForms: "forms/reloadForms"
    }),
    ...mapMutations({
      setPreview: "SET_IS_PREVIEW"
    }),
 }
```
