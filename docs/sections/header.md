# Шапка страницы [](https://proofs.app.tian-lp.ru/header/)

::: tip Папка блока
`/components/sections/header`
:::

Виды шапки определены в компонентах

| вид   | компонента        |
| ----- | ----------------- |
| view1 | `HeaderView1.vue` |
| view2 | `HeaderView2.vue` |
| view3 | `HeaderView3.vue` |
| view4 | `HeaderView4.vue` |
| view5 | `HeaderView5.vue` |
| view6 | `HeaderView6.vue` |

Компоненты меню в папке `/components/sections/header/menu`

Компоненты иконок социальных сетей в папке `/components/sections/header/social`

Svg картинки задются в компоненте `SocialList.vue` в поле `icons`

```js
  ...
  data: () => ({
    ...
    icons: {
      vk: `<svg
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ...
          />
        </svg>`,
      fb: `<svg
          width="9"
          height="17"
          viewBox="0 0 9 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ...
          />
        </svg>`,
      youtube: `<svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ...
          />
        </svg>`,
      ok: `<svg viewBox="0 0 32 32">
          <path
            ...
          ></path>
        </svg>`,
      twitter: `<svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ...
          />
        </svg>`,
      instagram: `<svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ...
          />
        </svg>`
    }
  })
```

Имена полей соответствуют символьным кодам, задаваемые в компоненте `SocialListEditorItem.vue`

```js
...
  data: () => ({
    ...
    types: [
      {
        name: "Вконтакте",
        value: "vk"
      },
      {
        name: "Facebook",
        value: "fb"
      },
      {
        name: "Youtube",
        value: "youtube"
      },
      {
        name: "Одноклассники",
        value: "ok"
      },
      {
        name: "Twitter",
        value: "twitter"
      },
      {
        name: "Instagram",
        value: "instagram"
      }
    ]
  }),
...
```
