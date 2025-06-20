
import React from 'react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: { telugu: string; english: string };
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  selectedLanguage: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  selectedLanguage, 
  onCategoryChange 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category.id)}
          className={selectedCategory === category.id ? 'bg-green-600 hover:bg-green-700' : 'border-green-300'}
        >
          {category.name[selectedLanguage]}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
