# 🍽️ Nuxt Recipe App

A full-featured recipe sharing platform built with [Nuxt 3](https://nuxt.com/), [Supabase](https://supabase.com/), and [Tailwind CSS](https://tailwindcss.com/). Users can browse recipes, sign up or log in, and create, edit, or delete their own recipes.

---

## 🚀 Features

- 🔐 User authentication with Supabase
- 📚 View community-shared recipes
- ✍️ Add, edit, and delete your own recipes
- 🖼️ Responsive UI with Tailwind CSS and Nuxt Image
- 🎨 Custom icons and Google Fonts integration

---

## 🛠️ Tech Stack

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@nuxt/image](https://image.nuxt.com/)
- [@nuxt/icon](https://icon.nuxt.com/)
- [@nuxtjs/google-fonts](https://github.com/nuxt-modules/google-fonts)

---

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/your-username/nuxt-recipe-app.git
cd nuxt-recipe-app
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser to view the application.

### Build the Production:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```bash
├── assets/              # Uncompiled assets like images, fonts
├── components/          # Vue components
├── composables/         # Vue composables (composable logic)
├── layouts/             # Application layouts
├── pages/               # Route-based pages
├── public/              # Static files
├── server/              # Server-side logic
├── app.vue              # Root component
├── nuxt.config.ts       # Nuxt configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── .env                 # Environment variables
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgments

- [Nuxt](https://nuxt.com/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vue 3](https://vuejs.org/)
- [Nuxt Image Module](https://image.nuxtjs.org/)
- [Nuxt Icon Module](https://icon.nuxtjs.org/)
