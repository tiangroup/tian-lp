# Концепция

Проект представляет из себя [NuxtJS](https://nuxtjs.org/) приложение для генерации страниц сайта лэндинга.

Используется технология SSR (Server-Side Rendering, серверный рендеринг) для формирования полноценных html страниц. Также данная технология позволяет генерировать статические сайты, которые могут быть выгружены на отдельные сервера для статического контента, что снижает стоимость хостинга и увеличивает производительность, сопоставимую со статическим контентом.

Данные страниц хранятся на отдельном api сервере, представляющем из себя serverless CMS на базе [Strapi](https://strapi.io/). Редактирование контента интегрировано в элементы и блоки страниц сайта.

Сайт определяется либо переменной окружения SITE_NAME, либо определенным доменным именем для конкретного сайта.

Само приложение, помимо генерации сайтов, является сервисом для приема и отправки заполненных на сайтах веб форм на соответствующие электронные адреса.
