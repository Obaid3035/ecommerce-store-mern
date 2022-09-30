import React from 'react'
import {size} from "../../../../utils/helper";


const ProductFilter: React.FC<any> = ({ color, category,
                                        setCategory,
                                        selectedCategory,
                                        setSelectedCategory,
                                        selectedSize,
                                        setSelectedSize,
                                        selectedColor,
                                        setSelectedColor
}) => {


    const getColor = () => {
        const resArr: any[] = [];
        color.forEach(function (color: any) {
            const i = resArr.findIndex(x => x._id == color._id);
            if (i <= -1) {
                resArr.push(color)
            }
        })

        return resArr.map((color: any) => (
            <div className={selectedColor === color._id ? "active_border" : ""}
                 style={{backgroundColor: `${color.code}`, width: "25px", height: "25px", border: "1px solid #cec8c8"}}
                 onClick={() => setSelectedColor(color._id)}/>
        ))
    }


    const onCategoryAddHandler = (check: boolean, categoryId: string) => {
        const mappedCategory = category.map((category: any) => {
            if (category._id === categoryId) {
                return { ...category, isChecked: check}
            } else {
                return category
            }
        })

       const found = category.find((category: any) => categoryId === category._id);

        if (found.isChecked) {
            let categoryClone = selectedCategory.concat();
            categoryClone = categoryClone.filter((id: any) => {
                return id !== categoryId;
            });
            setSelectedCategory(categoryClone)
        } else {
            const categoryClone = selectedCategory.concat();
            categoryClone.push(categoryId)
            setSelectedCategory(categoryClone)
        }
      setCategory(mappedCategory)
    }

    return (
        <React.Fragment>
            <div className='Product_type_container'>
                <h5>Product Type</h5>
                {
                    category.length > 0 ?
                        (
                            category.map((category: any) => (
                                <div className='mt-4'>
                                    <input type='checkbox'
                                           onChange={(e) => onCategoryAddHandler(e.target.checked, category._id)}
                                           checked={category.isChecked}
                                    />
                                    <span>{ category.name }</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">
                                <p>No Category Found</p>
                            </div>
                        )
                }
            </div>

            <div className='size_container'>
                <h5>SIZE</h5>
                <div className='button_container'>
                    {
                        size.map((size) => {
                            return (
                                <button className={selectedSize && selectedSize  === size ? "active_border" : ""}
                                        onClick={() => setSelectedSize(size)}>{size}</button>
                            )
                        })
                    }
                </div>
            </div>

            <div className='size_container'>
                <h5>COLORS</h5>
                <div className='button_container'>
                    {
                        color.length > 0 ? (
                            getColor()
                        ) : (
                            <div className="text-center">
                                <p>No Color Found</p>
                            </div>
                        )
                    }
                </div>
            </div>


        </React.Fragment>
    )
}

export default ProductFilter
