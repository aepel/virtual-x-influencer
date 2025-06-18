export class Topic {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _category: 'history' | 'geography',
    private readonly _description?: string,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get category(): 'history' | 'geography' {
    return this._category;
  }

  get description(): string | undefined {
    return this._description;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  static create(
    name: string,
    category: 'history' | 'geography',
    description?: string,
  ): Topic {
    return new Topic(
      crypto.randomUUID(),
      name,
      category,
      description,
      new Date(),
      new Date(),
    );
  }
}
