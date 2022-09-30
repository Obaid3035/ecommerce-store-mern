import { Service } from 'typedi';
import Product from '../../model/product';
import { IProduct } from '../../interface';
import cloudinary from '../../utils/cloudinary';
import { BadRequest, NotFound } from '../../utils/errorCode';

@Service()
class ProductService {

   async deleteImage(productId: string, userInput: any) {
      const hotel = await Product.findById(productId);
      if (hotel.images.length > 1) {
         const deleteImage = await cloudinary.v2.uploader.destroy(
           userInput.cloudinary_id
         );
         if (!deleteImage) {
            throw new BadRequest("Something went wrong")
         } else {
            const hotel = await Product.findById(productId);
            const images = hotel.images.concat();
            const imageIndex = images.findIndex((img: any) => img._id.toString() === userInput._id.toString())
            images.splice(imageIndex, 1);
            await Product.findByIdAndUpdate(productId, {
               images: images
            })
            return {
               message: "Image deleted successfully!"
            }
         }
      } else {
         throw new BadRequest("Atleast one image is required")
      }
   }

   async uploadImages(productId: string, images: any) {
      const imagePromise = [];
      for (const i of images) {
         const image = cloudinary.v2.uploader.upload(i.path);
         imagePromise.push(image)
      }

      const imagesResolved = await Promise.all(imagePromise);

      const mappedImages = imagesResolved.map((img) => {
         return {
            avatar: img.secure_url,
            cloudinary_id: img.public_id
         }
      });
      const product = await Product.findById(productId);
      let imagesClone = product.images.concat();
      imagesClone = [
         ...imagesClone,
         ...mappedImages
      ]
      await Product.findByIdAndUpdate(productId, {
         images: imagesClone
      })
      return {
         message: "Image Uploaded Successfully!"
      }
   }

   async index(skip: number, limit: number, search: any) {

      let productPromise = Product.aggregate([
         {
            $project: {
               name: 1,
               price: 1,
               productIdentifier: 1
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
         productPromise = Product.aggregate([
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
                  price: 1,
                  productIdentifier: 1
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
      const productCountPromise = Product.count();

      const [product, productCount] = await Promise.all([
         productPromise,
         productCountPromise,
      ]);
      const formattedProducts = product.map((product: any) => {
         let obj = {
            _id: product._id,
            productIdentifier: product.productIdentifier,
            name: product.name,
            price: product.price
         }
         return Object.values(obj);
      });

      return {
         data: formattedProducts,
         count: productCount,
      };
   }

   async create(userInput: any, images: any) {
      const imagePromise = [];
      for (const img of images) {
         const image = cloudinary.v2.uploader.upload(img.path);
         imagePromise.push(image)
      }



      const imagesResolved = await Promise.all(imagePromise);


      const mappedImages = imagesResolved.map((img) => {
         return {
            avatar: img.secure_url,
            cloudinary_id: img.public_id
         }
      });


      const productInstance = {
         ...userInput,
         subCategory: JSON.parse(userInput.subCategory),
         attribute: JSON.parse(userInput.attribute),
         inventory: JSON.parse(userInput.inventory),
         weight: JSON.parse(userInput.weight),
         images: mappedImages
      };


   await Product.create(productInstance);
      return {
         message: 'Saved successfully!',
      };
   }

   async show(productId: string) {
      const product = await Product.findById(productId).populate("subCategory attribute inventory.color parentCategory");
      console.log(product)
      if (!product) {
         throw new NotFound('Products not found');
      }
      return product;
   }

   async update(
      productId: string,
      userInput: IProduct,
   ) {
      const prevProduct = await Product.findById(productId);
      if (!prevProduct) {
         throw new NotFound('Products not found');
      }

      await Product.findByIdAndUpdate(productId, userInput);
      return {
         message: 'Products updated successfully',
      };
   }

   async delete(productId: string) {
      const prevProduct = await Product.findById(productId)
      if (!prevProduct) {
         throw new BadRequest("Products not found")
      }

      const imagePromise = [];

      for (const img of prevProduct.images) {
         const image = cloudinary.v2.uploader.destroy(img.cloudinary_id);
         imagePromise.push(image)
      }

      await Promise.all(imagePromise);

      await Product.findByIdAndDelete(productId);
      return {
         message: "Products deleted successfully"
      }
   }
}

export default ProductService;
