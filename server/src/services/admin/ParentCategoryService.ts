import { Service } from "typedi";
import { IParentCategory } from "../../interface";
import BadRequest from "../../utils/errorCode";
import Product from "../../model/product";
import ParentCategory from "../../model/parentCategory";
import SubCategory from "../../model/subCategory";

@Service()
class ParentCategoryService {

    async getAllParentCategory() {
        const parentCategory = await ParentCategory.find()
            .populate("subCategory");
        return parentCategory;
    }

    async index(skip: number, limit: number, search: any) {
        let parentCategoryPromise;
        parentCategoryPromise = ParentCategory.aggregate([
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ])

        if (search) {
            parentCategoryPromise = ParentCategory.aggregate([
                {
                    $match: {
                        $text: {
                            $search: search
                        },
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

        const productTypeCountPromise = ParentCategory.count();

        const [parentCategory, parentCategoryCount] = await Promise.all([
            parentCategoryPromise,
            productTypeCountPromise,
        ]);
        const formattedParentCategory = parentCategory.map((productType: any) => {
            return Object.values(productType);
        });

        return {
            data: formattedParentCategory,
            count: parentCategoryCount,
        };
    }

    async update(userInput: IParentCategory, productTypeId: string) {
        const parentCategory = await ParentCategory.findById(productTypeId);
        if (!parentCategory) {
            throw new BadRequest("Parent Category not found!")
        }
        await ParentCategory.findByIdAndUpdate(productTypeId, userInput);
        return {
            message: "Parent Category updated successfully!"
        }
    }

    async show(productTypeId: string) {
        const parentCategory = await ParentCategory.findById(productTypeId);
        if (!parentCategory) {
            throw new BadRequest("Parent Category not found!")
        }
        return parentCategory
    }

    async create(userInput: IParentCategory) {
        await ParentCategory.create(userInput);

        return {
            message: "Parent Category created successfully!"
        }
    }

    async delete(parentCategoryId: string) {
        const parentCategory = await ParentCategory.findById(parentCategoryId);
        if (!parentCategory) {
            throw new BadRequest("Parent Category not found!")
        }


        const product = await Product.findOne({
            parentCategory: parentCategoryId
        })


        if (product) {
            throw new BadRequest("This Parent Category is already in use by a product")
        }

        const subCategory = await SubCategory.findOne({
            parentCategory: parentCategoryId
        })


        if (subCategory) {
            throw new BadRequest("This Parent Category is already in use by a sub category")
        }


        await ParentCategory.findByIdAndDelete(parentCategoryId)
        return {
            message: "Parent Category deleted successfully!"
        }
    }

    async getParentCategoryOption() {
        const parentCategory = await ParentCategory.aggregate([
            {
                $project: {
                    "_id": 0,
                    label: "$name",
                    value: "$_id",
                }
            }
        ])

        return parentCategory;
    }
}

export default ParentCategoryService
