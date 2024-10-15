import yup from 'yup';

export class CartProductsDTO {


  constructor(id, products ) {
    this.id = id;
    this.products = products
  }

  static async validateData(data) {
    const schema = yup.object().shape({
      productId : yup.number(),
      quantity : yup.array().of(yup.object())
    });

    try {
      await schema.validate(data);

      if (data.id) {
        return { status: 400, error: 'El atributo id no se admite, se genera automáticamente.' };
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
