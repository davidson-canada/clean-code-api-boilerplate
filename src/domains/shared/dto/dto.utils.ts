import { isNotNil } from "../../../utils/is-not-nil";

export interface IDTO {}

export type Comparator<T> = T | { [P in keyof T]: string };
export type ComparatorOptions = { strict: boolean };

export class Transformer<T> {
  constructor(private comparator?: Comparator<T>) {}

  get(): T {
    return this.comparator as T;
  }

  set(input: Comparator<T>): void {
    this.comparator = input;
  }

  convertToModel(input: any, options: ComparatorOptions): T | null {
    if (isNotNil(input) && isNotNil(this.comparator)) {
      const r = {} as T;
      Object.entries(this.comparator).forEach(function ([k, v]) {
        Object.assign(r, { [k]: input[v] });
      });
      if (options.strict) {
        return r;
      } else {
        return {
          ...r,
          ...input,
        };
      }
    } else {
      return null;
    }
  }

  convertToModels(input: any[], options: ComparatorOptions): T[] {
    return input.map((v: any) => this.convertToModel(v, options)).filter(isNotNil);
  }
}
