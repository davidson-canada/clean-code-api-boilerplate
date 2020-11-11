export interface BaseCRUDUtils<T> {
  find(options?: Record<string, unknown>): Promise<T[]>;

  findById(id: string): Promise<T>;

  create(newEntity: T): Promise<T>;

  updateById(id: string, entity: Partial<T>): Promise<T>;

  deleteById(id: string): Promise<T>;
}
