import { Service } from "typedi";
import SubCategory from "../../model/subCategory";
import { ISubCategory } from "../../interface";
import BadRequest from "../../utils/errorCode";
import Product from "../../model/product";
import mongoose from "mongoose";
import ParentCategory from "../../model/parentCategory";

@Service()
class SubCategoryService {

  async index(skip: number, limit: number, search: any) {
    let categoryPromise;
    categoryPromise = SubCategory.aggregate([
      {
        $lookup: {
          from: 'parentcategories',
          localField: 'parentCategory',
          foreignField: '_id',
          as: 'parentCategory'
        }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ])

    if (search) {
      categoryPromise = SubCategory.aggregate([
        {
          $match: {
            $text: {
              $search: search
            },
          }
        },
        {
          $lookup: {
            from: 'parentcategories',
            localField: 'parentCategory',
            foreignField: '_id',
            as: 'parentCategory'
          }
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ])
    }

    const categoryCountPromise = SubCategory.count();

    const [category, categoryCount] = await Promise.all([
      categoryPromise,
      categoryCountPromise,
    ]);

    const formattedCategory = category.map((category: any) => {
      console.log()
      let obj = {
        _id: category._id,
        name: category.name,
        parentCategory: category.parentCategory[0].name
      }
      return Object.values(obj);
    });

    return {
      data: formattedCategory,
      count: categoryCount,
    };
  }

  async update(userInput: ISubCategory, categoryId: string) {
    const category = await SubCategory.findById(categoryId);
    if (!category) {
      throw new BadRequest("SubCategory not found!")
    }
    await SubCategory.findByIdAndUpdate(categoryId, userInput);
    return {
      message: "SubCategory updated successfully!"
    }
  }

  async show(categoryId: string) {
    const category = await SubCategory.findById(categoryId);
    if (!category) {
      throw new BadRequest("SubCategory not found!")
    }
    return category
  }

  async create(userInput: ISubCategory) {
    const parentCategory = await ParentCategory.findById(userInput.parentCategory);
    const subCategory =  await SubCategory.create(userInput);
    parentCategory.subCategory.push(subCategory._id)
    await ParentCategory.findByIdAndUpdate(userInput.parentCategory, parentCategory)
    return {
      message: "SubCategory created successfully!"
    }
  }

  async delete(categoryId: string) {
    const category = await SubCategory.findById(categoryId);
    if (!category) {
      throw new BadRequest("SubCategory not found!")
    }




    const product = await Product.findOne({
      subCategory: {
        $in: [categoryId]
      }
    })


    if (product) {
      throw new BadRequest("This category is already in use by a product")
    }
    const parentCategory = await ParentCategory.findById(category.parentCategory)
    const subCategory = parentCategory.subCategory.filter((sub: any) => {
      return category._id.toString() !== sub.toString();

    })

    console.log(subCategory)
    parentCategory.subCategory = subCategory
    await ParentCategory.findByIdAndUpdate(parentCategory._id, parentCategory)
    await SubCategory.findByIdAndDelete(categoryId)
    return {
      message: "SubCategory deleted successfully!"
    }
  }

  async getCategoryOption() {
    const category = await SubCategory.aggregate([
      {
        $project: {
          "_id": 0,
          label: "$name",
          value: "$_id",
        }
      }
    ])

    return category;
  }


  async getCategoryByParentOption(parentCategoryId: string) {
    const category = await SubCategory.aggregate([
      {
        $match: {
          parentCategory: new mongoose.Types.ObjectId(parentCategoryId)
        }
      },
      {
        $project: {
          "_id": 0,
          label: "$name",
          value: "$_id",
        }
      }
    ])

    return category;
  }
}

export default SubCategoryService
