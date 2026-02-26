import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

// JWT secret
  const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
// JWT auth middleware
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

  // Register endpoint
  app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    try {
      const hashed = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
        [email, hashed]
      );
      res.status(201).json({ user: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  // Login endpoint
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (!result.rows.length) return res.status(401).json({ error: 'Invalid credentials' });
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Login failed' });
    }
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
app.post('/api/recipes', authenticateToken, async (req, res) => {
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
  // PUT /api/recipes/:id - update a recipe
  app.put('/api/recipes/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
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
        `UPDATE recipes SET name=$1, ingredients=$2, instructions=$3, prep_time_minutes=$4, cook_time_minutes=$5, servings=$6, difficulty=$7, cuisine=$8, calories_per_serving=$9, tags=$10, user_id=$11, image=$12, rating=$13, review_count=$14, meal_type=$15 WHERE id=$16 RETURNING *`,
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
          meal_type,
          id
        ]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ error: 'Failed to update recipe' });
    }
  });

  // DELETE /api/recipes/:id - delete a recipe
  app.delete('/api/recipes/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe' });
    }
  });
  console.log(`Express server running on http://localhost:${PORT}`);
});
