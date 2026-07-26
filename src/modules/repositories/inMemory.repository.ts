interface Identifiable {
  userId: string;
  operationId: string;
}

export class InMemoryRepository<T extends Identifiable> {
  private items: T[] = [];

  create(item: T): void {
    this.items.push(item);
  }

  findAll(userId: string): T[] {
    return this.items.filter((item: T) => item.userId === userId);
  }

  findById(userId: string, operationId: string): T | undefined {
    return this.items.find(
      (item: T) => item.userId === userId && item.operationId === operationId,
    );
  }

  delete(userId: string, operationId: string): void {
    this.items = this.items.filter(
      (item: T) => item.userId !== userId || item.operationId !== operationId,
    );
  }
}
