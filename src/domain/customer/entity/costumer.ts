//Business Complexity
//Domain
// - Entity
// Customer.ts (Business Rules)

import Entity from "../../@shared/entity/entity.abstract";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import Address from "../value-object/address";

//Acidental Complexity
//Infra - Extern World - Low Level
// Entity / Model
// - Customer.ts with getters and setters

export default class Customer extends Entity {
  private name: string;
  private address!: Address;
  private active: boolean = false;
  private rewardPoints: number = 0;
  private eventDispatcher: EventDispatcher;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  set EventDispatcher(eventDispatcher: EventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  validate() {
    if (this.name.length === 0) {
      this.notification.addError({
        context: "Customer",
        message: "Name is required",
      });
    }

    if (this.id.length === 0) {
      this.notification.addError({
        context: "Customer",
        message: "Id is required",
      });
    }
  }

  changeName(name: string) {
    this.name = name;
    this.validate();
  }

  getName() {
    return this.name;
  }

  isActived() {
    return this.active;
  }

  activate() {
    if (this.address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this.active = true;
  }

  desactive() {
    this.active = false;
  }

  addRewardPoints(points: number) {
    this.rewardPoints += points;
  }

  getRewardPoints() {
    return this.rewardPoints;
  }

  getId() {
    return this.id;
  }

  set Address(address: Address) {
    this.address = address;
  }

  get Address() {
    return this.address;
  }

  changeAddress(address: Address) {
    this.address = address;
    this.sendAddressChangedEvent();
  }

  private sendAddressChangedEvent() {
    if (this.eventDispatcher) {
      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
        id: this.id,
        nome: this.name,
        endereco: this.Address.toString(),
      });

      this.eventDispatcher.notify(customerAddressChangedEvent);
    }
  }
}
