import React from 'react'

const ShopFiltering = ({filters, filtersState, setFiltersState, clearFilters}) => {
  return (
    <div className='space-y-5 flex-shrink-0'>
        <h3>Filters</h3>

        {/* categories */}
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Category</h4>
            <hr />
            {
                filters.categories.map((category) => (
                    <label key={category} className='capitalize cursor-pointer flex items-center gap-2'>
                        <input
                            type="radio"
                            name='category'
                            id={`category-${category}`}
                            value={category}
                            checked={filtersState.category === category}
                            onChange={(e) => setFiltersState({...filtersState, category: e.target.value})}
                            className='form-radio h-4 w-4'
                        />
                        <span>{category}</span>
                    </label>
                ))
            }
        </div>

        {/* colors */}
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Color</h4>
            <hr />
            {
                filters.colors.map((color) => (
                    <label key={color} className='capitalize cursor-pointer flex items-center gap-2'>
                        <input
                            type="radio"
                            name='color'
                            id={`color-${color}`}
                            value={color}
                            checked={filtersState.color === color}
                            onChange={(e) => setFiltersState({...filtersState, color: e.target.value})}
                            className='form-radio h-4 w-4'
                        />
                        <span>{color}</span>
                    </label>
                ))
            }
        </div>

        {/* pricing */}
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Price Range</h4>
            <hr />
            {
                filters.priceRanges.map((range) => (
                    <label key={range.label} className='capitalize cursor-pointer flex items-center gap-2'>
                        <input
                            type="radio"
                            name='priceRange'
                            id={`priceRange-${range.min}-${range.max}`}
                            value={`${range.min}-${range.max}`}
                            checked={filtersState.priceRange === `${range.min}-${range.max}`}
                            onChange={(e) => setFiltersState({...filtersState, priceRange: e.target.value})}
                            className='form-radio h-4 w-4'
                        />
                        <span>{range.label}</span>
                    </label>
                ))
            }
        </div>

        {/* clear filters */}
        <button onClick={clearFilters}
        className='bg-primary py-1 px-4 text-white rounded'>Clear All Filters</button>
        
    </div>
  )
}

export default ShopFiltering