import yup, { string } from 'yup';

export class ProductsDTO {

    constructor(id, title, description, code, price, statusProduct = true, stock, category, thumbnails) {
        this.id= id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = statusProduct;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }

    static async validateData(product) {
        const schema = yup.object().shape({
          title: yup.string().required(),
          description: yup.string().required(),
          code: yup.string().required(),
          price: yup.number().required(),
          status: yup.boolean().default(true).required(),
          stock: yup.number().required(),
          category: yup.string().required(),
          thumbnails: yup.array().of(yup.string())
        });
      
        try {
          await schema.validate(product);
      
          if (product.id ) {
            return { status: 400, error: 'El atributo id no se admite, se genera automáticamente.'};
          }
      
          return true;
        } catch (error) {
          if (error.name === 'ValidationError') {
            return { status: 400, error: error.message };
          } else {
            console.error('Unexpected error during validation:', error); 
            return { status: 500, error: 'Error interno del servidor' }; 
          }
        }
      }

      static async validateDataUpdate(product) {
        const schema = yup.object().shape({
          title: yup.string(),
          description: yup.string(),
          code: yup.string(),
          price: yup.number(),
          status: yup.boolean().default(true),
          stock: yup.number(),
          category: yup.string(),
          thumbnails: yup.array().of(yup.string())
        });
      
        try {
          await schema.validate(product);
      
          if (product.id ) {
            return { status: 400, error: 'El atributo id no se admite, se genera automáticamente.'};
          }
      
          return true;
        } catch (error) {
          if (error.name === 'ValidationError') {
            return { status: 400, error: error.message };
          } else {
            console.error('Unexpected error during validation:', error); 
            return { status: 500, error: 'Error interno del servidor' }; 
          }
        }
      }
}
