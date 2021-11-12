export class Apartments {
  constructor(
    public provider: string,
    public originalId: number,
    public name: string,
    public description: string,
    public price: number,
    public image?: string | string[],
    public remoteness?: number,
    public bookedDates?: []

  ){}

  get id() {
    return `${this.provider}-${this.originalId}`
  }
  public isProvidedBy(providerName: string): boolean {
    return this.provider === providerName
  }

}
