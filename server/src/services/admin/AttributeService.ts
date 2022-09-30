import { Service } from "typedi";
import Attribute from "../../model/attribute";
import { IAttribute } from "../../interface";
import BadRequest from "../../utils/errorCode";
import Product from "../../model/product";

@Service()
class AttributeService {

  async index(skip: number, limit: number, search: any) {

    let attributePromise;
    attributePromise = Attribute.aggregate([
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ])

    if (search) {
      attributePromise = Attribute.aggregate([
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

    const attributeCountPromise = Attribute.count();

    const [attribute, attributeCount] = await Promise.all([
      attributePromise,
      attributeCountPromise,
    ]);
    const formattedAttributes = attribute.map((attribute: any) => {
      return Object.values(attribute);
    });

    return {
      data: formattedAttributes,
      count: attributeCount,
    };
  }

  async update(userInput: IAttribute, attributeId: string) {
    const attribute = await Attribute.findById(attributeId);
    if (!attribute) {
      throw new BadRequest("Attribute not found!")
    }
    await Attribute.findByIdAndUpdate(attributeId, userInput);
    return {
      message: "Attribute created successfully!"
    }
  }

  async show(attributeId: string) {
    const attribute = await Attribute.findById(attributeId);
    if (!attribute) {
      throw new BadRequest("Attribute not found!")
    }
    return attribute
  }

  async create(userInput: IAttribute) {
    await Attribute.create(userInput);
    return {
      message: "Attribute created successfully!"
    }
  }

  async delete(attributeId: string) {
    const attribute = await Attribute.findById(attributeId);
    if (!attribute) {
      throw new BadRequest("Attribute not found!")
    }


    const product = await Product.find({
      attribute: {
        $in: [attributeId]
      }
    })

    if (product && product.length > 0) {
      throw new BadRequest("This attribute is already in use")
    }
    await Attribute.findByIdAndDelete(attributeId)
    return {
      message: "Attribute deleted successfully!"
    }
  }

  async getAttributeOptions() {
    const attributes = await Attribute.aggregate([
      {
        $project: {
          "_id": 0,
          label: "$name",
          value: "$_id",
        }
      }
    ])
    return attributes
  }
}

export default AttributeService
