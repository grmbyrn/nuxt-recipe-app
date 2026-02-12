import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Fallback: Add CORS headers manually for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET /api/recipes - fetch all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    // Convert snake_case fields to camelCase
    const camelRecipes = result.rows.map((r) => ({
      id: r.id,
      name: r.name,
      ingredients: r.ingredients,
      instructions: r.instructions,
      prepTimeMinutes: r.prep_time_minutes,
      cookTimeMinutes: r.cook_time_minutes,
      servings: r.servings,
      difficulty: r.difficulty,
      cuisine: r.cuisine,
      caloriesPerServing: r.calories_per_serving,
      tags: r.tags,
      userId: r.user_id,
      image: r.image,
      rating: r.rating,
      reviewCount: r.review_count,
      mealType: r.meal_type
    }));
    res.json(camelRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// POST /api/recipes - create a new recipe
app.post('/api/recipes', async (req, res) => {
  const {
    name,
    ingredients,
    instructions,
    prep_time_minutes,
    cook_time_minutes,
    servings,
    difficulty,
    cuisine,
    calories_per_serving,
    tags,
    user_id,
    image,
    rating,
    review_count,
    meal_type
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO recipes (
        name, ingredients, instructions, prep_time_minutes, cook_time_minutes, servings, difficulty, cuisine, calories_per_serving, tags, user_id, image, rating, review_count, meal_type
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      ) RETURNING *`,
      [
        name,
        ingredients,
        instructions,
        prep_time_minutes,
        cook_time_minutes,
        servings,
        difficulty,
        cuisine,
        calories_per_serving,
        tags,
        user_id,
        image,
        rating,
        review_count,
        meal_type
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
