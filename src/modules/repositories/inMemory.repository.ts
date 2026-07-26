interface Identifiable {
  userId: string;
  operationId: string;
}

export class InMemoryRepository<T extends Identifiable> {
  private items: T[] = [];

  create(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }

  findAllByUserId(id: string): T[] {
    return this.items.filter(({ userId }: T) => userId === id);
  }

  delete(userId: string, operationId: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter(
      (item: T) => item.userId !== userId || item.operationId !== operationId,
    );

    return this.items.length < initialLength;
  }
}
