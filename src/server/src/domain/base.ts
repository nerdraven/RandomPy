export class DomainEvent {}
export class ValueObject {}

export class Entity {
  public events: Array<DomainEvent> = [];
  constructor(public readonly id: string) {}

  publishEvent(event: DomainEvent): void {
    this.events.push(event);
  }
}
