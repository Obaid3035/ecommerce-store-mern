import { Service } from "typedi";
import { IColor } from "../../interface";
import Color from "../../model/color";
import BadRequest from "../../utils/errorCode";
import Product from "../../model/product";

@Service()
class ColorService {


  async index(skip: number, limit: number) {
    const colorPromise = Color.find()
      .skip(skip)
      .limit(limit);
    const colorCountPromise = Color.count();

    const [color, colorCount] = await Promise.all([
      colorPromise,
      colorCountPromise,
    ]);

    const formattedColor = color.map((color: any) => {
      return Object.values(color._doc);
    });

    return {
      data: formattedColor,
      count: colorCount,
    };
  }

  async getColorOption() {
    const color = await Color.aggregate([
      {
        $project: {
          "_id": 0,
          label: "$name",
          value: "$_id",
        }
      }
    ])

    return color
  }

  async create(userInput: IColor) {
    await Color.create(userInput);
    return {
      message: "Color created successfully!"
    }
  }

  async show(colorId: string) {
    const color = await Color.findById(colorId);
    if (!color) {
      throw new BadRequest("Color not found!")
    }
    return color
  }

  async update(userInput: IColor, colorId: string) {
    const color = await Color.findById(colorId);
    if (!color) {
      throw new BadRequest("Color not found!")
    }
    await Color.findByIdAndUpdate(colorId, userInput);
    return {
      message: "Color updated successfully!"
    }
  }

  async delete(colorId: string) {
    const color = await Color.findById(colorId);
    if (!color) {
      throw new BadRequest("Color not found!")
    }

    const product = await Product.find({
      inventory: {
        $elemMatch: {
          color: colorId
        }
      }
    })

    if (product && product.length > 0) {
      throw new BadRequest("This color is already in use")
    }
   await Color.findByIdAndDelete(colorId)
    return {
      message: "Color deleted successfully!"
    }
  }
}

export default ColorService
