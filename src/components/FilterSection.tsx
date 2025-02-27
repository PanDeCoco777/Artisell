import React, { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Slider } from "./ui/slider";

interface FilterSectionProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (categories: string[]) => void;
  onPriceRangeChange?: (range: [number, number]) => void;
  onRegionChange?: (regions: string[]) => void;
}

const FilterSection = ({
  onSearch = () => {},
  onCategoryChange = () => {},
  onPriceRangeChange = () => {},
  onRegionChange = () => {},
}: FilterSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Painting",
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["Luzon"]);

  const categories = [
    "Painting",
    "Sculpture",
    "Photography",
    "Digital Art",
    "Mixed Media",
    "Textile",
    "Pottery",
  ];

  const regions = [
    "Luzon",
    "Visayas",
    "Mindanao",
    "Metro Manila",
    "Cordillera",
    "Bicol",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  const handlePriceRangeChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    onPriceRangeChange(range);
  };

  const handleRegionToggle = (region: string) => {
    const updatedRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];

    setSelectedRegions(updatedRegions);
    onRegionChange(updatedRegions);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for artwork or artist..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Categories
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Price Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Price: ₱{priceRange[0].toLocaleString()} - ₱
              {priceRange[1].toLocaleString()}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Price Range</h4>
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                max={50000}
                step={1000}
                onValueChange={handlePriceRangeChange}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₱{priceRange[0].toLocaleString()}</span>
                <span>₱{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Region Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Regions
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {regions.map((region) => (
              <DropdownMenuCheckboxItem
                key={region}
                checked={selectedRegions.includes(region)}
                onCheckedChange={() => handleRegionToggle(region)}
              >
                {region}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterSection;
