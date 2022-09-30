import { Service } from "typedi";
import Tax from "../../model/tax";
import { ITax } from "../../interface";
import BadRequest from "../../utils/errorCode";

@Service()
class TaxService {
  async index(skip: number, limit: number, search: any) {
    let taxPromise;
    taxPromise = Tax.aggregate([
      {
        $project: {
          name: 1,
          tax: 1,
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
      taxPromise = Tax.aggregate([
        {
          $match: {
            $text: {
              $search: search
            },
          }
        },
        {
          $project: {
            name: 1,
            tax: 1,
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

    const taxCountPromise = Tax.count();

    const [tax, taxCount] = await Promise.all([
      taxPromise,
      taxCountPromise,
    ]);
    const formattedTax = tax.map((tax: any) => {
      return Object.values(tax);
    });

    return {
      data: formattedTax,
      count: taxCount,
    };
  }

  async create(userInput: ITax) {
    await Tax.create(userInput)
    return {
      message: "Tax create successfully!"
    }
  }

  async update(taxId: string, userInput: ITax) {
    const tax = await Tax.findById(taxId);
    if (!tax) {
      throw new BadRequest("Tax not found!")
    }
    await Tax.findByIdAndUpdate(taxId, userInput);
    return {
      message: "Tax updated successfully!"
    }
  }

}

export default TaxService;
