import { useState, useEffect, useRef } from "react";
import {
  fetchCategories,
  createCategory,
  fetchCategoryById,
} from "@/app/services/apiService";
import type { Category } from "@/app/services/types";

export default function CategoriesButton({
  onSelectCategory,
  initialCategory,
}: {
  onSelectCategory: (category: number) => void;
  initialCategory?: number;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [newCategoryColor, setNewCategoryColor] = useState("#c60c0c");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [initialCategoryName, setInitialCategoryName] = useState<string | null>(
    null
  );
  const dropDownMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (
      dropDownMenuRef.current &&
      !dropDownMenuRef.current.contains(event.target as Node)
    ) {
      setIsDropDownOpen(false);
    }
  };

  const handleDropdownVisibility = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  useEffect(() => {
    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [isDropDownOpen]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const handleInitialCategory = async () => {
      if (!initialCategory) return;

      const fetchedCategory = await fetchCategoryById(initialCategory);
      setInitialCategoryName(fetchedCategory.name);
    };

    handleInitialCategory();
    loadCategories();
  }, [initialCategory]);

  const handleCreateCategory = async () => {
    if (newCategoryName.trim() === "") return;

    const newCategory = await createCategory({
      name: newCategoryName,
      color: newCategoryColor,
    });
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setNewCategoryColor("#000000");
  };

  const handleSelectCategory = (category: number) => {
    onSelectCategory(category);
    setIsDropDownOpen(false);
  };

  return (
    <div className="absolute top-24 right-24" ref={dropDownMenuRef}>
      <button
        onClick={handleDropdownVisibility}
        ref={buttonRef}
        className="bg-headerText text-cardsBackground font-medium px-4 py-2 rounded-md"
      >
        {initialCategoryName ? initialCategoryName : "Select Category"}
      </button>
      {isDropDownOpen && (
        <div className="absolute right-0 top-12 w-48 bg-cardsBackground shadow-lg rounded-md">
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleSelectCategory(category.id!)}
                className="px-4 py-2 hover:bg-gray-100 rounded-t-md transition-colors duration-300 hover:text-cardsBackground cursor-pointer flex items-center gap-2"
              >
                <span
                  style={{ backgroundColor: category.color }}
                  className={`rounded-full w-4 h-4 flex`}
                />{" "}
                {category.name}
              </li>
            ))}
            <li className="relative px-4 py-2">
              <input
                type="text"
                placeholder="New Category"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="border border-gray-300 text-cardsBackground rounded-md px-2 py-1 w-full"
              />
              <input
                type="color"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                className={`w-6 h-6 absolute top-3 right-5`}
              />
              <button
                onClick={handleCreateCategory}
                className="bg-slate-800 text-white px-4 py-2 rounded-md mt-2 w-full"
              >
                Create Category
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
