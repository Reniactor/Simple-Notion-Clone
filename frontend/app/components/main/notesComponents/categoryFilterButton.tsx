import { useState, useRef, useEffect } from "react";
import { Category } from "@/app/services/types";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
} from "@/app/services/apiService";
import { IoMdClose } from "react-icons/io";

interface CategoryFilterButtonProps {
  onFilterByCategory: (categoryId: number | null) => void;
}

const CategoryFilterButton: React.FC<CategoryFilterButtonProps> = ({
  onFilterByCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#c60c0c");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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

  const handleDeleteCategory = async (id: number) => {
    await deleteCategory(id);
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleFilterCategory = (categoryId: number | null) => {
    onFilterByCategory(categoryId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative max-h-fit" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-headerText text-cardsBackground px-4 py-2 rounded-md min-w-36"
      >
        Category Filter
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border text-cardsBackground font-medium border-gray-300 shadow-lg rounded-md p-4">
          <ul>
            <li
              onClick={() => handleFilterCategory(null)}
              className="cursor-pointer py-2 px-4 hover:bg-gray-100 rounded-md"
            >
              All Categories
            </li>
            {categories.map((category) => (
              <div className="flex items-center">
                <li
                  key={category.id}
                  onClick={() => handleFilterCategory(category.id!)}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-100 items-center rounded-md flex gap-2"
                >
                  <span
                    style={{ backgroundColor: category.color }}
                    className={`rounded-full w-4 h-4 flex`}
                  />{" "}
                  {category.name}
                </li>
                <span
                  className="text-red-700 hover:text-red-900 hover:cursor-pointer font-bold text-xl"
                  onClick={() => handleDeleteCategory(category.id!)}
                >
                  <IoMdClose />
                </span>
              </div>
            ))}
          </ul>
          <div className="relative mt-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New Category"
              className="border border-gray-300 px-2 py-1 rounded-md w-full mb-2"
            />
            <input
              type="color"
              value={newCategoryColor}
              onChange={(e) => setNewCategoryColor(e.target.value)}
              className={`w-6 h-6 absolute top-1 right-2 mb-2`}
            />
            <button
              onClick={handleCreateCategory}
              className="bg-sidebarBackground hover:bg-green-900 transition-colors duration-300 text-white px-4 py-2 rounded-md w-full"
            >
              Create Category
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterButton;
