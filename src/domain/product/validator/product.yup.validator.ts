import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class ProductYupValidator
  implements ValidatorInterface<Product>
{
  public validate(entity: Product): void {
    const schema = yup.object().shape({
      name: yup.string().required("Name is required"),
      id: yup.string().required("Id is required"),
      price: yup
        .number()
        .required("Price is required")
        .min(0, "Price must be greater than zero"),
    });

    try {
      schema.validateSync(
        {
          id: entity.getId(),
          name: entity.getName(),
          price: entity.getPrice(),
        },
        { abortEarly: false }
      );
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({ context: "Product", message: error });
      });
    }
  }
}
