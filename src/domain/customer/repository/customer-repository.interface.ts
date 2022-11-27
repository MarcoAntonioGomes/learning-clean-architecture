import RepositoryInterface from "../../@shared/repository/repository-interface";
import Customer from "../entity/costumer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
