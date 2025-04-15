import React from "react";
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import Spinner from "./components/Spinner"; // Import the Spinner component
import { getRecipeFromMistral } from "./ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState("");
    const [loading, setLoading] = React.useState(false); // Add loading state

    async function getRecipe() {
        setLoading(true); // Set loading to true
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
        setLoading(false); // Set loading to false
    }

    function addIngredient(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient");
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
        event.target.reset();
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
            )}

            {loading && <Spinner />} {/* Show spinner during loading */}
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}