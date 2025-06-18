export class PostedContent {
  constructor(
    private readonly _id: string,
    private readonly _topicId: string,
    private readonly _content: string,
    private readonly _postedAt: Date,
    private readonly _threadId?: string,
    private readonly _postId?: string,
  ) {}

  get id(): string {
    return this._id;
  }

  get topicId(): string {
    return this._topicId;
  }

  get content(): string {
    return this._content;
  }

  get postedAt(): Date {
    return this._postedAt;
  }

  get threadId(): string | undefined {
    return this._threadId;
  }

  get postId(): string | undefined {
    return this._postId;
  }

  static create(
    topicId: string,
    content: string,
    threadId?: string,
    postId?: string,
  ): PostedContent {
    return new PostedContent(
      crypto.randomUUID(),
      topicId,
      content,
      new Date(),
      threadId,
      postId,
    );
  }
}
