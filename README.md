# [Live Demo on Vercel](https://nuxt-recipe-app-gamma.vercel.app/)
# 🍽️ Nuxt Recipe App

A modern, full-featured recipe sharing platform built with [Nuxt 3](https://nuxt.com/), [Supabase](https://supabase.com/), and [Tailwind CSS](https://tailwindcss.com/). Users can browse, search, and share recipes, with secure authentication and a beautiful, responsive UI.

---

## 🚀 Features

- 🔐 Secure user authentication with Supabase Auth
- 📚 Browse, search, and view community-shared recipes
- ✍️ Add, edit, and delete your own recipes
- 🖼️ Responsive, mobile-first UI with Tailwind CSS and Nuxt Image
- 🎨 Custom icons and Google Fonts integration
- ⚡ Lightning-fast, serverless backend with Supabase Postgres
- 🔎 Row Level Security (RLS) for safe, multi-user data access

---

## 🛠️ Tech Stack

**Frontend**
- [Nuxt 3](https://nuxt.com/) (Vue 3, Composition API, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [@nuxt/image](https://image.nuxt.com/)
- [@nuxt/icon](https://icon.nuxt.com/)
- [@nuxtjs/google-fonts](https://github.com/nuxt-modules/google-fonts)

**Backend / Data**
- [Supabase](https://supabase.com/) (Postgres, Auth, Storage)
- Row Level Security (RLS) policies for secure multi-user access

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nuxt-recipe-app.git
cd nuxt-recipe-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production

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

---

## 🗂️ Project Structure

```
├── app/
│   ├── components/      # Vue components
│   ├── composables/     # Vue composables (auth, Supabase, etc.)
│   ├── layouts/         # Application layouts
│   ├── middleware/      # Route middleware (auth guards)
│   ├── pages/           # Route-based pages
│   └── app.vue          # Root component
├── plugins/             # Nuxt plugins
├── public/              # Static files
├── types/               # TypeScript type definitions
├── nuxt.config.ts       # Nuxt configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json
```

---

## 🧑‍💻 Developer Notes

- **Supabase Setup:**
	- Create a `recipes` table with appropriate columns and RLS policies (see `/types/supabase.ts` for schema).
	- Enable Row Level Security and add policies for SELECT, INSERT, UPDATE, DELETE.
- **Authentication:**
	- Uses Supabase Auth for sign-up, login, and session management.
- **Styling:**
	- Fully responsive with Tailwind CSS and Nuxt Image for optimized images.
- **Extensibility:**
	- Easily add new features, pages, or integrations thanks to Nuxt 3 modularity.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- [Nuxt](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nuxt Image Module](https://image.nuxtjs.org/)
- [Nuxt Icon Module](https://icon.nuxtjs.org/)
