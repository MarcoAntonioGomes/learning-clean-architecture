import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/costumer";
import * as yup from "yup";
import NotificationError from "../../@shared/notification/notification.error";

export default class CustomerYupValidator
  implements ValidatorInterface<Customer>
{
  validate(entity: Customer): void {
    const schema = yup.object().shape({
      name: yup.string().required("Name is required"),
      id: yup.string().required("Id is required"),
    });

    try {
      schema.validateSync(
        { id: entity.getId(), name: entity.getName() },
        { abortEarly: false }
      );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({ context: "Customer", message: error });
      });
    }
  }
}
