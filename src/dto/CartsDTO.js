import yup from 'yup';

export class CartsDTO {


  constructor( productId, cartId, quantity) {
    this.productId = productId;
    this.cartId = cartId;
    this.quantity = quantity;
  }

  static async validateData(cart) {
    const schema = yup.object().shape({
      productId : yup.string(),
      cartId: yup.string(),
      quantity : yup.number()
    });

    try {
      await schema.validate(schema);

      if (cart.id) {
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
