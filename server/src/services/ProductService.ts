import { Service } from "typedi";
import SubCategory from "../model/subCategory";
import Product from "../model/product";
import Color from "../model/color";
import mongoose from "mongoose";

@Service()
class ProductService {

  async getFewProduct(userInput: any) {
    let match: any = {};

    if (userInput.colorId) {
      match.inventory = {
        $elemMatch: {
          color: userInput.colorId,
        }
      }
    }

    const product = await Product.find(match)
        .limit(5);

    return product;
  }

  async index(skip: number, limit: number, query: any) {
    let match: any = {};

    if (query.search) {
      match = {
        $text: {
          $search: query.search
        }
      }
    }

    if (query.subCategory) {
      const ids = query.subCategory.map((id: string) => {
        return new mongoose.Types.ObjectId(id)
      })
      match.subCategory = { $in: ids}
    }

    if (query.size && query.color) {
      match.inventory = {
        $elemMatch: {
          size: query.size,
          color: new mongoose.Types.ObjectId(query.color),
        }
      }
    } else {
      if (query.size) {
        match.inventory = {
          $elemMatch: {
            size: query.size,
          }
        }
      }

      if (query.color) {
        match.inventory = {
          $elemMatch: {
            color: new mongoose.Types.ObjectId(query.color),
          }
        }
      }

    }

    if (query.parentCategory) {
      match.parentCategory = new mongoose.Types.ObjectId(query.parentCategory);
    }

    let  productPromise = Product.aggregate([
      {
        $match: match
      },
      {
        $project: {
          name: 1,
          price: 1,
          discountPrice: 1,
          productIdentifier: 1,
          images: 1
        }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ])


    const productCountPromise = Product.count(match)

    const [product, productCount] = await Promise.all([productPromise, productCountPromise])

    return {
      data: product,
      count: productCount
    };
  }

  async show(productId: string) {
    const product = await Product.findById(productId).populate("inventory.color parentCategory");
    return product;
  }

  async getCategories() {
    const categories = await SubCategory.find();
    return categories;
  }

  async getColors() {
    const colors = await Color.find();
    return colors;
  }
}
export default ProductService;
