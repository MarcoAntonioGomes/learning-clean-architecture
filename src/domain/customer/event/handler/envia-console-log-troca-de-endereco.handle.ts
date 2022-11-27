import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class EnviaConsoleLogTrocaDeEnderecoHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: EventInterface): void {
    const message: string =
      "Endereço do cliente: " +
      `${event.eventData.id}` +
      ", " +
      `${event.eventData.nome}` +
      " alterado para: " +
      `${event.eventData.endereco}`;
    console.log(message);
  }
}
