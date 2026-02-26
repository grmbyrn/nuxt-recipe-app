# 🍽️ Nuxt Recipe App

A full-featured recipe sharing platform built with [Nuxt 3](https://nuxt.com/), a custom [Express](https://expressjs.com/) backend, [PostgreSQL](https://www.postgresql.org/), and [Tailwind CSS](https://tailwindcss.com/). Users can browse recipes, sign up or log in, and create, edit, or delete their own recipes.

---

## 🚀 Features

- 🔐 User authentication with JWT (JSON Web Tokens)
- 📚 View community-shared recipes
- ✍️ Add, edit, and delete your own recipes
- 🖼️ Responsive UI with Tailwind CSS and Nuxt Image
- 🎨 Custom icons and Google Fonts integration
- 🗄️ Custom Express REST API with PostgreSQL

---

## 🛠️ Tech Stack

### Frontend
- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@nuxt/image](https://image.nuxt.com/)
- [@nuxt/icon](https://icon.nuxt.com/)
- [@nuxtjs/google-fonts](https://github.com/nuxt-modules/google-fonts)

### Backend
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (via `pg`)
- [JWT](https://jwt.io/) for authentication
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing

---

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/your-username/nuxt-recipe-app.git
cd nuxt-recipe-app
```

### Install frontend dependencies

```bash
npm install
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/recipe_app
JWT_SECRET=your-jwt-secret
PORT=4000
```

### Running the app

**1. Start the backend server:**

```bash
cd backend
npx tsc && node dist/index.js
```

The API will be available at http://localhost:4000.

**2. Start the Nuxt dev server:**

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
├── app/
│   ├── components/      # Vue components
│   ├── composables/     # Vue composables (auth, etc.)
│   ├── layouts/         # Application layouts
│   ├── middleware/       # Route middleware (auth guards)
│   ├── pages/           # Route-based pages
│   └── app.vue          # Root component
├── backend/
│   └── src/
│       └── index.ts     # Express API server
├── plugins/             # Nuxt plugins
├── public/              # Static files
├── types/               # TypeScript type definitions
├── nuxt.config.ts       # Nuxt configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgments

- [Nuxt](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nuxt Image Module](https://image.nuxtjs.org/)
- [Nuxt Icon Module](https://icon.nuxtjs.org/)
